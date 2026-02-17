const { parentPort, workerData } = require("worker_threads");
const mongoose = require("mongoose");
const archiver = require("archiver");
const fs = require("fs");

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
    const outputPath = `uploads/${jobId}.zip`;
    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip");

    archive.pipe(output);

    let processed = 0;
    for (const file of files) {
      archive.file(file.path, { name: file.name });
      processed++;

      await Job.updateOne(
        { _id: jobId },
        { progress: Math.floor((processed / files.length) * 100) }
      );
    }
    await archive.finalize();

    const outputFile = await File.create({
      projectId: job.projectId,
      name: outputFileName,
      path: outputPath,
      size: fs.statSync(outputPath).size,
      mimeType: "application/zip",
      isOutput: true
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