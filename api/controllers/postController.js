const Post = require("../models/post");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      name: req.body.name,
      story: req.body.story,
    });
    post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    res.send("cant find posts", error);
  }
});

module.exports = router;
