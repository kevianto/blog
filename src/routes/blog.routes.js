import express from "express";
import {addBlog,getBlogs,updateBlog,removeBlog,} from "../controllers/blog.controller.js";
import {authenticateUser, authorizeBlogOwner,} from "../middlewares/blog.middleware.js";

const router = express.Router();

router.post("/add", authenticateUser, addBlog);
router.get("/", authenticateUser, getBlogs);
router.put("/:id", authenticateUser, authorizeBlogOwner, updateBlog);
router.delete("/:id", authenticateUser, authorizeBlogOwner, removeBlog);

export default router;
