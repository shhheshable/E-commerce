const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); // Make sure the path to the controller is correct

// Define routes
router.get('/', cartController.index);
router.post('/add/:productID', cartController.addToCart);
router.get('/cart', cartController.cart);
router.post('/checkout', cartController.checkoutCart);
router.post('/delete/:cartId', cartController.deleteItemFromCart);

module.exports = router;
