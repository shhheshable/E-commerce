// models/productModel.js
const db = require('../config/db');

const createProduct = (product) => {
    return new Promise((resolve, reject) => {
        const { product_name, price, quantity, images_path } = product;

        const sql = 'INSERT INTO products (product_name, price, quantity, images_path) VALUES (?, ?, ?, ?)';
        db.query(sql, [product_name, price, quantity, images_path], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results.insertId); // Return the ID of the new product
        });
    });
};

module.exports = { createProduct };
