const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { signup, signin, getCurrentUser, checkAuth } = require('../controllers/auth');


const {getAllTasks, createTask, getTask, deleteTask, updateTask, getAllCompletedTasks} = require('../controllers/tasks')
router.route('/completed').get(getAllCompletedTasks);

router.route('/').get(getAllTasks).post(authMiddleware, createTask);

router.route('/:id').get(authMiddleware, getTask).patch(authMiddleware, updateTask).delete(authMiddleware, deleteTask)


module.exports = router