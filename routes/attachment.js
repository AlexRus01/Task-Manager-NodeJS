const express = require('express');
const { uploadAttachment, getAttachments } = require('../controllers/attachment');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Upload a photo for a task
router.post('/:taskId/upload', uploadAttachment);

// Get all attachments for a task
router.get('/:taskId', getAttachments);

module.exports = router;
