const File = require("../models/File");
const Project = require("../models/Project");
const fs = require("fs");

exports.uploadFiles = async (projectId, files) => {
  // Verify project ownership
  const project = await Project.findOne({
    _id: projectId,
  });

  if (!project) {
    const error = new Error("No project found");
    error.status = 404;
    throw error;
  }

  const savedFiles = await Promise.all(
    files.map((file) =>
      File.create({
        projectId,
        name: file.originalname,
        path: file.path,
        size: file.size,
        mimeType: file.mimetype,
      })
    )
  );

  return savedFiles;
};

exports.getProjectFiles = async (projectId) => {
  // Fetch files owned by user in this project
  const files = await File.find({
    projectId,
    isOutput: false,
  });
  return files;
};

exports.deleteFile = async (projectId, fileId) => {
  const file = await File.findOne({ _id: fileId, projectId });
  if (!file) {
    const error = new Error("File not found in this project");
    error.status = 404;
    throw error;
  }

  if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }

  await file.deleteOne();
};

exports.downloadFile = async (projectId, fileId) => {
  const file = await File.findOne({ _id: fileId, projectId, isOutput: true });
  if (!file) {
    const error = new Error("Output file not found for this project");
    error.status = 404;
    throw error;
  }
  return file;
};
