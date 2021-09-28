const express = require("express");
const cors = require("cors");
const server = express();
const dbConnect = require("./db/init");

const postRouter = require("./controllers/postController");

dbConnect();

server.set("view engine", "ejs");
server.use(express.static(__dirname + "/public"));

server.use(cors());
server.use(express.json());

server.use("/post", postRouter);

server.get("/", (req, res) => {
  res.render("index");
});

module.exports = server;
