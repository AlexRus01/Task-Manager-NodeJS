
const getAllTasks = (req, res) => {
    res.send('Get all Tasks')
}

const createTask = (req, res) => {
    res.send('Create Task')
}

const getTask = (req, res) => {
    res.send('Get single Task')
}

const updateTask = (req, res) => {
    res.send('Update Task')
}

const deleteTask = (req, res) => {
    res.send('Delete Taks')
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask
}