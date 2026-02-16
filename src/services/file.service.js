const File = require("../models/File");
const Project = require("../models/Project");
const fs = require("fs");

exports.uploadFiles = async (projectId, files) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");
  const savedFiles = await Promise.all(
    files.map(file =>
      File.create({
        projectId,
        name: file.originalname,
        path: file.path,
        size: file.size,
        mimeType: file.mimetype
      })
    )
  );

  return savedFiles;
};

exports.listFiles = async (projectId) => {
  return await File.find({ projectId, isOutput: false });
};

exports.deleteFile = async (projectId, fileId) => {
  const file = await File.findOne({ _id: fileId, projectId });
  if (!file) throw new Error("File not found in this project");

  if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }

  await file.deleteOne();
};

exports.getFileForDownload = async (projectId, fileId) => {
  const file = await File.findOne({ _id: fileId, projectId ,isOutput: true});
  if (!file) throw new Error("Output file not found for this project");

  return file;
};