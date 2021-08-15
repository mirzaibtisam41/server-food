const productModel = require("../models/productModel");

exports.createProduct = (req, res) => {
    const { owner, name, price, reviews, detail, category } = req.body;

    const _product = new productModel({
        owner, name, price, detail, category, productPic: req.file.path
    });

    _product.save((error, data) => {
        if (error) throw error;
        if (data) {
            productModel.find().sort({ createdAt: -1 })
                .exec((error, products) => {
                    if (error) throw error;
                    if (products) return res.json(products);
                });
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

exports.deleteProduct = (req, res) => {
    productModel.findOneAndDelete({ _id: req.body.productID })
        .exec((error, data) => {
            if (error) throw error;
            if (data) {
                productModel.find().sort({ createdAt: -1 })
                    .exec((error, products) => {
                        if (error) throw error;
                        if (products) return res.json(products);
                    });
            }
        })
}

exports.updateProductDetail = (req, res) => {
    const { _id, productData } = req.body;
    const { name, quantity, price, description, category, offer, parent, active, brand } = productData;
    const productObject = {};
    if (name !== null) { productObject.name = name; productObject.slug = name };
    if (quantity !== null) { productObject.quantity = quantity };
    if (price !== null) { productObject.price = price };
    if (description !== null) { productObject.description = description };
    if (category !== null) { productObject.category = category };
    if (offer !== null) { productObject.offer = offer };
    if (parent !== null) { productObject.parent = parent };
    if (active !== null) { productObject.active = active };
    if (brand !== null) { productObject.brand = brand };

    productModel.findOneAndUpdate(
        { _id: _id },
        { $set: productObject },
        { new: true }
    ).exec((error, data) => {
        if (error) throw error;
        if (data) {
            productModel.find().sort({ createdAt: -1 })
                .exec((error, products) => {
                    if (error) throw error;
                    if (products) return res.json(products);
                });
        };
    });
}