const Attachment = require('../models/Attachment');
const Task = require('../models/Task');
const upload = require('../middleware/upload');
const mongoose = require('mongoose');


const uploadAttachment = async (req, res) => {
    const { taskId } = req.params;

    // Check if taskId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ msg: 'Invalid task ID format' });
    }

    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
        return res.status(404).json({ msg: `No task found with id: ${taskId}` });
    }

    // Proceed with file upload
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }

        if (!req.file) {
            return res.status(400).json({ msg: 'No files uploaded' });
        }

        try {
            // Save attachment
            const attachment = new Attachment({
                filename: req.file.filename,
                filepath: req.file.path,
                task: taskId
            });

            await attachment.save();

            // Ensure only the attachments array is updated without affecting the user field
            task.attachments.push(attachment._id);
            await Task.updateOne(
                { _id: taskId },
                { $push: { attachments: attachment._id } }
            );

            res.status(201).json({ attachment });
        } catch (error) {
            res.status(401).json({ msg: error.message });
        }
    });
};

const getAttachments = async (req, res) => {
    try {
        const attachments = await Attachment.find({ task: req.params.taskId });
        res.status(200).json({ attachments });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    uploadAttachment,
    getAttachments
};
