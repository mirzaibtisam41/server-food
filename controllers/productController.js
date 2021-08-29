const productModel = require("../models/productModel");

exports.createProduct = (req, res) => {
    const { owner, name, price, detail, category, discount } = req.body;

    const _product = new productModel({
        owner, name, price, detail, category, productPic: req.file.path, discount
    });

    _product.save((error, data) => {
        if (error) throw error;
        if (data) {
            return res.json(data);
        }
    });
}

exports.getAllProducts = (req, res) => {
    productModel.find().sort({ createdAt: -1 })
        .exec((error, products) => {
            if (error) throw error;
            if (products) return res.json(products);
        });
}

exports.getOwnerProducts = (req, res) => {
    productModel.find({ owner: req.body.owner }).sort({ createdAt: -1 })
        .exec((error, products) => {
            if (error) throw error;
            if (products) return res.json(products);
        });
}

exports.deleteProduct = (req, res) => {
    productModel.findOneAndDelete({ _id: req.body.productID })
        .exec((error, data) => {
            if (error) throw error;
            if (data) {
                return res.json(data);
            }
        })
}

exports.updateProductDetail = (req, res) => {
    const { productID, name, price, detail, category, discount, active } = req.body;
    const productObject = {};
    if (name) { productObject.name = name };
    if (detail) { productObject.detail = detail };
    if (price) { productObject.price = price };
    if (category) { productObject.category = category };
    if (discount) { productObject.discount = discount };
    if (active) { productObject.active = active };

    productModel.findOneAndUpdate(
        { _id: productID },
        { $set: productObject },
        { new: true }
    ).exec((error, data) => {
        if (error) throw error;
        if (data) {
            return res.json(data);
        };
    });
}