const cartModel = require('../models/cartModel'); // Adjust the path if necessary
const productModel = require('../models/productModel'); // Import your product model

exports.addToCart = (req, res) => {
    const productId = req.body.productId; // Get the product ID from the form
    const token = req.body.token; // Get the user token from the form

    // Check if the token is valid
    cartModel.validateToken(token, (err, user) => {
        if (err || !user) {
            return res.status(401).send('User is not authenticated.'); // Token validation failed
        }

        // Instead of userId, we are now correctly passing userToken
        const userToken = token;

        // Insert or update the cart
        cartModel.addToCart(userToken, productId, (err) => {
            if (err) {
                console.error('Error adding product to cart:', err);
                return res.status(500).send('Error adding product to cart.');
            }

            // Fetch the products to pass to the home page
            productModel.getAllProducts((err, products) => { // Assuming you have a function to get all products
                if (err) {
                    console.error('Error fetching products:', err);
                    return res.status(500).send('Error fetching products.');
                }

                
                // Render the home page with the products and success message
                res.render('user/home', { 
                    message: 'Product successfully added to cart.', 
                    products: products // Pass the products to the view
                    
                });
            });
        });
    });
};

// Controller function to get cart items
exports.getCartItems = (req, res) => {
    const userToken = req.query.token || req.session.userToken; // Check for the token in query or session
    console.log('User Token1:', userToken); // Log the token for debugging

    cartModel.getCartItems(userToken, (err, cartItems) => {
        if (err) {
            console.error('Error fetching cart items:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        console.log('Cart Items:', cartItems); // Log the cart items

        // Send the cart items and token as a JSON response
        res.json({
            token: userToken,
            items: cartItems // Send cart items as 'items'
        });
    });
};
