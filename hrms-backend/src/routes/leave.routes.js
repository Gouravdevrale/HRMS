import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import roleMiddleware from "../middleware/role.middleware.js";

import {
  applyLeave,
  approveLeave,
  assignLeaveBalance,
  createLeaveType,
  getLeaveBalances,
  getLeaveTypes,
  myLeaves,
  // recentLeaves,
  rejectLeave,

} from "../controllers/leave.controller.js";

const router = express.Router();

router.post(
  "/types",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  createLeaveType,
);

router.get("/types", authMiddleware, getLeaveTypes);

router.get(
  "/balances",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  getLeaveBalances,
);

router.post(
  "/balance",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  assignLeaveBalance,
);

router.post("/apply", authMiddleware, applyLeave);
router.put(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  approveLeave,
);

router.put(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  rejectLeave,
);

router.get("/history/:employeeId", authMiddleware, myLeaves);
// router.get("/recent-leaves", authMiddleware, recentLeaves);

export default router;
