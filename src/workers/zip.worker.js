const { parentPort, workerData } = require("worker_threads");
const mongoose = require("mongoose");
const archiver = require("archiver");
const axios = require("axios");
const { uploadBufferToCloudinary } = require("../utils/file.upload");

const Job = require("../models/Job");
const File = require("../models/File");
const { MONGO_URI } = require("../config/env");
const jobStatus = require("../constants/jobStatus");

(async () => {
  await mongoose.connect(MONGO_URI);

  const jobId = new mongoose.Types.ObjectId(workerData.jobId);

  try {
    await Job.updateOne(
      { _id: jobId },
      {
        status: jobStatus.PROCESSING,
        startedAt: new Date()
      }
    );

    const job = await Job.findById(jobId);
    const files = await File.find({ _id: { $in: job.fileIds } });
    const outputFileName = `${jobId}_files.zip`;
    const archive = archiver("zip", { zlib: { level: 9 } });
    const chunks = [];
    archive.on("data", chunk => chunks.push(chunk));

    let processed = 0;
    for (const file of files) {
      // Download file from Cloudinary
      const response = await axios.get(file.path, { responseType: "arraybuffer" });
      archive.append(response.data, { name: file.name });
      processed++;
      await Job.updateOne(
        { _id: jobId },
        { progress: Math.floor((processed / files.length) * 100) }
      );
    }
    await archive.finalize();

    // Combine chunks into a single buffer
    const zipBuffer = Buffer.concat(chunks);
    // Upload zip buffer to Cloudinary
    const result = await uploadBufferToCloudinary(zipBuffer, outputFileName, "application/zip");

    const outputFile = await File.create({
      projectId: job.projectId,
      name: outputFileName,
      path: result.secure_url,
      size: zipBuffer.length,
      mimeType: "application/zip",
      isOutput: true,
      resource_type: result.resource_type
    });
    await Job.updateOne(
      { _id: jobId },
      {
        status: jobStatus.COMPLETED,
        progress: 100,
        outputFileId: outputFile._id,
        completedAt: new Date()
      }
    );

    parentPort.postMessage("done");

  } catch (err) {
    await Job.updateOne(
      { _id: jobId },
      {
        status: jobStatus.FAILED,
        error: err.message
      }
    );
  }
})();