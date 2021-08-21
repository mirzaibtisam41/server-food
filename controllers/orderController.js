const orderModel = require("../models/OrderModel");

exports.create = (req, res) => {
    const { owner, user, product, location } = req.body;
    const _order = new orderModel({ owner, user, product, location });
    _order.save((error, data) => {
        if (error) return error.message;
        if (data) return res.json(data);
    });
}

exports.getOrdersByUser = (req, res) => {
    const { user } = req.body;
    orderModel.find({ user: user })
        .populate('product', ['productPic', 'name', 'detail', 'category', 'price', 'discount'])
        .exec((error, data) => {
            if (error) return error.message;
            if (data) return res.json(data);
        })
}

exports.getOrdersByVendor = (req, res) => {
    const { owner } = req.body;
    orderModel.find({ owner: owner })
        .populate('product', ['productPic', 'name', 'detail', 'category', 'price', 'discount'])
        .populate('user', ['name', 'phone', 'image', 'email'])
        .exec((error, data) => {
            if (error) return error.message;
            if (data) return res.json(data);
        })
}

exports.getAllOrders = (req, res) => {
    orderModel.find()
        .populate('product', ['productPic', 'name', 'detail', 'category', 'price', 'discount'])
        .populate('user', ['name', 'phone', 'image'])
        .populate('owner', ['name', 'shopName', 'phone', 'image'])
        .exec((error, data) => {
            if (error) return error.message;
            if (data) return res.json(data);
        })
}