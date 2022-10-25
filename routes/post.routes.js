import {
  createPost,
  getAllPosts,
  getUserPosts,
  editPost,
  deletePost,
  upload,
} from "../controllers/post.controllers.js";
import express from "express";
const router = express.Router();

router.post("/create/:userId", upload.any(), createPost);
router.get("/all", getAllPosts);
router.get("/all-user-posts/:userId", getUserPosts);
router.put("/post/edit/:postId", editPost);
router.delete("/post/delete/:postId", deletePost);
export default router;
