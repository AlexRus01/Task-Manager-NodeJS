const Task = require('../models/Task')


const getAllTasks = async (req, res) => {

    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }catch(error){
        res.status(500).json( {msg: error})
    }

}

const createTask = async (req, res) => {
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }catch(error){
        res.status(500).json({msg: error})
    }
}

const getTask = async (req, res) => {
    try{
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID});
        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json( {task} )
    }catch(error){
        res.status(500).json({msg: error})
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const updatedTask = req.body; // Updated task data from request body

        // Find the task by ID and update it with the new data
        const task = await Task.findOneAndUpdate(
            { _id: taskID },
            updatedTask,
            { new: true } // Return the updated document
        );

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteTask =  async (req, res) => {
    try{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});

        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }

        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg: error})
    }
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