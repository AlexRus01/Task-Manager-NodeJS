//Initializam serverul express
const express = require('express')
const app = express()

// ruta

app.get('/hello', (req, res) => {
    res.send('Task Manager App + Github')
    
})


const port = 3000

app.listen(port, console.log(`Serverul functioneaza pe portul ${port}...`))