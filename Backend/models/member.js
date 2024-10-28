const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    password: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    roleAdmin: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('member', memberSchema);