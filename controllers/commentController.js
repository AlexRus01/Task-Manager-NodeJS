const Comment = require('../models/Comment');
const Task = require('../models/Task');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
      const { content } = req.body;
      const userId = req.user._id;  // Extract user ID from request
      const taskId = req.params.taskId;  // Extract taskId from route parameters

      const task = await Task.findById(taskId);
      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }

      const comment = new Comment({ content, user: userId, task: taskId });
      await comment.save();
      res.status(201).json(comment);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Get all comments for a task
exports.getCommentsByTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const comments = await Comment.find({ task: taskId }).populate('user', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { content } = req.body;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = req.user._id;
        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        comment.content = content;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = req.user._id;
        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await comment.remove();
        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
