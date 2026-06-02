const User = require("../models/User");

// Get User Profile
const getUserProfile = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Follow User
const followUser = async (req, res) => {
    try {

        const currentUser =
            await User.findById(req.user.id);

        const targetUser =
            await User.findById(req.params.id);

        if (!targetUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (
            !currentUser.following.includes(
                targetUser._id
            )
        ) {

            currentUser.following.push(
                targetUser._id
            );

            targetUser.followers.push(
                currentUser._id
            );

            await currentUser.save();
            await targetUser.save();

        }

        res.json({
            message: "User followed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getUserProfile,
    followUser
};