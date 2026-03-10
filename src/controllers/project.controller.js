const projectService = require("../services/project.service");

exports.createProject = async (req, res, next) => {
  const { name, description } = req.body;
  // Validate required fields
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Project name is required",
    });
  }
  try {
    const project = await projectService.createProject(req.userId, name, description);
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProject(req.userId, req.params.projectId);
    res.status(201).json({
      success: true,
      message: "Project retrieved successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects(req.userId);
    res.status(201).json({
      success: true,
      message: "Projects retrieved successfully",
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(req.userId, req.params.projectId, req.body);
    res.status(201).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.userId, req.params.projectId);
    res.status(201).json({
      success: true,
      message: "Project and related data deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
