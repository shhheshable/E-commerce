const ProductModel = require('../models/productModel');

const index = (req, res) => {
    ProductModel.getAllProducts((err, products) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving products. Please try again later.');
        }


        res.render('index', { products });
    });
};


const addToCart = (req, res) => {
    const { IdNum, Quantity } = req.body;
    const ProductID = req.params.productID;

    const cartData = {
        Quantity,
        IdNum,
        ProductID
    };

    ProductModel.addToCart(cartData, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error adding to cart');
        }
        res.redirect('/'); 
    });
};

const cart = (req, res) => {
    const userId = 1; 
    ProductModel.getProductCart(userId, (err, cartItems) => { 
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving products. Please try again later.');
        }

        res.render('cart', { cartItems }); 
    });
};


const deleteItemFromCart = async (req, res) => {
    const cartId = req.params.cartId;

    try {
        await ProductModel.deleteCartItem(cartId);
        res.redirect('/cart'); 
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).send('Internal Server Error');
    }
};



    const checkoutCart= (req, res) => {
        const selectedCartIds = req.body.selectedCartIds; 

        
        if (!selectedCartIds || selectedCartIds.length === 0) {
            return res.status(400).send('No items selected for checkout.');
        }

        ProductModel.getSelectedCartItems(selectedCartIds, (err, cartItems) => {
            if (err) {
                return res.status(500).send('Error fetching selected cart items.');
            }

            res.render('checkout', { cartItems });
        });
    };

module.exports = { addToCart, index, cart, deleteItemFromCart, checkoutCart };
