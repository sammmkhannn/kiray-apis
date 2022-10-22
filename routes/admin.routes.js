import {
  register,
  login,
  getRegisteredUsers,
  getTotalUsersCount,
  postsApproval,
  approve,
  cancelApprovalRequest,
  customerSupportRequests,
  logout,
  modifyPlan,
  getAllSubscriptions,
} from "../controllers/admin.controllers.js";
import express from "express";
const router = express.Router();

// router.post("/register", register);
router.post("/login", login);
router.get("/registered-users", getRegisteredUsers);
router.get("/total-users", getTotalUsersCount);
router.get("/posts-for-approval", postsApproval);
router.put("/approve/:postId", approve);
router.put("/cancel-approval-request/:postId", cancelApprovalRequest);
router.get("/customer-support", customerSupportRequests);
router.delete("/logout/:userId", logout);
router.put("/update-plan/:planId", modifyPlan);
router.get("/subscriptions", getAllSubscriptions);

export default router;
