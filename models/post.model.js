const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema({
    content:String,
    likes: {
        likeCount: { type: Number, default: 0 }, 
        likedBy: { type: [String], default: [] }, 
    },
    username:String,
    bookmark:[String],
    comments:[{
        username:String,
        text:String,
    }]
})


   


const post = mongoose.model('post', postSchema);

module.exports = post;