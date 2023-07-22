const mongoose = require("mongoose");

const BlogPostSchema = mongoose.Schema({

  title: {
    type: String,
    required: [true, "Title should not be empty"],
    min: [6, "Title should be more than 6 letters"],
  },
  desc: {
    type: String,
    required: [true, "Description should not be empty"],
    min: [10, "Description should be more than 10 letters"],
  },

});

mongoose.models = {};
const BlogPost = mongoose.model("blog", BlogPostSchema);
module.exports = BlogPost;
