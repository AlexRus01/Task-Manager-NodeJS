const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://<username>:<password>@cluster0.bbzg8jn.mongodb.netAlexTask?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(connectionString)