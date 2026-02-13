const Project = require("../models/Project");
const fs = require("fs");
const path = require("path");

exports.createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
};

exports.getAllProject = async (req, res) => {

  const project = await Project.find();
   console.log(project)

  res.json( project);
};
exports.getProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ error: "Project not found" });


  res.json({ ...project.toObject(), });
};

exports.updateProject = async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Project updated" });
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  await Project.findByIdAndDelete(id);

  const dir = path.join("storage", id);
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });

  res.json({ message: "Project deleted" });
};
