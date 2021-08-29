const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    owner: { type: mongoose.Types.ObjectId, ref: "vendorSchema", required: true },
    productPic: { type: String, required: true },
    name: { type: String, required: true },
    detail: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    active: { type: Boolean, default: true },
    reviews: [
        {
            user: { type: mongoose.Types.ObjectId, ref: "userSchema", required: true },
            rating: { type: Number, required: true },
            description: { type: String, required: true }
        }
    ]
}, { timestamps: true });
module.exports = mongoose.model("productSchema", productSchema);