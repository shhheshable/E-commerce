const db = require('../config/db');

const ProductModel = {
    
    getAllProducts: (callback) => {
        const query = 'SELECT `ProductID`, `ProductName`, `Price`, `NumberOfStock`, `Description`, `Picture`, `Category` FROM `tblproduct`';
        db.query(query, callback);
    },

    
    addToCart: (cartData, callback) => {
        const query = `INSERT INTO tblcart (Quantity, IdNum, ProductID) VALUES (?, ?, ?)`; 
        db.query(query, [cartData.Quantity, cartData.IdNum, cartData.ProductID], callback);
    },

    
    getProductCart: (userId, callback) => {
        const query = `
            SELECT 
                c.CartID, 
                c.Quantity, 
                p.ProductName, 
                p.Price, 
                p.Picture 
            FROM 
                tblcart c 
            JOIN 
                tblproduct p ON c.ProductID = p.ProductID 
            WHERE 
                c.IdNum = ?`;
        db.query(query, [userId], callback);
    },

    
    deleteCartItem: (cartId) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM tblcart WHERE CartID = ?', [cartId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },

   
    getSelectedCartItems: (cartIds, callback) => {
        const query = `
            SELECT 
                c.CartID, 
                c.Quantity, 
                p.ProductName, 
                p.Price, 
                p.Picture 
            FROM 
                tblcart c 
            JOIN 
                tblproduct p ON c.ProductID = p.ProductID 
            WHERE 
                c.CartID IN (?)`; 

        db.query(query, [cartIds], callback); 
    }
};

module.exports = ProductModel;
