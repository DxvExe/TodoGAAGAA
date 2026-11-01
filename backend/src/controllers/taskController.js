const asyncHandler = require('../utils/asyncHandler');
const taskService = require('../services/taskService');

const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const task = await taskService.createTask({ title, description });
  res.status(201).json({
    success: true,
    data: task
  });
});

const getAllTasks = asyncHandler(async (req, res) => {
  const { search, status } = req.query;
  const tasks = await taskService.getAllTasks({ search, status });
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await taskService.getTaskById(id);
  res.status(200).json({
    success: true,
    data: task
  });
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = await taskService.updateTask(id, { title, description, completed });
  res.status(200).json({
    success: true,
    data: task
  });
});

const patchTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await taskService.patchTask(id, req.body);
  res.status(200).json({
    success: true,
    data: task
  });
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await taskService.deleteTask(id);
  res.status(204).send();
});

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  patchTask,
  deleteTask
};
