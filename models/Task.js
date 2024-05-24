const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide name'],
        minlength: [3, 'Name needs to be more than 3 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
    attachments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attachment'
    }]
});

module.exports = mongoose.model('Task', TaskSchema);
