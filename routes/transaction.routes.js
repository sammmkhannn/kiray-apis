import { createTransaction, getAllTransactions, approveTransaction, cancelTransaction } from "../controllers/transaction.controllers";
import express from "express";

const router = express.Router();


router.post("/create", createTransaction);
router.get("/all", getAllTransactions);
router.put("/approve/:transactionId", approveTransaction);
router.put("/cancel/:transactionId", cancelTransaction);

export default router;