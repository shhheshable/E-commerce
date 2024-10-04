const productModel = require('../models/productModel');

exports.addProduct = (req, res) => {
    const productData = req.body;
    const productImage = req.file ? req.file.filename : null;

    console.log('Product Data:', productData); // Log product data
    console.log('Uploaded File:', productImage); // Log uploaded file name

    productModel.addProduct(productData, productImage, (err, result) => {
        if (err) {
            console.error('Error adding product to database:', err); // Log database error
            return res.status(500).send('Error adding product to database.');
        }
        res.send('Product added successfully'); // Respond with success message
    });
};
