const vendorModel = require("../models/vendorModel");
const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../config/keys");
const passwordHash = require('password-hash');

exports.signup = (req, res) => {

    vendorModel.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.json(error);
            if (user) {
                vendorModel.findOneAndUpdate(
                    { email: req.body.email },
                    { $set: { isLogedin: true } },
                    { new: true }
                ).exec((error, data) => {
                    if (error) return res.json(error);
                    if (data) return res.json(data);
                });
            }
            if (!user) {
                const { name, email, password, phone, shopName, location } = req.body;
                const hashedPassword = passwordHash.generate(password);
                const _user = new vendorModel({
                    name, email, password: hashedPassword, phone, shopName, location
                });

                _user.save((error, user) => {
                    if (error) return res.json({
                        message: error
                    });
                    if (user) {
                        const token = jwt.sign({
                            data: user._id
                        }, jwtSecret, { expiresIn: '1d' });
                        return res.json({ user, token })
                    }
                });
            }

        });
}

exports.signin = (req, res) => {

    vendorModel.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.json({ message: error.message });
            if (!user) return res.json({
                message: "invalid Email",
            });
            if (user) {
                let isMatch = passwordHash.verify(req.body.password, user.password); // true
                if (isMatch) {
                    let token = jwt.sign({
                        data: user._id
                    }, jwtSecret, { expiresIn: '1d' });
                    return res.json({
                        token,
                        user
                    });
                }
                if (!isMatch) {
                    return res.json({
                        message: "Invalid Password"
                    });
                }
            }
        });
}

exports.authVendor = (req, res) => {
    const token = req.body.headers.token;
    if (!token) {
        return res.json({ msg: "You Need To Login" });
    }
    // verify token
    if (token) {
        const decode = jwt.verify(token, jwtSecret);
        req.user = decode.data;
        vendorModel.findById({ _id: req.user })
            .exec((error, user) => {
                if (error) return res.json(error.message.TokenExpiredError);
                if (user) return res.json({ user });
            });
    }
}

exports.getAllVendors = (req, res) => {
    vendorModel.find().sort({ createedAt: -1 })
        .exec((error, data) => {
            if (error) throw error;
            if (data) return res.json(data);
        })
}