// adminAccRoutes.js
const express = require('express');
const router = express.Router();
const adminAccController = require('../controllers/adminAccController');

// Route to get admin account information
router.get('/AdminAcc', adminAccController.getAdminAccount);

module.exports = router;
