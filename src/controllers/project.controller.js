const projectService = require("../services/project.service");

exports.createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProject(req.params.projectId);
    res.json(project);
  } catch (err) {
    next(err);
  }
};
exports.getAllProject = async (req, res, next) => {
  try {
    const project = await projectService.getAllProject();
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    await projectService.updateProject(req.params.projectId, req.body);
    res.json({ message: "Project updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.projectId);
    res.json({ message: "Project and related data deleted" });
  } catch (err) {
    next(err);
  }
};