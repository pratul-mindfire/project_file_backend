const fileService = require("../services/file.service");

exports.uploadFiles = async (req, res, next) => {
  try {
    const files = await fileService.uploadFiles(
      req.params.projectId,
      req.files
    );

    res.json(files);
  } catch (err) {
    next(err);
  }
};

exports.listFiles = async (req, res, next) => {
  try {
    const files = await fileService.listFiles(req.params.projectId);
    res.json(files);
  } catch (err) {
    next(err);
  }
};

exports.deleteFile = async (req, res, next) => {
  try {
    await fileService.deleteFile(
      req.params.projectId,
      req.params.fileId
    );
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.downloadFile = async (req, res, next) => {
  try {
    const file = await fileService.getFileForDownload(
      req.params.projectId,
      req.params.fileId
    );

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.name}"`
    );
    res.download(file.path, file.name);
  } catch (err) {
    next(err);
  }
};