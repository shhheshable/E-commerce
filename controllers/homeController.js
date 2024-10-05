const homeModel = require('../models/homeModel'); 

// Function to render the home page with product data
exports.renderHomePage = (req, res) => {
    homeModel.getAllProducts((err, products) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching products');
        }
        res.render('user/home', { products }); // Ensure products is passed to the view
    });
};
