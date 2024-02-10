const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    userHandler: String,
    bio: String,
    link: String,
    profilePic: String,
    createdAt: String,
    updatedAt: String,
})

const user = mongoose.model('user', userSchema);

module.exports = user;