
const getAllTasks = (req, res) => {
    res.send('Get all Tasks')
}

const createTask = (req, res) => {
    res.json(req.body)
}

const getTask = (req, res) => {
    res.json("{id:req.params.id}")
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

/*
mongodb+srv://<username>:<password>@cluster0.bbzg8jn.mongodb.netAlexTask?retryWrites=true&w=majority&appName=Cluster0

database Name = AlexTask
*/