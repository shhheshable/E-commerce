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


/////////////////

// Fetch all products
exports.getProducts = (req, res) => {
    productModel.getAllProducts((err, products) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching products.' });
        }
        res.json(products); // Send the products as JSON
    });
};

// controllers/productController.js

// Fetch product by ID and display in the edit modal
exports.getProductById = (req, res) => {
    const productId = req.params.id;

    productModel.getProductById(productId, (err, product) => {
        if (err) {
            console.error("Error fetching product by ID:", err); // Log the error for debugging
            return res.status(500).json({ error: 'Error fetching product data' });
        }

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Return the product data as a response (for AJAX request)
        res.json(product);
    });
};


exports.updateProduct = (req, res) => {
    const productId = req.params.id; // Get the product ID from the URL parameter
    const updatedData = {
        product_name: req.body.product_name,
        quantity: req.body.product_quantity,
        price: req.body.product_price
    };

    // Call the model function to update the product
    productModel.updateProductById(productId, updatedData, (err, result) => {
        if (err) {
            console.error("Error updating product:", err); // Log the error
            return res.status(500).json({ error: 'Error updating product' });
        }

        return res.json({ success: true, message: 'Product updated successfully' });
    });
};


exports.deleteProduct = (req, res) => {
    const productId = req.params.id;

    productModel.deleteProductById(productId, (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ message: 'Error deleting product' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
};
