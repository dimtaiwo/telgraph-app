const Post = require("../models/post");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

// register view engine

// CREATE A NEW POST
router.post("/", async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    name: Joi.string(),
    story: Joi.string().min(2).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const post = await Post.create({
      title: req.body.title,
      name: req.body.name,
      story: req.body.story,
    });
    // id assigned to post at the .save() method
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

//GET ALL POSTS REQUEST
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) return res.status(404).send("No posts found");
    res.status(201).json(posts);
  } catch (error) {
    res.send("cant find posts", error);
  }
});

module.exports = router;

// FIND POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("No post with id found");
    res.render("post", {
      title: post.title,
      name: post.name,
      story: post.story,
    });
  } catch (error) {
    res.status(404).json({ error });
  }
});
