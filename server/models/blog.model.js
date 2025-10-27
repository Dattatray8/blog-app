import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    draft: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Blog = new mongoose.model("Blog", blogSchema);
export default Blog;
