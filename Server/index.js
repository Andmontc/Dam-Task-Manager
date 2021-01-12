const express = require('express');
const connectdb = require('./config/db');
const cors = require('cors');

// create server
const app = express();

// connect to the database
connectdb();

// cors
app.use(cors());

// express.json functionallity
app.use(express.json({ extended: true }));

// app port
const PORT = process.env.PORT || 4000;

// import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// start server
app.listen(PORT, ()  => {
	console.log(`Server running in port ${PORT}`);
});