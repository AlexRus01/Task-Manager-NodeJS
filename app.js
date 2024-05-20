// app.js
require('./db/connect');
const express = require('express');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const authMiddleware = require('./middleware/auth'); // Import your custom middleware
const attachmentRoutes = require('./routes/attachment'); // Import attachment routes


const app = express();

// Middleware
app.use(express.static('./public'))
app.use(express.json());

// Rute publice
app.use('/api/v1/auth', authRoutes);

// Rute private (folosesc middleware-ul de autentificare)
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/attachments', attachmentRoutes); // Use attachment routes


const port = 3000;
app.listen(port, console.log(`Serverul functioneaza pe portul ${port}...`));


// Public rou
