import {
  subscribe,
  subscriptionHistory,
} from "../controllers/plan.controllers.js";
import express from "express";
const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/history", subscriptionHistory);

export default router;
