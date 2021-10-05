const express = require('express')
const router = express.Router()
const {
  signup,
  signin,
  authDriver,
  getAllDriver,
  deleteDriver,
} = require('../controllers/driverController')

router.post('/register', signup)
router.post('/login', signin)
router.post('auth', authDriver)
router.get('/getAll', getAllDriver)
router.post('/delete', deleteDriver)
module.exports = router
