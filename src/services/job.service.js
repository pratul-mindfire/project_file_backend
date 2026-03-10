const { Worker } = require("worker_threads");
const path = require("path");
const Job = require("../models/Job");
const File = require("../models/File");

exports.createJob = async (projectId, fileIds) => {
  const files = await File.find({ _id: { $in: fileIds }, projectId });

  if (files.length !== fileIds.length) {
    const error = new Error("File does not belong to this project");
    error.status = 404;
    throw error;
  }

  const job = await Job.create({
    projectId,
    type: "ZIP_COMPRESSION",
    fileIds,
  });

  new Worker(path.resolve(__dirname, "../workers/zip.worker.js"), {
    workerData: { jobId: job._id.toString() },
  });

  return job;
};

exports.getJob = async (projectId, jobId) => {
  const job = await Job.findOne({
    _id: jobId,
    projectId,
  });

  if (!job) {
    const error = new Error("Job not found");
    error.status = 404;
    throw error;
  }
  return job;
};

exports.getJobs = async (projectId) => {
  const job = await Job.find({
    projectId,
  });

  if (!job) {
    const error = new Error("Job not found");
    error.status = 404;
    throw error;
  }
  return job;
};
