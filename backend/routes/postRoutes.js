const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createPost,
    getPosts,
    likePost
} = require("../controllers/postController");

router.post("/", protect, createPost);

router.get("/", getPosts);

router.put("/like/:id", protect, likePost);

module.exports = router;