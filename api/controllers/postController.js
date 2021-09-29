const Post = require("../models/post");
const express = require("express");
const router = express.Router();

// register view engine


// CREATE A NEW POST
router.post("/", async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      name: req.body.name,
      story: req.body.story,
    });
    // id assigned to post at the .save() method
    post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

//GET ALL POSTS REQUEST
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    res.send("cant find posts", error);
  }
});

module.exports = router;

// FIND POST BY ID 
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render('post', { title: post.title, name: post.name, story: post.story });
  } catch {
    res.status(404).json({ err });
  }
})
