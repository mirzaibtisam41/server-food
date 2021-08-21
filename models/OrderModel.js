const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'vendorSchema' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'userSchema' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'productSchema' },
    location: { type: Object },
}, { timestamps: true });
module.exports = mongoose.model("orderSchema", orderSchema);