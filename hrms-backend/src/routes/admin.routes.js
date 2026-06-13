import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { dashboard } from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  dashboard
);

export default router;