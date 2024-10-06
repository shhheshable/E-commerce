const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Use 'signupRoutes' for clarity
const signupRoutes = require('./routes/signupRoutes');
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes')
const accsRoutes = require('./routes/accsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const adminAccRoutes = require('./routes/adminAccRoutes');


const app = express();
const session = require('express-session');

app.use(session({
    secret: 'your-secret-key', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.get('/some-protected-route', (req, res) => {
    const userToken = req.session.userToken; // Access the token from the session

    if (!userToken) {
        return res.status(401).send('Unauthorized'); // No token, deny access
    }

    // Proceed with your logic using the token
    res.send('Protected route accessed with token: ' + userToken);
});

app.use((req, res, next) => {
    res.locals.userToken = req.session.userToken; // Add the token to res.locals
    next();
});


// Define the views directory (where your .ejs files are located)
app.set('views', path.join(__dirname, 'views')); 

app.use('/src/images', express.static(path.join(__dirname, 'src/images')));


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (for CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For parsing application/json


// Set up routes
app.use('/', authRoutes); // Now this correctly uses signupRoutes
app.use('/', signupRoutes);
app.use('/', homeRoutes);
app.use('/', productRoutes);
app.use('/', accsRoutes);
app.use('/', ordersRoutes);
app.use('/cart', cartRoutes);
app.use('/', adminAccRoutes);


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