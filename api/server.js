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

module.exports = server;
