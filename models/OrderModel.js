const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'vendorSchema' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'userSchema' },
    product: { type: Array, required: true },
    location: { type: Object },
}, { timestamps: true });
module.exports = mongoose.model("orderSchema", orderSchema);