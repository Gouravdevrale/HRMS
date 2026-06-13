import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
// import {
//   createDepartment,
//   getDepartments,
// } from "../controllers/department.controller.js";

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  createDepartment,
);

router.get("/", authMiddleware, getDepartments);

router.get("/:id", authMiddleware, getDepartmentById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  updateDepartment,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteDepartment,
);

export default router;
