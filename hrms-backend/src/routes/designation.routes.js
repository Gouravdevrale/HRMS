import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import roleMiddleware from "../middleware/role.middleware.js";

// import {
//   createDesignation,
//   getDesignations,
// } from "../controllers/designation.controller.js";

import {
  createDesignation,
  getDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
} from "../controllers/designation.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  createDesignation,
);

router.get("/", authMiddleware, getDesignations);

router.get("/:id", authMiddleware, getDesignationById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  updateDesignation,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteDesignation,
);
export default router;
