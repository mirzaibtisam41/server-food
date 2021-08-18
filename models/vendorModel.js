const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    shopName: { type: String, required: true },
    phone: { type: Number, required: true },
    location: { type: String },
    orders: { type: Array },
    image: { type: String, default: null },
    notifications: { type: String },
}, { timestamps: true });
module.exports = mongoose.model("vendorSchema", vendorSchema);