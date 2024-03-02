const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.dashboard);
router.get('/manageUsers', adminController.manageUsers);
router.get('/createUser', adminController.renderCreateUserForm);
router.post('/createUser', adminController.createUser);
router.post('/editUser/:id', adminController.editUser);
router.get('/editUser/:id', adminController.editUserPage);
router.get('/deleteUser/:id', adminController.deleteUser);
router.get('/manageProducts', adminController.manageProducts);
router.post('/addProduct', adminController.addProduct);
router.get('/addProduct', adminController.addProductPage);
router.post('/editProduct/:id', adminController.editProduct);
router.get('/editProduct/:id', adminController.editProductPage);
router.get('/deleteProduct/:id', adminController.deleteProduct);
router.get('/salesReport', adminController.salesReport);
router.get('/userReport', adminController.userReport);

module.exports = router;
