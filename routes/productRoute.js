const express = require('express');
const router = express.Router();
const multer = require("multer");
const { createProduct, getAllProducts, deleteProduct, updateProductDetail, getOwnerProducts, addProductReview } = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/products");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Math.random().toFixed(5) + "." + file.mimetype.split('image/')[1]);
    }
});
const upload = multer({ storage: storage });

router.post("/create", upload.single('productPic'), createProduct);
router.post("/delete", deleteProduct);
router.post("/update", updateProductDetail);
router.get("/getAllProducts", getAllProducts);
router.post("/getByOwner", getOwnerProducts);
router.post('/review', addProductReview);

module.exports = router;