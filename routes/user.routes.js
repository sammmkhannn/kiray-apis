import { createUser } from "../controllers/user.controllers.js";
import express from "express";
const router = express.Router();
import { upload } from "../controllers/post.controllers.js";

router.post("/register", upload.single("profile"), createUser);

export default router;
