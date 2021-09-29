const Post = require("../models/post");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { title, story, name } = req.body;
  try {
    const post = await Post.create({
      title,
      name,
      story,
    });
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts.length === 0) return res.status(404).send("No post found");
    res.status(201).json(posts);
  } catch (error) {
    res.send("cant find posts", error);
  }
});

module.exports = router;
