const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

// Route to render the Admin Manage Products page
router.get('/AdminMngOrder', (req, res) => {
    res.render('admin/AdminMngOrder', { token: req.session.userToken });
});

module.exports = router;