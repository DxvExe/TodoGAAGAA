const mongoose = require('mongoose');
const Task = require('../models/Task');

const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`Invalid task ID: ${id}`);
    error.statusCode = 400;
    throw error;
  }
};

const createTask = async ({ title, description }) => {
  if (!title || typeof title !== 'string' || !title.trim()) {
    const error = new Error('Task title is required and cannot be empty');
    error.statusCode = 400;
    throw error;
  }

  const task = await Task.create({
    title: title.trim(),
    description: typeof description === 'string' ? description.trim() : '',
    completed: false
  });

  return task;
};

const getAllTasks = async ({ search, status }) => {
  const query = {};

  if (typeof status === 'string') {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'completed') {
      query.completed = true;
    } else if (normalizedStatus === 'pending') {
      query.completed = false;
    }
  }

  if (search && typeof search === 'string' && search.trim()) {
    const term = search.trim();
    query.$or = [
      { title: { $regex: term, $options: 'i' } },
      { description: { $regex: term, $options: 'i' } }
    ];
  }

  const tasks = await Task.find(query).sort({ createdAt: -1 });
  return tasks;
};

const getTaskById = async (id) => {
  validateObjectId(id);
  const task = await Task.findById(id);

  if (!task) {
    const error = new Error(`Task not found with ID: ${id}`);
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const updateTask = async (id, { title, description, completed }) => {
  validateObjectId(id);

  if (!title || typeof title !== 'string' || !title.trim()) {
    const error = new Error('Task title is required and cannot be empty');
    error.statusCode = 400;
    throw error;
  }

  const updatePayload = {
    title: title.trim(),
    description: typeof description === 'string' ? description.trim() : ''
  };

  if (typeof completed === 'boolean') {
    updatePayload.completed = completed;
  }

  const task = await Task.findByIdAndUpdate(id, updatePayload, {
    new: true,
    runValidators: true
  });

  if (!task) {
    const error = new Error(`Task not found with ID: ${id}`);
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const patchTask = async (id, updateFields) => {
  validateObjectId(id);

  if (!updateFields || typeof updateFields !== 'object' || Object.keys(updateFields).length === 0) {
    const error = new Error('No valid fields provided for update');
    error.statusCode = 400;
    throw error;
  }

  const payload = {};

  if (updateFields.title !== undefined) {
    if (typeof updateFields.title !== 'string' || !updateFields.title.trim()) {
      const error = new Error('Task title cannot be empty');
      error.statusCode = 400;
      throw error;
    }
    payload.title = updateFields.title.trim();
  }

  if (updateFields.description !== undefined) {
    payload.description = typeof updateFields.description === 'string' ? updateFields.description.trim() : '';
  }

  if (updateFields.completed !== undefined) {
    if (typeof updateFields.completed !== 'boolean') {
      const error = new Error('Completed status must be a boolean');
      error.statusCode = 400;
      throw error;
    }
    payload.completed = updateFields.completed;
  }

  const task = await Task.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });

  if (!task) {
    const error = new Error(`Task not found with ID: ${id}`);
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const deleteTask = async (id) => {
  validateObjectId(id);
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    const error = new Error(`Task not found with ID: ${id}`);
    error.statusCode = 404;
    throw error;
  }

  return task;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  patchTask,
  deleteTask
};
