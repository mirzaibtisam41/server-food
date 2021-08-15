const mongoose = require('mongoose');
const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: String, required: true, default: false },
    phone: { type: Number, required: true },
    location: { type: String },
    orders: { type: Array },
    image: { type: String, default: null },
    notifications: { type: String },
}, { timestamps: true });
module.exports = mongoose.model("driverSchema", driverSchema);