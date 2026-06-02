const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getUserProfile,
    followUser
} = require("../controllers/userController");

router.get("/profile/:id", getUserProfile);

router.put("/follow/:id", protect, followUser);

module.exports = router;