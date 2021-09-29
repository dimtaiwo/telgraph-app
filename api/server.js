const express = require("express");
const cors = require("cors");
const server = express();
const dbConnect = require("./db/init");

const postRouter = require("./controllers/postController");

// register view engine
server.set("view engine", "ejs");

dbConnect();
server.use(cors());
server.use(express.json());

server.use("/post", postRouter);

server.use(express.static("public"));

server.get("/", (req, res) => {
  res.send("Hello Velin");
});

server.use("/post", (req, res) => {
  res.status(300).render("404");
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
