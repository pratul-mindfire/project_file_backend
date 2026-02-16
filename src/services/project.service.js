const Project = require("../models/Project");
const File = require("../models/File");
const Job = require("../models/Job");

exports.createProject = async (data) => {
  return await Project.create(data);
};

exports.getProject = async (projectId) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");

  const filesCount = await File.countDocuments({ projectId });
  const jobsCount = await Job.countDocuments({ projectId });
  return {
    ...project.toObject(),
    filesCount,
    jobsCount
  };
};
exports.getAllProject = async () => {
  const project = await Project.find();
  if (!project) throw new Error("Project not found");
  return [
    ...project,
];
};

exports.updateProject = async (projectId, data) => {
  const project = await Project.findByIdAndUpdate(projectId, data, { new: true });
  if (!project) throw new Error("Project not found");
  return project;
};

exports.deleteProject = async (projectId) => {
  await File.deleteMany({ projectId });
  await Job.deleteMany({ projectId });
  await Project.findByIdAndDelete(projectId);
};