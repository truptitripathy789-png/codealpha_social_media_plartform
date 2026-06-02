const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    username:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    bio:{
        type:String,
        default:"Hello, I'm using SocialHub!"
    },

    profilePic:{
        type:String,
        default:"https://i.pravatar.cc/150"
    },

    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},
{
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);