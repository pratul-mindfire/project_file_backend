const jobService = require("../services/job.service");
const Job = require("../models/Job");

exports.createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.userId, req.params.projectId, req.body.fileIds);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (err) {
    next(err);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const job = await jobService.getJob(req.userId, req.params.projectId, req.params.jobId);
    res.status(201).json({
      success: true,
      message: "Job retrieved successfully",
      data: job,
    });
  } catch (err) {
    next(err);
  }
};
