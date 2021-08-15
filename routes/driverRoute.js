const express = require('express');
const router = express.Router();
const { signup, signin, authDriver, getAllDriver } = require('../controllers/driverController');

router.post("/register", signup);
router.post("/login", signin);
router.post("auth", authDriver);
router.get("/getAll", getAllDriver);

module.exports = router;