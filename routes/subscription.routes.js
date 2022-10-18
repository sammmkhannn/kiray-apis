import {
  subscribe,
  subscriptionHistory,
} from "../controllers/subscription.controllers.js";
import express from "express";
const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/history", subscriptionHistory);

export default router;
