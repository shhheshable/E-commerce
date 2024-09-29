const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Fetch all cart items for a specific user
router.get('/cart:clientId', cartController.getCartItems);

// Add an item to the cart
router.post('/cart:clientId', cartController.addToCart);

// Update the quantity of an item in the cart
router.put('/cart:clientId', cartController.updateCartItem);

// Delete an item from the cart
router.delete('/cart:clientId/:productId', cartController.deleteCartItem);

module.exports = router;
