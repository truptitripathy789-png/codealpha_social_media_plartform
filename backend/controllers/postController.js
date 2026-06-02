const Post = require("../models/Post");

// Create Post
const createPost = async (req, res) => {
    try {

        const post = await Post.create({
            user: req.user.id,
            content: req.body.content
        });

        res.status(201).json(post);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Posts
const getPosts = async (req, res) => {
    try {

        const posts = await Post.find()
            .populate("user", "username profilePic")
            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Like Post
const likePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const alreadyLiked = post.likes.includes(req.user.id);

        if (alreadyLiked) {

            post.likes = post.likes.filter(
                id => id.toString() !== req.user.id
            );

        } else {

            post.likes.push(req.user.id);

        }

        await post.save();

        res.json(post);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createPost,
    getPosts,
    likePost
};