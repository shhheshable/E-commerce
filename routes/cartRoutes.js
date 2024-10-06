const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to handle adding items to the cart
router.post('/add', cartController.addToCart);

// Route to get cart items
router.get('/items', cartController.getCartItems);

router.post('/remove', cartController.removeCartItem); // Ensure this matches your controller method

// Route to display the cart page
router.get('/accInfo', (req, res) => {
    const userToken = req.query.token || req.session.userToken; // Ensure you're retrieving the token correctly
    console.log('User Token in Home Routes:', userToken); // Log here to debug

    res.render('user/accInfo', { token: userToken }); // Pass the token to the view
});

module.exports = router;
