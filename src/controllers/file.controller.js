const fileService = require("../services/file.service");

exports.uploadFiles = async (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files provided",
    });
  }
  try {
    const files = await fileService.uploadFiles(req.userId, req.params.projectId, req.files);
    res.status(201).json({
      success: true,
      message: "Files uploaded successfully",
      data: files,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProjectFiles = async (req, res, next) => {
  try {
    const files = await fileService.getProjectFiles(req.userId, req.params.projectId);
    res.status(201).json({
      success: true,
      message: "Files retrieved successfully",
      data: files,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteFile = async (req, res, next) => {
  try {
    await fileService.deleteFile(req.userId, req.params.projectId, req.params.fileId);
    res.status(201).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.downloadFile = async (req, res, next) => {
  try {
    const file = await fileService.downloadFile(
      req.userId,
      req.params.projectId,
      req.params.fileId
    );

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
    res.download(file.path, file.name);
  } catch (err) {
    next(err);
  }
};
