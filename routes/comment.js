const express = require('express');
const { createComment, getCommentsByTask, updateComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/:taskId', authMiddleware, createComment);
router.get('/task/:taskId', getCommentsByTask);
router.put('/:commentId', authMiddleware, updateComment);
router.delete('/:commentId', authMiddleware, deleteComment);

module.exports = router;
