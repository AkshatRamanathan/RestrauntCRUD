const User = require('../models/User');
const Product = require('../models/product');
const Order = require('../models/Order');

// Admin Dashboard
const dashboard = async (req, res) => {
    try {
        // Implement logic for dashboard data if needed
        res.render('admin/adminDashboard');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Manage Users
const manageUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.render('admin/manageUsers', { users });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const renderCreateUserForm = (req, res) => {
    try {
        res.render('admin/createUser'); // Path to your createUser Mustache template
    } catch (error) {
        res.status(500).send('Error rendering user creation form');
    }
};
// Add User
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let user = new User({ name, email, password, role });
        await user.save();
        res.redirect('/admin/manageUsers');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
};

// Edit User Page
const editUserPage = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('admin/editUser', { user });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Update User
const editUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.name = name;
        user.email = email;
        user.password = password; // Note: Ensure the User model hashes the password if it's modified
        user.role = role;
        await user.save();
        res.redirect('/admin/manageUsers');
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin/manageUsers');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};

// Manage Products
const manageProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('admin/manageProducts', { products });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Add Product Page
const addProductPage = async (req, res) => {
    try {
        res.render('admin/addProduct');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, price, description, spiciness } = req.body;
        let product = new Product({ name, price, description, spiciness });
        await product.save();
        res.redirect('/admin/manageProducts');
    } catch (error) {
        res.status(500).send('Error adding product');
    }
};

// Edit Product Page
const editProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('admin/editProduct', { product });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Edit Product
const editProduct = async (req, res) => {
    try {
        const { name, price, description, spiciness } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
            product.spiciness = spiciness;
            await product.save();
        }
        res.redirect('/admin/manageProducts');
    } catch (error) {
        res.status(500).send('Error updating product');
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin/manageProducts');
    } catch (error) {
        res.status(500).send('Error deleting product');
    }
};

const salesReport = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('products.product');

        let totalSales = 0;
        let salesByProduct = {};

        orders.forEach(order => {
            totalSales += order.totalPrice;

            order.products.forEach(({ product, quantity }) => {
                if (product && product.name) {
                    if (!salesByProduct[product.name]) {
                        salesByProduct[product.name] = { quantity: 0, sales: 0 };
                    }
                    salesByProduct[product.name].quantity += quantity;
                    salesByProduct[product.name].sales += product.price * quantity;
                }
            });
        });

        // Convert to array for Mustache
        const salesByProductArray = Object.entries(salesByProduct).map(([name, data]) => ({
            name,
            quantity: data.quantity,
            sales: data.sales
        }));

        res.render('admin/salesReport', { totalSales, salesByProduct: salesByProductArray });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Generate User Report
const userReport = async (req, res) => {
    try {
        const users = await User.find({});
        res.render('admin/userReport', { users });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

module.exports = {
    dashboard,
    manageUsers,
    renderCreateUserForm,
    createUser,
    editUser,
    editUserPage,
    deleteUser,
    manageProducts,
    addProductPage,
    addProduct,
    editProduct,
    editProductPage,
    deleteProduct,
    salesReport,
    userReport
};

