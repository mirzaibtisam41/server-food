const express = require('express');
const router = express.Router();
const multer = require("multer");
const { createProduct, getAllProducts, deleteProduct, updateProductDetail } = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/products");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post("/create", upload.array('productPics'), createProduct);
router.post("/delete", deleteProduct);
router.post("/update", updateProductDetail);
router.get("/getAllProducts", getAllProducts);

module.exports = router;