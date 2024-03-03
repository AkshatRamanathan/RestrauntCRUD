const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const path = require('path');
const jwt = require('jsonwebtoken');
// const config = require('./config'); // Ensure you have your database URI and JWT secret here

// Importing route modules
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

// Importing JWT middleware
const { verifyTokenMiddleware } = require('./utils/auth');

const app = express();

// Connect to MongoDB
mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`, {})
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.error("MongoDB connection error: ", err));

// Mustache Templating Engine Setup
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); // Parse cookies for JWT
app.use(express.static(path.join(__dirname, 'public')));

// Home Route with JWT Check
app.use((req, res, next) => {
    const token = req.cookies.authToken; // Assuming JWT token is stored in a cookie named 'authToken'
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.isLoggedIn = true;
            res.locals.dashboardLink = decoded.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
        } catch (error) {
            res.locals.isLoggedIn = false;
            res.locals.dashboardLink = '/';
        }
    } else {
        res.locals.isLoggedIn = false;
        res.locals.dashboardLink = '/';
    }
    next();
});

// Routes
app.use('/auth', authRoutes);

// Protected Routes
app.use('/user', verifyTokenMiddleware, userRoutes);
app.use('/admin', verifyTokenMiddleware, adminRoutes);
app.use('/product', verifyTokenMiddleware, productRoutes);

// Home Route
app.get('/', (req, res) => {
    if (res.locals.isLoggedIn) {
        res.redirect(res.locals.dashboardLink);
    } else {
        res.render('home');
    }
});

// Route to render the login page
app.get('/common/login', (req, res) => {
    res.render('common/login', {
        title: 'Login'
    });
});

// Route to render the registration page
app.get('/common/register', (req, res) => {
    res.render('common/register', {
        title: 'Register'
    });
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));

module.exports = app;

