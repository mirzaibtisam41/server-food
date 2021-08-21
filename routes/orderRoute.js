const express = require('express');
const router = express.Router();
const { create, getOrdersByUser, getOrdersByVendor, getAllOrders } = require('../controllers/orderController');

router.post("/create", create);
router.post('/userOrders', getOrdersByUser);
router.post('/vendorOrders', getOrdersByVendor);
router.get('/getAll', getAllOrders);

module.exports = router;