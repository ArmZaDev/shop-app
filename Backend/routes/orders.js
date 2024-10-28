var express = require('express');
var router = express.Router();
const memberSchema = require('../models/member');
const productSchema = require('../models/product');
const orderSchema = require('../models/order');
const { auth } = require('../middleware/auth');

// Get all order
router.get('/orders', auth, async function(req, res, next) {
    try {
        const orders = await orderSchema.find({});

        if (!orders.length) {
            return res.status(200).json([]);
        }

        res.status(200).json(orders);
        // res.status(200).json(`order ทั้งหมด: ${orders.length}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



// Get all orders for a specific product
router.get('/products/:id/orders', auth, async function(req, res, next) {
    const { id } = req.params;

    try {
        // Check product
        const product = await productSchema.findById(id);
        console.log(product.id)
        if (!product) {
            return res.status(404).send('Product not found.');
        }

        const orders = await orderSchema.find({ productId: id });

        if (orders.length === 0) {
            return res.status(200).json([]);
        }
        
        res.status(200).json(orders);
        // res.status(200).json(`Order ทั้งหมดของ Product: ${orders.length}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add order for a specific product
router.post('/products/:id/orders', auth, async function(req, res, next) {
    const { quantity } = req.body
    const productId = req.params.id;

    try {
        const product = await productSchema.findById(productId);

        if (!product) {
            return res.status(404).send(`Product not found: ${productId}`);
        }

        // Check stock availability
        if (quantity > product.stock) {
            return res.status(400).send(`Insufficient stock for product: ${productId}`);
        }

        const totalAmount = product.price * quantity;

        // Create the order
        const newOrder = await orderSchema.create({
            productId: product._id,
            productName: product.name,
            quantity,
            totalAmount
        });

        // ลด stock
        await productSchema.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });

        res.status(201).send(newOrder);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



module.exports = router;