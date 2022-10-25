import {
  register,
  login,
  logout,
  blockUnblockUser,
} from "../controllers/user.controllers.js";
import express from "express";
const router = express.Router();
import { upload } from "../controllers/post.controllers.js";

router.post("/register", upload.single("profile"), register);
router.post("/login", login);
router.put("/logout/:userId", logout);
router.put("/block-unblock/:userId", blockUnblockUser);
export default router;
