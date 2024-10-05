<<<<<<< HEAD
const ProductModel = require('../models/productModel');

const index = (req, res) => {
    ProductModel.getAllProducts((err, products) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving products. Please try again later.');
        }


        res.render('index', { products });
    });
};


const addToCart = (req, res) => {
    const { IdNum, Quantity } = req.body;
    const ProductID = req.params.productID;

    const cartData = {
        Quantity,
        IdNum,
        ProductID
    };

    ProductModel.addToCart(cartData, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error adding to cart');
        }
        res.redirect('/'); 
    });
};

const cart = (req, res) => {
    const userId = 1; 
    ProductModel.getProductCart(userId, (err, cartItems) => { 
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving products. Please try again later.');
        }

        res.render('cart', { cartItems }); 
    });
};


const deleteItemFromCart = async (req, res) => {
    const cartId = req.params.cartId;

    try {
        await ProductModel.deleteCartItem(cartId);
        res.redirect('/cart'); 
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).send('Internal Server Error');
    }
};



    const checkoutCart= (req, res) => {
        const selectedCartIds = req.body.selectedCartIds; 

        
        if (!selectedCartIds || selectedCartIds.length === 0) {
            return res.status(400).send('No items selected for checkout.');
        }

        ProductModel.getSelectedCartItems(selectedCartIds, (err, cartItems) => {
            if (err) {
                return res.status(500).send('Error fetching selected cart items.');
            }

            res.render('checkout', { cartItems });
        });
    };

module.exports = { addToCart, index, cart, deleteItemFromCart, checkoutCart };
=======
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes'); 


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
>>>>>>> origin/Glesie-Maranan
