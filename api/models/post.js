const mongoose = require("mongoose");
const today = new Date();
const postSchema = new mongoose.Schema({
  title: String,
  name: String,
  story: String,
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
