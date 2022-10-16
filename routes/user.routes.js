import { register,login,logout } from "../controllers/user.controllers.js";
import express from "express";
const router = express.Router();
import { upload } from "../controllers/post.controllers.js";

router.post("/register", upload.single("profile"), register);
router.post('/login', login);
router.put('/logout/:userId',logout);
export default router;
