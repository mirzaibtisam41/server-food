const express = require('express');
const router = express.Router();
const { signup, signin, authVendor, getAllVendors, deleteVendor } = require('../controllers/vendorController');

router.post("/register", signup);
router.post("/login", signin);
router.post("auth", authVendor);
router.get("/getAll", getAllVendors);
router.get('/delete', deleteVendor);

module.exports = router;