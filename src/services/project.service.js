const Project = require("../models/Project");
const File = require("../models/File");
const Job = require("../models/Job");

exports.createProject = async (userId, name, description) => {
  // Create project with current user ID
  const project = new Project({
    name,
    description,
    userId: userId, // Associate project with authenticated user
  });

  await project.save();
  return { ...project.toObject(), filesCount: 0, jobsCount: 0 };
};

exports.getProject = async (userId, projectId) => {
  //Find project and verify it belongs to current user
  const project = await Project.findOne({
    _id: projectId,
    userId: userId,
  });
  if (!project) {
    const error = new Error("No project found");
    error.status = 404;
    throw error;
  }

  const filesCount = await File.countDocuments({ projectId });
  const jobsCount = await Job.countDocuments({ projectId });
  return {
    ...project.toObject(),
    filesCount,
    jobsCount,
  };
};

exports.getProjects = async (userId) => {
  const projects = await Project.find({ userId });
  const projectsWithCounts = await Promise.all(
    projects.map(async (project) => {
      const projectId = project._id;

      const filesCount = await File.countDocuments({ projectId });
      const jobsCount = await Job.countDocuments({ projectId });

      return {
        ...project.toObject(),
        filesCount,
        jobsCount,
      };
    })
  );

  return [...projectsWithCounts];
};

exports.updateProject = async (userId, projectId, data) => {
  const project = await Project.findOneAndUpdate({ _id: projectId, userId: userId }, data, {
    returnDocument: "after",
  });
  if (!project) {
    const error = new Error("No project found");
    error.status = 404;
    throw error;
  }
  return project;
};

exports.deleteProject = async (userId, projectId) => {
  // Find and verify project ownership before deleting
  const project = await Project.findOneAndDelete({
    _id: projectId,
    userId: userId,
  });

  if (!project) {
    const error = new Error("No project found");
    error.status = 404;
    throw error;
  }
  await File.deleteMany({ projectId });
  await Job.deleteMany({ projectId });
};
