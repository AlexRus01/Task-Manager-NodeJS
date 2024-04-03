//Initializam serverul express
const express = require('express')
const app = express()

const tasks = require('./routes/tasks')

// middleWare

app.use(express.json())


// rute
app.get('/hello', (req, res) => {
    res.send('Task Manager App + Github')
    
})

app.use('/api/v1/tasks', tasks)


const port = 3000

app.listen(port, console.log(`Serverul functioneaza pe portul ${port}...`))