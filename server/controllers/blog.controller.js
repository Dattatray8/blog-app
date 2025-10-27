import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, description, draft, creatorId } = req.body;
    if (!title || !description || !creatorId) {
      return res.status(400).json({
        message:
          "Title or Description is missing! or You are not Authenticated",
      });
    }
    const creator = await User.findById(creatorId);
    if (!creator) {
      return res
        .status(404)
        .json({ success: false, message: "Author not found" });
    }
    let blog = await Blog.create({
      title,
      description,
      draft,
      creator: creator._id,
    });
    creator.blogs.push(blog._id);
    await creator.save();
    return res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Creating Blog",
      error: error.message,
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: false });
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Fetching Blogs",
      error: error.message,
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    return res
      .status(200)
      .json({ success: true, message: "Blog Fetched Successfully", blog });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error to Get Blog",
      error: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {};

export const deleteBlog = async (req, res) => {};
