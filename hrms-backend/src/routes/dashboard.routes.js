import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  getDashboardStats,
  recentEmployees,
  recentLeaves,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", authMiddleware, getDashboardStats);

router.get("/recent-employees", authMiddleware, recentEmployees);
router.get(
  "/recent-leaves",
  authMiddleware,
  recentLeaves
);

export default router;
