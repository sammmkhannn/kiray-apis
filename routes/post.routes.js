import {
  createPost,
  getAllPosts,
  getUserPosts,
} from "../controllers/post.controllers.js";
import express from "express";
import { upload } from "../controllers/post.controllers.js";
const router = express.Router();

router.post("/create/:userId", upload.any(), createPost);
router.get("/all", getAllPosts);
router.get("/all-user-posts", getUserPosts);

export default router;
