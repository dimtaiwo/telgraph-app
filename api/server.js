const express = require("express");
const cors = require("cors");
const server = express();
const mongoose = require("mongoose");
const postRouter = require("./controllers/postController");
require("dotenv").config();

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

server.get("/", (req, res) => {
  res.send("Hello Vellin");
});

module.exports = server;
