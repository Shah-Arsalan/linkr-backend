const express = require('express');
const router = express.Router();
const post = require('../models/post.model');
const app = express();
app.use(express.urlencoded({ extended: true }));

router.route("/")
.post(async(req, res) => {
    try{
        const {content , likes , username , bookmark , comments } = req.body;
        const newPost = new post({content , likes , username , bookmark , comments});
        await newPost.save()
        .then(()=> console.log("new post" , newPost))
        .catch((error) => console.log('the error is ' , error))
        const allPosts = await post.find();
        res.status(201).json({posts : allPosts})
    }catch(error){
        res.status(500).json({ success: false, message: error.message })

    }
})
.get(async(req,res) => {
    try{

        const allPosts = await post.find();
        res.status(201).json({posts:allPosts})

    }catch(error){
        res.status(500).json({success:false , message : error.message})
    }
})


module.exports = router;