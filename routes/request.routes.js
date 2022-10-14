import { createRequest } from "../controllers/request.controllers.js";
import express from "express";
const router = express.Router();

router.post("/create", createRequest);

export default router;
