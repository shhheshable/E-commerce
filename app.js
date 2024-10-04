const express = require('express');
const path = require('path');
const multer = require('multer');

const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Ensure this is correctly pointing to your routes
const signupRoutes = require('./routes/signupRoutes');
const homeRoutes = require('./routes/homeRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Renamed for clarity
const productRoutes = require('./routes/productRoutes');
const productController = require('./controllers/productController');

const app = express();
const session = require('express-session');

// Set up session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Protected route example
app.get('/some-protected-route', (req, res) => {
    const userToken = req.session.userToken; // Access the token from the session

    if (!userToken) {
        return res.status(401).send('Unauthorized'); // No token, deny access
    }

    // Proceed with your logic using the token
    res.send('Protected route accessed with token: ' + userToken);
});

// Middleware to make userToken available in views
app.use((req, res, next) => {
    res.locals.userToken = req.session.userToken; // Add the token to res.locals for use in views
    next();
});

// Define the views directory (where your .ejs files are located)
app.set('views', path.join(__dirname, 'views')); 

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (for CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.use('/', authRoutes);
app.use('/', signupRoutes);
app.use('/', homeRoutes);
app.use('/', adminRoutes); // Renamed for clarity
app.use('/products', productRoutes); // Fixed incorrect path './products' to '/products'

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

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

// Initialize Multer
const upload = multer({ storage });

// Define routes for product image upload and product listing
app.post('/products', upload.single('productImage'), productController.addProduct); // Add new product
app.get('/products', productController.getAllProducts); // Get all products

// Serve static files (like uploaded images)
app.use('/uploads', express.static('uploads')); // Serve files from uploads folder
