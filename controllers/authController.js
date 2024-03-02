const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');

// User Registration
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Create new user (password will be hashed in pre-save hook)
        const user = new User({ name, email, password, role });
        await user.save();

        // Redirect to login page after registration
        res.redirect('/common/login');
    } catch (error) {
        res.status(500).send('Error in registration');
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('User not found');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate JWT token
        const token = generateToken(user);

        // Set token in HTTP-only cookie
        res.cookie('authToken', token, { httpOnly: true, sameSite: 'Strict', maxAge: 5*60*1000, expires:false });


        // Redirect based on user role
        if (user.role === 'admin') {
            res.render("admin/adminDashboard", { user, message: "Admin logged in successfully" });
        } else {
            res.render("user/userDashboard", { user, message: "User logged in successfully" });
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};


// User Logout
const logout = async (req, res) => {
    // Clear the authentication cookie
    res.clearCookie('authToken');
    res.redirect('/common/login');
};

module.exports = {
    register,
    login,
    logout
};



