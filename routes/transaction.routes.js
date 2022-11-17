import { createTransaction, getAllTransactions, approveTransaction, cancelTransaction,adminIncome } from "../controllers/transaction.controllers.js";
import express from "express";
import { upload } from "../controllers/post.controllers.js";
const router = express.Router();


router.post("/create/:userId", upload.single('image'), createTransaction);
router.get("/all", getAllTransactions);
router.put("/approve/:transactionId", approveTransaction);
router.put("/cancel/:transactionId", cancelTransaction);
router.get("/admin-income",adminIncome)
export default router;