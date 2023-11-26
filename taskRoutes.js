const express = require('express');
const router = express.Router();

let tasks = [];
let currentId = 0;

/**
 * Checks if the provided due date is valid and in the future.
 * @param {string} dueDate - The due date string to validate.
 * @returns {boolean} - Returns true if the due date is valid and in the future, false otherwise.
 */
function isValidDueDate(dueDate) {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
        return false; // Invalid date format
    }
    const now = new Date();
    return date > now;
}

/**
 * Checks if the task ID in the request is a valid number. If not, sends an error response.
 * @param {object} req - The request object. Contains the ID to validate.
 * @param {object} res - The response object. Used to send back an error if needed.
 * @param {function} next - The next middleware function to call if the ID is valid.
 */
function validateId(req, res, next) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    req.taskId = id; // Storing validated ID for further use
    next();
}

/**
 * POST /tasks
 * Creates a new task with the given details in the request body.
 * Required fields in the body: title, dueDate.
 * Optional fields in the body: description, status.
 */
router.post('/', (req, res) => {
  const { title, dueDate, description = '', status = 'pending' } = req.body;
  if (!title || !dueDate) {
    return res.status(400).json({ message: 'Title and due date are required' });
  }
  
  if (!isValidDueDate(dueDate)) {
    return res.status(400).json({ message: 'Invalid or past due date' });
  }

  const newTask = { id: ++currentId, title, description, dueDate, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * GET /tasks
 * Retrieves a list of all tasks.
 */
router.get('/', (req, res) => {
  res.json(tasks);
});

/**
 * GET /tasks/:id
 * Retrieves the details of a task specified by the task ID in the URL.
 */
router.get('/:id', validateId, (req, res) => {
    const task = tasks.find(t => t.id === req.taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

/**
 * PUT /tasks/:id
 * Updates the details of a specific task, identified by the task ID in the URL.
 * Fields in the body that can be updated: title, description, dueDate, status.
 */
router.put('/:id', validateId, (req, res) => {
  const task = tasks.find(t => t.id === req.taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const { title, description, dueDate, status } = req.body;
  if (dueDate && !isValidDueDate(dueDate)) {
    return res.status(400).json({ message: 'Invalid or past due date' });
  }

  task.title = title !== undefined ? title : task.title;
  task.description = description !== undefined ? description : task.description;
  task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
  task.status = status !== undefined ? status : task.status;

  res.status(200).json(task);
});

/**
 * DELETE /tasks/:id
 * Deletes a task specified by the task ID in the URL.
 */
router.delete('/:id', validateId, (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

module.exports = router;
