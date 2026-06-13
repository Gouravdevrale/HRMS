import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  createSalaryStructure,
  generatePayroll,
  getPayrollById,
  getPayrolls,
  markPayrollPaid,
  payrollHistory,
} from "../controllers/payroll.controller.js";

const router = express.Router();

router.post(
  "/salary-structure",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  createSalaryStructure,
);

router.post(
  "/generate",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  generatePayroll,
);

router.put(
  "/pay/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  markPayrollPaid,
);

router.get("/history/:employeeId", authMiddleware, payrollHistory);

router.get("/:id", authMiddleware, getPayrollById);

router.get("/", authMiddleware, getPayrolls);

export default router;
