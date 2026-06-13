import Employee from "../models/employee.model.js";
import Department from "../models/department.model.js";
import Attendance from "../models/attendance.model.js";
import LeaveRequest from "../models/leaveRequest.model.js";
import Payroll from "../models/payroll.model.js";
import asyncHandler from "../utils/asyncHandler.js";
// import Employee from "../models/employee.model.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const tenantId = req.user.tenantId;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const totalEmployees = await Employee.countDocuments({
    tenantId,
    isActive: true,
  });

  const totalDepartments = await Department.countDocuments({
    tenantId,
    isActive: true,
  });

  const presentToday = await Attendance.countDocuments({
    tenantId,
    date: today,
  });

  const employeesOnLeave = await LeaveRequest.countDocuments({
    tenantId,
    status: "approved",
    startDate: {
      $lte: today,
    },
    endDate: {
      $gte: today,
    },
  });

  const payrolls = await Payroll.find({
    tenantId,
    createdAt: {
      $gte: firstDay,
      $lte: lastDay,
    },
  });

  const monthlyPayrollCost = payrolls.reduce(
    (sum, item) => sum + item.netSalary,
    0,
  );

  //chart
  const departmentStats = await Employee.aggregate([
    {
      $match: {
        tenantId,
        isActive: true,
      },
    },
    {
      $group: {
        _id: "$departmentId",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "_id",
        foreignField: "_id",
        as: "department",
      },
    },
    {
      $unwind: "$department",
    },
    {
      $project: {
        _id: 0,
        name: "$department.name",
        count: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalEmployees,
      totalDepartments,
      presentToday,
      employeesOnLeave,
      monthlyPayrollCost,
    },
    departmentStats,
  });
});

export const recentEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({
    tenantId: req.user.tenantId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(5);

  res.status(200).json({
    success: true,
    employees,
  });
});

export const recentLeaves = asyncHandler(async (req, res) => {
  const leaves = await LeaveRequest.find({
    tenantId: req.user.tenantId,
  })
    .populate("employeeId", "firstName lastName employeeId")
    .populate("leaveTypeId", "name")
    .sort({
      createdAt: -1,
    })
    .limit(5);

  res.status(200).json({
    success: true,
    leaves,
  });
});
