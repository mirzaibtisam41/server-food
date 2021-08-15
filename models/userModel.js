const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isLogedin: { type: String, required: true, default: false },
    phone: { type: Number, required: true },
    image: { type: String },
    location: { type: Object }
}, { timestamps: true });
module.exports = mongoose.model("userSchema", userSchema);