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
                const { name, email, password, phone, shopName, latitude, longitude } = req.body;
                const { path } = req.file;
                const hashedPassword = passwordHash.generate(password);
                const _user = new vendorModel({
                    name, email, password: hashedPassword, phone, shopName, location: { latitude, longitude }, image: path
                });

                _user.save((error, user) => {
                    if (error) return res.json({
                        message: error
                    });
                    if (user) {
                        const token = jwt.sign({
                            data: user._id
                        }, jwtSecret, { expiresIn: '1d' });
                        return res.status(200).json(user)
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

exports.deleteVendor = (req, res) => {
    vendorModel.findOneAndDelete({ _id: req.body.id })
        .exec((error, user) => {
            if (error) return res.json(error);
            if (user) return res.json({ msg: "Successfully Deleted!" });
        })
}

exports.addImage = async (req, res) => {
    const { path } = req.file;
    const { vendorID } = req.body;
    const _profile = await vendorModel.findOneAndUpdate(
        { _id: vendorID },
        { $set: { image: path } },
        { new: true }
    );
    return res.status(200).json(_profile);
}