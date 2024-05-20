const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { signup, signin, getCurrentUser, checkAuth } = require('../controllers/auth');


const {getAllTasks, createTask, getTask, deleteTask, updateTask} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)

router.route('/:id').get(authMiddleware, getTask).patch(updateTask).delete(deleteTask)



module.exports = router