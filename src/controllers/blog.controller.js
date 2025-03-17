import Blog from "../models/Blog.js";

export const addBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const newBlog = new Blog({
      title,
      description,
      author: req.user.id,
    });

    await newBlog.save();
    return res.status(201).json({ success: true, blog: newBlog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in adding blog" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name -_id") .sort({ createdAt: -1 }); ;
     
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Can't retrieve blogs" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized to update this blog" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, blog: updatedBlog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Can't update blog" });
  }
};

export const removeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Can't delete blog" });
  }
};
