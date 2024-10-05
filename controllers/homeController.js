const homeModel = require('../models/homeModel');

// // Function to render the home page with product data
// exports.renderHomePage = (req, res) => {
//     homeModel.getAllProducts((err, products) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error fetching products');
//         }

//         // Pass the products and user token from session to the EJS template
//         const userToken = req.session.userToken || null; // Use null if userToken is not present

//         res.render('user/home', { products, userToken }); // Ensure both products and userToken are passed to the view
//     });
// };


// Function to render the home page with product data
exports.renderHomePage = (req, res) => {
    homeModel.getAllProducts((err, products) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching products');
        }
        // Pass userToken from session along with products to the view
        res.render('user/home', { products, userToken: req.session.userToken }); 
    });
};