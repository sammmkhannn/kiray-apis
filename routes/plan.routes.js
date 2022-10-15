import { subscribe, subscriptionHistory } from "../controllers/plan.controllers.js";
import express from "express";
const router = express.Router();


router.post('/subscribe/:userId', subscribe);
router.get('/history/:userId', subscriptionHistory);

export default router;