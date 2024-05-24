const Task = require('../models/Task');
const mongoose = require('mongoose');

const getAllTasks = async (req, res) => {
    try {


        const tasks = await Task.find({})


        res.status(200).json({
            tasks

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

const stringToObjectId = (str) => {
    return mongoose.Types.ObjectId(str);
};

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        if (!mongoose.Types.ObjectId.isValid(taskID)) {
            return res.status(400).json({ msg: `Invalid task id: ${taskID}` });
        }

        const objectId = stringToObjectId(taskID);
        const task = await Task.findById(objectId);

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        if (!mongoose.Types.ObjectId.isValid(taskID)) {
            return res.status(400).json({ msg: `Invalid task id: ${taskID}` });
        }
        const updatedTask = req.body;
        const objectId = stringToObjectId(taskID);
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

        // Check if taskID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(taskID)) {
            return res.status(400).json({ msg: `Invalid task id: ${taskID}` });
        }

        const objectId = stringToObjectId(taskID);
        const task = await Task.findById(objectId);

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }

        await Task.findByIdAndDelete(objectId);

        res.status(200).json({ msg: `Task with id: ${taskID} was deleted successfully` });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getAllCompletedTasks = async (req, res) => {
    try {
        const { sort, page = 1, limit = 2 } = req.query;

        // Fixed filter for completed tasks
        const filterQuery = { completed: true };

        const sortQuery = sort ? JSON.parse(sort) : {};

        const skip = (page - 1) * limit;

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

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask,
    getAllCompletedTasks
};
