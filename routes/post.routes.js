import {
  createPost,
  getAllPosts,
  getUserPosts,
  upload,
} from "../controllers/post.controllers.js";
import express from "express";
const router = express.Router();

router.post("/create/:userId", upload.any(), createPost);
router.get("/all", getAllPosts);
router.get("/all-user-posts", getUserPosts);

export default router;
