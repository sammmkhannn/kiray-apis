import {
  subscriptionHistory,
  createSubscription,
  updateSubscription,
  userSubscriptions
} from "../controllers/subscription.controllers.js";
import express from "express";
const router = express.Router();

router.post("/create/:userId", createSubscription);
router.put("/update/:subscriptionId", updateSubscription);
router.get("/all/:userId", userSubscriptions);
router.get("/history", subscriptionHistory);

export default router;
