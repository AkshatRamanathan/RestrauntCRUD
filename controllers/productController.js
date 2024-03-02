const Product = require('../models/product');

// View a Single Product
async function viewProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('product/viewProduct', { product });
    } catch (error) {
        res.status(500).send('Server error');
    }
}

// Add a New Product
const addProduct = async (req, res) => {
    try {
        const { name, price, description, spiciness, productID } = req.body;
        let product = new Product({ name, price, description, spiciness, productID });
        await product.save();
        res.redirect('/admin/manageProducts');
    } catch (error) {
        res.status(500).send('Error adding product');
    }
};

// Update an Existing Product
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, spiciness, productID } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        product.name = name;
        product.price = price;
        product.description = description;
        product.spiciness = spiciness;
        product.productID = productID;

        await product.save();
        res.redirect('/admin/manageProducts');
    } catch (error) {
        res.status(500).send('Error updating product');
    }
};

// Delete a Product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin/manageProducts');
    } catch (error) {
        res.status(500).send('Error deleting product');
    }
};

module.exports = {
    viewProduct,
    addProduct,
    updateProduct,
    deleteProduct
};
