const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/homeRoutes');

const app = express();

// Define the views directory (where your .ejs files are located)
app.set('views', path.join(__dirname, 'views')); 

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (for CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.use('/', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
