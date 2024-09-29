const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

//display and admin dashboard
router.get('/dashboard', (req, res) =>{
    res.render('admin/dashboard');
});

router.get('/', (req, res) => {
    res.redirect('/dashboard');
})


module.exports = router;
