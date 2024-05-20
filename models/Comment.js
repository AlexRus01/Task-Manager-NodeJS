const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    minlength: [1, 'Comment content must be at least 1 character']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
