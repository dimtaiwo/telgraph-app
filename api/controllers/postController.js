const Post = require("../models/post");
const express = require("express");
const router = express.Router();
var dayjs = require('dayjs');
const server = require("../server");

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

// FIND POST BY ID 
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    try {
      console.log(post.Date);
      let dateStr = dayjs(post.Date, 'YYYY-MM-DD');
      res.render('post', { title: post.title, name: post.name, story: post.story, date: dateStr });
    } catch (error) {
      console.log(error);
    }

  } catch {
    res.status(404).json({ err });
  }
})

// Get EDITED BY POST ID
router.get('/:id/edit', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    try {
      console.log(post.Date);
      let dateStr = dayjs(post.Date, 'YYYY-MM-DD');
      res.render('index', { title: post.title, name: post.name, story: post.story, date: dateStr });
    } catch (error) {
      console.log(error);
    }

  } catch {
    res.status(404).json({ error });
  }
})

// UPDATE POST EDITS with a PUT request
router.put('/:id/edit', async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = {
      title: req.body.title,
      name: req.body.name,
      story: req.body.story
    }
    const post = await Post.findOneAndUpdate(filter, update, {
      new: true
    });

    res.render('post', { title: post.title, name: post.name, story: post.story });
  } catch (error) {
    console.log(error);
  }

})

module.exports = router;
