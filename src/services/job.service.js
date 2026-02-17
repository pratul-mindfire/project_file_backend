const { Worker } = require("worker_threads");
const path = require("path");
const Job = require("../models/Job");
const File = require("../models/File");

exports.createZipJob = async (projectId, fileIds) => {

  const files = await File.find({ _id: { $in: fileIds }, projectId });

  if (files.length !== fileIds.length) {
    throw new Error("File does not belong to this project");
  }

  const job = await Job.create({
    projectId,
    type: "ZIP_COMPRESSION",
    fileIds
  });

  new Worker(path.resolve(__dirname, "../workers/zip.worker.js"), {
    workerData: { jobId: job._id.toString() }
  });

  return job;
};