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
    }
    
})

module.exports = mongoose.model('Task', TaskSchema)
