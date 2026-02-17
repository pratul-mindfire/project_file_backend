const jobService = require("../services/job.service");
const Job = require("../models/Job");

exports.createZipJob = async (req, res, next) => {
  try {
    const job = await jobService.createZipJob(
      req.params.projectId,
      req.body.fileIds
    );

    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

exports.getJobStatus = async (req, res, next) => {
  try {
    const job = await Job.findOne({
      _id: req.params.jobId,
      projectId: req.params.projectId
    });

    if (!job) throw new Error("Job not found");

    res.json(job);
  } catch (err) {
    next(err);
  }
};