import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { attendanceSummary, getMonthlyAttendance, getTodayAttendance, punchIn, punchOut } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/punch-in", authMiddleware, punchIn);

router.post("/punch-out", authMiddleware, punchOut);

router.get("/today", authMiddleware, getTodayAttendance);

router.get("/monthly/:employeeId", authMiddleware, getMonthlyAttendance);

router.get("/summary/:employeeId", authMiddleware, attendanceSummary);

export default router;
