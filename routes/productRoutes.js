const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/images'); // Ensure the directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Add product (multer middleware for image upload)
router.post('/addProduct', upload.single('productImage'), productController.addProduct);

// Route to render the Admin Manage Products page
router.get('/AdminMngProduct', (req, res) => {
    res.render('admin/AdminMngProduct', { token: req.session.userToken });
});

//////////////////// Route to get all products
router.get('/products', productController.getProducts); 

router.get('/products/:id', productController.getProductById);

router.put('/products/:id', productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);



module.exports = router;
