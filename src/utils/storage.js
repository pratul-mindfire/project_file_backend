const fs = require("fs");
const path = require("path");

exports.ensureProjectFolder = (projectId) => {
  const dir = path.join("storage", projectId.toString());
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};
