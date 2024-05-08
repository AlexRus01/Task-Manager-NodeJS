require('./db/connect')

//Initializam serverul express
const express = require('express')
const app = express()

const tasks = require('./routes/tasks')

// middleWare
app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1/tasks', tasks)


const port = 3000

app.listen(port, console.log(`Serverul functioneaza pe portul ${port}...`))