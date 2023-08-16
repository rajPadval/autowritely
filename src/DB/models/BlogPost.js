const mongoose = require("mongoose");

const BlogPostSchema = mongoose.Schema({
  title: String,
  desc: String,
});

mongoose.models = {};
const BlogPost = mongoose.model("blog", BlogPostSchema);
module.exports = BlogPost;
