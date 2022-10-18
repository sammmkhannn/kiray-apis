import { subscribe, subscriptionHistory } from "../controllers/subscription.controllers.js";
import express from "express";
const router = express.Router();


router.post('/subscribe/:userId/:planId', subscribe);
router.get('/history/:userId', subscriptionHistory);

export default router;