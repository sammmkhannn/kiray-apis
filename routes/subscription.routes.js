import {
  subscriptionHistory,
  createSubscription,
  updateSubscription,
  userSubscriptions
} from "../controllers/subscription.controllers.js";
import express from "express";
const router = express.Router();

router.post("/create", createSubscription);
router.post("/update", updateSubscription);
router.post("/subscriptions", userSubscriptions);
router.get("/history", subscriptionHistory);

export default router;
