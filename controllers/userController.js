const User = require('../models/User');
const Order = require('../models/Order');
const bcrypt = require('bcrypt');
const Product = require('../models/product');

// Access User Dashboard
const dashboard = async (req, res) => {
    try {
        const userId = req.user.id; // Extracting user ID from JWT
        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/common/login');
        }

        res.render('user/userDashboard', { user });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Get User Profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Extracting user ID from JWT
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('user/profile', { user });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Update User Profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Extracting user ID from JWT
        const { name, email, password } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.name = name;
        user.email = email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.render('user/userDashboard', { user });
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};

// View Available Products
const viewProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('user/viewProducts', { products });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Buy a Product
const buyProduct = async (req, res) => {
    try {
        const productId = req.params.id; // or req.body.productId based on how you send data
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Logic to handle the purchase, like creating an order
        const newOrder = new Order({
            user: req.user.id, // Ensure the user is correctly identified
            products: [{ product: productId, quantity: 1 }], // Example
            totalPrice: product.price // Or calculate based on quantity
        });

        await newOrder.save();

        res.render('user/viewProducts', { message: "Purchase successful!", products: await Product.find() });
    } catch (error) {
        res.status(500).send('Error processing your purchase');
    }
};

const purchaseHistory = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from JWT token
        const orders = await Order.find({ user: userId }).populate('products.product');

        res.render('user/purchaseHistory', { orders, noOrders: orders.length === 0 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving purchase history');
    }
};

module.exports = {
    dashboard,
    getProfile,
    updateProfile,
    viewProduct,
    buyProduct,
    purchaseHistory

};
