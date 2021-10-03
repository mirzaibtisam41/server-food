const orderModel = require("../models/OrderModel");
const driverModel = require("../models/driverModel");

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

exports.forwardOrderToDriver = async (req, res) => {
    const { driverID, orderID } = req.body;
    let _order = await orderModel.findOne({ _id: orderID })
        .populate('product', ['productPic', 'name', 'detail', 'category', 'price', 'discount'])
        .populate('user', ['name', 'phone', 'image'])
        .populate('owner', ['name', 'shopName', 'phone', 'image']);
    if (_order) {
        driverModel.findOneAndUpdate(
            { _id: driverID },
            { $push: { orders: { order: _order._id } } },
            { new: true }
        ).exec((error, data) => {
            if (error) throw error;
            if (data) return res.json({ msg: 'Order Forward' });
        });
    }
}

exports.getOrdersByDriver = (req, res) => {
    const { driverID } = req.body;
    driverModel.findOne({ _id: driverID })
        .populate('orders.order', ['owner', 'product', 'user', 'location'])
        // .populate('orders.order.owner', ['name', 'location'])
        .exec((error, data) => {
            if (error) return error.message;
            if (data) return res.json(data);
        })
}

exports.changeOrderStatus = async (req, res) => {
    const { driverID, orderID, status } = req.body;
    const { orders } = await driverModel.findById({ _id: driverID });
    const _index = orders.findIndex((obj => obj._id == orderID));
    orders[_index].orderStatus = status;
    driverModel.findOneAndUpdate(
        { _id: driverID },
        { $set: { orders: orders } },
        { new: true }
    ).exec((error, data) => {
        if (error) throw error;
        if (data) return res.json({ msg: "Order status change..." });
    });
}