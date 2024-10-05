const express = require('express');
const router = express.Router();
const adminController = require('../controllers/authController');

router.post('/login', adminController.logs);

//display and admin dashboard
router.get('/dashboard', (req, res) =>{
    res.render('admin/dashboard');
});

router.get('/', (req, res) => {
    res.redirect('/dashboard');
});


router.get('/AdminMngProduct', (req, res) => {
    const userToken = req.query.token || req.session.userToken;
    res.render('admin/AdminMngProduct', { token: userToken }); // Pass token to the view
});

router.get('/AdminMngAcc', (req, res) => {
    const userToken = req.query.token || req.session.userToken;
    res.render('admin/AdminMngAcc', { token: userToken }); // Pass token to the view
});



module.exports = router;
