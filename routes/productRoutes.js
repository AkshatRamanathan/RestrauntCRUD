const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/view/:id', productController.viewProduct);
router.post('/add', productController.addProduct);
router.post('/update/:id', productController.updateProduct);
router.get('/delete/:id', productController.deleteProduct);

module.exports = router;
