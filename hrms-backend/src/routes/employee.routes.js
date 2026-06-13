import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import roleMiddleware from "../middleware/role.middleware.js";

import { createEmployee, deactivateEmployee, getEmployeeById, getEmployees, getMyTeam, updateEmployee } from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("admin", "hr"), createEmployee);

router.get("/", authMiddleware, getEmployees);

router.get("/:id", authMiddleware, getEmployeeById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  updateEmployee,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deactivateEmployee,
);

router.get(
  "/:id/team",
  authMiddleware,
  getMyTeam
);

export default router;
