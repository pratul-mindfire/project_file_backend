const File = require('../models/File');
const Project = require('../models/Project');
const { uploadBufferToCloudinary, deleteFromCloudinaryByUrl } = require('../utils/file.upload');
const cloudinary = require('../config/cloudinary').default;

exports.uploadFiles = async (projectId, files) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error('Project not found');
  console.log('Uploading files for project:', projectId, 'Files:', files);
  const savedFiles = await Promise.all(
    files.map(async (file) => {
      // Upload buffer to Cloudinary
      const result = await uploadBufferToCloudinary(file.buffer, file.originalname, file.mimetype);
      console.log('Cloudinary upload result:', result);
      return File.create({
        projectId,
        name: file.originalname,
        path: result.secure_url, // Store Cloudinary URL
        size: file.size,
        mimeType: file.mimetype,
        resource_type: result.resource_type
      });
    })
  );
  return savedFiles;
};

exports.listFiles = async (projectId) => {
  return await File.find({ projectId, isOutput: false });
};

exports.deleteFile = async (projectId, fileId) => {
  const file = await File.findOne({ _id: fileId, projectId });
  if (!file) throw new Error('File not found in this project');

  // Extract public_id from Cloudinary URL
  if (file.path && file.path.includes('cloudinary.com')) {
    const result = await deleteFromCloudinaryByUrl(file.path,file.resource_type);
    console.log('Cloudinary deletion result:', result);
  }

  await file.deleteOne();
};

exports.getFileForDownload = async (projectId, fileId) => {
  const file = await File.findOne({ _id: fileId, projectId, isOutput: true });
  if (!file) throw new Error('Output file not found for this project');

  return file;
};
