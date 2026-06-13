import Attendance from "../models/attendance.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const punchIn = asyncHandler(async (req, res) => {
  const { employeeId } = req.body;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const existingAttendance = await Attendance.findOne({
    tenantId: req.user.tenantId,
    employeeId,
    date: today,
  });

  if (existingAttendance) {
    return res.status(400).json({
      success: false,
      message: "Already Punched In",
    });
  }

  const attendance = await Attendance.create({
    tenantId: req.user.tenantId,

    employeeId,

    date: today,

    punchIn: new Date(),
  });

  res.status(201).json({
    success: true,
    attendance,
  });
});

export const punchOut = asyncHandler(async (req, res) => {
  const { employeeId } = req.body;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    tenantId: req.user.tenantId,

    employeeId,

    date: today,
  });

  if (!attendance) {
    return res.status(404).json({
      success: false,
      message: "Punch In Required",
    });
  }

  if (attendance.punchOut) {
    return res.status(400).json({
      success: false,
      message: "Already Punched Out",
    });
  }

  attendance.punchOut = new Date();

  const hours = (attendance.punchOut - attendance.punchIn) / (1000 * 60 * 60);

  attendance.workingHours = hours.toFixed(2);

  await attendance.save();

  res.status(200).json({
    success: true,
    attendance,
  });
});

export const getTodayAttendance = asyncHandler(async (req, res) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const attendance = await Attendance.find({
    tenantId: req.user.tenantId,
    date: today,
  }).populate("employeeId", "employeeId firstName lastName");

  res.status(200).json({
    success: true,
    count: attendance.length,
    attendance,
  });
});

export const getMonthlyAttendance = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  const endDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
  );

  const attendance = await Attendance.find({
    tenantId: req.user.tenantId,
    employeeId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  res.status(200).json({
    success: true,
    count: attendance.length,
    attendance,
  });
});

export const attendanceSummary = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const records = await Attendance.find({
    tenantId: req.user.tenantId,
    employeeId,
  });

  const totalDays = records.length;

  const totalHours = records.reduce(
    (sum, item) => sum + Number(item.workingHours),
    0,
  );

  res.status(200).json({
    success: true,
    totalDays,
    totalHours,
  });
});
