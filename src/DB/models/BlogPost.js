const mongoose = require("mongoose");

const BlogPostSchema = mongoose.Schema({
  title: String,
  desc: String,
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

mongoose.models = {};
const BlogPost = mongoose.model("blog", BlogPostSchema);
module.exports = BlogPost;
