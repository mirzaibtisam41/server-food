const express = require('express');
const router = express.Router();
const multer = require('multer');
const { signup, signin, authVendor, getAllVendors, deleteVendor, addImage } = require('../controllers/vendorController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/vendor");
    },
    filename: function (req, file, cb) {
        cb(null, file.fileName);
    }
});
const upload = multer({ storage: storage });

router.post("/register", signup);
router.post("/login", signin);
router.post("auth", authVendor);
router.get("/getAll", getAllVendors);
router.post('/delete', deleteVendor);
router.post('/addProfile', upload.single("image"), addImage);

module.exports = router;