const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const { filter, sort, page = 1, limit = 2 } = req.query;

        // Build filter query
        const filterQuery = filter ? JSON.parse(filter) : {};

        // Build sort query
        const sortQuery = sort ? JSON.parse(sort) : {};

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Fetch tasks with filtering, sorting, and pagination
        const tasks = await Task.find(filterQuery)
            .sort(sortQuery)
            .skip(skip)
            .limit(parseInt(limit));

        const totalTasks = await Task.countDocuments(filterQuery);

        res.status(200).json({
            tasks,
            totalPages: Math.ceil(totalTasks / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findById(taskID);
        if (!task) {
            return res.status(404).json({ msg: `No task with id : ${taskID}` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const updatedTask = req.body;
        const task = await Task.findByIdAndUpdate(taskID, updatedTask, { new: true });

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findByIdAndDelete(taskID);

        if (!task) {
            return res.status(404).json({ msg: `No task with id : ${taskID}` });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask
};
