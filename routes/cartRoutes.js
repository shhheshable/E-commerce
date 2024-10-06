const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to handle adding items to the cart
router.post('/add', cartController.addToCart);

// Route to get cart items
router.get('/items', cartController.getCartItems);

module.exports = router;
