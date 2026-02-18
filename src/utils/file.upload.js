const cloudinary = require('../config/cloudinary');

const uploadBufferToCloudinary = (buffer, filename, mimetype) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'project-files',
        public_id: filename.split('.')[0],
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};


const deleteFromCloudinaryByUrl = async (url,resource_type) => {
  try {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname.split('/');
    const folderIdx = parts.findIndex((p) => p === 'project-files');
    if (folderIdx !== -1 && parts.length > folderIdx + 1) {
      const filename = parts[parts.length - 1].replace(/\.[^/.]+$/, '');
      const publicId = `project-files/${filename}`;
      return await cloudinary.uploader.destroy(publicId, { resource_type: resource_type });
    }
    throw new Error('Could not extract public_id from URL');
  } catch (err) {
    throw err;
  }
};

module.exports = { uploadBufferToCloudinary, deleteFromCloudinaryByUrl };
