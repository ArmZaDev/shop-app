const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
    productId: Schema.Types.ObjectId,
    productName: String,
    quantity: Number,
    totalAmount: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('order', orderSchema);