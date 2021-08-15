const express = require('express');
const router = express.Router();
const { signup, signin, authVendor, getAllVendors } = require('../controllers/vendorController');

router.post("/register", signup);
router.post("/login", signin);
router.post("auth", authVendor);
router.get("/getAll", getAllVendors);

module.exports = router;