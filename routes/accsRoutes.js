const express = require('express');
const router = express.Router();
const accsController = require('../controllers/accsController');
const multer = require('multer');

// Route to render the Admin Manage Products page
router.get('/AdminMngAcc', (req, res) => {
    res.render('admin/AdminMngAcc', { token: req.session.userToken });
});

router.get('/users', accsController.getUsers);

module.exports = router;
