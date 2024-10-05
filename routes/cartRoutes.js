const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const cartController = require('../controllers/cartController'); // Make sure the path to the controller is correct

// Define routes
router.get('/', cartController.index);
router.post('/add/:productID', cartController.addToCart);
router.get('/cart', cartController.cart);
router.post('/checkout', cartController.checkoutCart);
router.post('/delete/:cartId', cartController.deleteItemFromCart);
=======
const cartController = require('../controllers/cartController');

// Fetch all cart items for a specific user
router.get('/cart:clientId', cartController.getCartItems);

// Add an item to the cart
router.post('/cart:clientId', cartController.addToCart);

// Update the quantity of an item in the cart
router.put('/cart:clientId', cartController.updateCartItem);

// Delete an item from the cart
router.delete('/cart:clientId/:productId', cartController.deleteCartItem);
>>>>>>> origin/Glesie-Maranan

module.exports = router;
