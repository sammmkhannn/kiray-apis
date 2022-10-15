import { createUser } from "../controllers/user.controllers.js";
import express from "express";
const router = express.Router();
import upload from "../models/Post.model";

router.post("/create", upload.single("profile"), createUser);

export default router;
