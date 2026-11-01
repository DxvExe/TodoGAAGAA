const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  patchTask,
  deleteTask
} = require('../controllers/taskController');

router.route('/')
  .post(createTask)
  .get(getAllTasks);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .patch(patchTask)
  .delete(deleteTask);

module.exports = router;
