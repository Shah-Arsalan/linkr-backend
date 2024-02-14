const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    email:String,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    usernandler: String,
    bio: String,
    link: String,
    profilePic: String,
    createdAt: String,
    updatedAt: String,
    following:[String]
})

const user = mongoose.model('user', userSchema);

module.exports = user;