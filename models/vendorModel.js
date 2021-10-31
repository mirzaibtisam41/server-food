const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    shopName: { type: String, required: true },
    phone: { type: Number, required: true },
    location: { type: Object },
    orders: { type: Array },
    image: { type: String},
    notifications: { type: Object },
}, { timestamps: true });
module.exports = mongoose.model("vendorSchema", vendorSchema);