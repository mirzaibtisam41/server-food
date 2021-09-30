const express = require('express');
const router = express.Router();
const multer = require('multer');
const { signup, signin, authUser, getAllUsers, addLocation, addImage, deleteUser } = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/profile");
    },
    filename: function (req, file, cb) {
        cb(null, file.fileName);
    }
});
const upload = multer({ storage: storage });

router.post("/register", signup);
router.post("/add/location", addLocation);
router.post("/add/image", upload.single("image"), addImage);
router.post("/login", signin);
router.post("auth", authUser);
router.get("/getAll", getAllUsers);
router.post("/delete", deleteUser);

module.exports = router;