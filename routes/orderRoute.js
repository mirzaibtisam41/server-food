const express = require('express');
const router = express.Router();
const { create, getOrdersByUser, getOrdersByVendor, getAllOrders, forwardOrderToDriver, changeOrderStatus } = require('../controllers/orderController');

router.post("/create", create);
router.post('/userOrders', getOrdersByUser);
router.post('/vendorOrders', getOrdersByVendor);
router.get('/getAll', getAllOrders);
router.post('/forwardOrder', forwardOrderToDriver);
router.post('/changeOrderStatus', changeOrderStatus);

module.exports = router;