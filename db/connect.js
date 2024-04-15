const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://matei:1234@cluster0.bbzg8jn.mongodb.net/AlexTaskDb?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
}).then(() => console.log('CONNECTED TO THE DB...')).catch((err) => console.log(err))


