const express = require('express');
const taskRoutes = require('./taskRoutes'); // Importing the task routes
const app = express();

app.use(express.json()); // for parsing application/json
app.use('/tasks', taskRoutes); // Use task routes

// For Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!'); 
});

// Server listens on environment-defined port or 3000 as default
const PORT = process.env.PORT || 3000; 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
