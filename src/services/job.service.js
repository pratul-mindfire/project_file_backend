const { Worker } = require("worker_threads");
const path = require("path");
const Job = require("../models/Job");
const File = require("../models/File");

exports.createJob = async (userId, projectId, fileIds) => {
  const files = await File.find({ _id: { $in: fileIds }, projectId, userId });

  if (files.length !== fileIds.length) {
    const error = new Error("File does not belong to this project");
    error.status = 404;
    throw error;
  }

  const job = await Job.create({
    projectId,
    type: "ZIP_COMPRESSION",
    fileIds,
    userId,
  });

  new Worker(path.resolve(__dirname, "../workers/zip.worker.js"), {
    workerData: { jobId: job._id.toString() },
  });

  return job;
};

exports.getJob = async (userId, projectId, jobId) => {
  const job = await Job.findOne({
    _id: jobId,
    projectId,
    userId,
  });

  if (!job) {
    const error = new Error("Job not found");
    error.status = 404;
    throw error;
  }
  return job;
};
/**
 * Job controller
 * Handles background job operations (zipping, compression, etc.)
 */

// const Job = require("../models/Job");
// const Project = require("../models/Project");
// const JOB_STATUS = require("../constants/jobStatus");
// const { Worker } = require("worker_threads");
// /**
//  * Create a new job
//  * POST /api/projects/:projectId/jobs
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// const createJob = async (req, res, next) => {
//   try {
//     const { projectId } = req.params;
//     const { fileIds } = req.body;
//     console.log(req.body, "req.body");
//     if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "File IDs are required and must be a non-empty array",
//       });
//     }

//     // Verify project ownership
//     const project = await Project.findOne({
//       _id: projectId,
//       userId: req.userId,
//     });

//     if (!project) {
//       return res.status(404).json({
//         success: false,
//         message: "Project not found or unauthorized",
//       });
//     }

//     // Create job with userId
//     const job = new Job({
//       fileIds,
//       projectId,
//       userId: req.userId, // Associate job with authenticated user
//       status: JOB_STATUS.PENDING,
//     });

//     const savedJob = await job.save();
//     new Worker(path.resolve(__dirname, "../workers/zip.worker.js"), {
//       workerData: { jobId: savedJob._id.toString() },
//     });
//     res.status(201).json({
//       success: true,
//       message: "Job created successfully",
//       data: savedJob,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Get all jobs for a project
//  * GET /api/projects/:projectId/jobs
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// const getProjectJobs = async (req, res, next) => {
//   try {
//     const { projectId } = req.params;

//     // Verify project ownership
//     const project = await Project.findOne({
//       _id: projectId,
//       userId: req.userId,
//     });

//     if (!project) {
//       return res.status(404).json({
//         success: false,
//         message: "Project not found or unauthorized",
//       });
//     }

//     // Fetch jobs owned by user in this project
//     const jobs = await Job.find({
//       projectId,
//       userId: req.userId,
//     });

//     res.status(200).json({
//       success: true,
//       data: jobs,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Get job details
//  * GET /api/projects/:projectId/jobs/:jobId
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// const getJob = async (req, res, next) => {
//   try {
//     const { projectId, jobId } = req.params;

//     // Fetch and verify job ownership
//     const job = await Job.findOne({
//       _id: jobId,
//       projectId,
//       userId: req.userId,
//     });

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found or unauthorized",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: job,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Cancel a job
//  * POST /api/projects/:projectId/jobs/:jobId/cancel
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// const cancelJob = async (req, res, next) => {
//   try {
//     const { projectId, jobId } = req.params;

//     // Find and verify job ownership
//     const job = await Job.findOneAndUpdate(
//       {
//         _id: jobId,
//         projectId,
//         userId: req.userId,
//       },
//       { status: "cancelled" },
//       { returnDocument: "after" }
//     );

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found or unauthorized",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Job cancelled successfully",
//       data: job,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   createJob,
//   getProjectJobs,
//   getJob,
//   cancelJob,
// };
