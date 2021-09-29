const express = require("express");
const cors = require("cors");
const server = express();
const mongoose = require("mongoose");
const postRouter = require("./controllers/postController");
require("dotenv").config();

// register view engine
server.set('view engine', 'ejs');

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error("cannot connect to db", err);
  });

server.use(cors());
server.use(express.json());

server.use("/post", postRouter);

server.use(express.static('public'));

server.get("/", (req, res) => {
  res.send('Hello Velin')
});

// No page reload on post
server.get('#post/:id', async (req, res) => {
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


module.exports = server;
