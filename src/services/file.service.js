const File = require("../models/File");
const Project = require("../models/Project");
const { uploadBufferToCloudinary, deleteFromCloudinaryByUrl } = require("../utils/file.upload");
const cloudinary = require("../config/cloudinary").default;

exports.uploadFiles = async (projectId, files) => {
  const project = await Project.findById(projectId);
  if (!project) {
    const error = new Error("No project found");
    error.status = 404;
    throw error;
  }
  const savedFiles = await Promise.all(
    files.map(async (file) => {
      // Upload buffer to Cloudinary
      const result = await uploadBufferToCloudinary(file.buffer, file.originalname);
      return File.create({
        projectId,
        name: file.originalname,
        path: result.secure_url, // Store Cloudinary URL
        size: file.size,
        mimeType: file.mimetype,
        resource_type: result.resource_type,
      });
    })
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

  // Extract public_id from Cloudinary URL
  if (file.path && file.path.includes("cloudinary.com")) {
    const result = await deleteFromCloudinaryByUrl(file.path, file.resource_type);
    console.log("Cloudinary deletion result:", result);
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
