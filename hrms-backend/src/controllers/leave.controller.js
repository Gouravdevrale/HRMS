import LeaveType from "../models/leaveType.model.js";
import LeaveBalance from "../models/leaveBalance.model.js";
import LeaveRequest from "../models/leaveRequest.model.js";
import asyncHandler from "../utils/asyncHandler.js";

// Helper Function
const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diff = end.getTime() - start.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
};

// Create Leave Type
export const createLeaveType = asyncHandler(async (req, res) => {
  const { name, code, yearlyQuota } = req.body;

  const leaveType = await LeaveType.create({
    tenantId: req.user.tenantId,
    name,
    code,
    yearlyQuota,
  });

  res.status(201).json({
    success: true,
    leaveType,
  });
});

//get Leave Types
export const getLeaveTypes = asyncHandler(async (req, res) => {
  const leaveTypes = await LeaveType.find({
    tenantId: req.user.tenantId,
  });

  res.status(200).json({
    success: true,
    leaveTypes,
  });
});

//get leaves

export const getLeaveBalances = asyncHandler(async (req, res) => {
  const balances = await LeaveBalance.find({
    tenantId: req.user.tenantId,
  })
    .populate("employeeId", "firstName lastName employeeId")
    .populate("leaveTypeId", "name code");

  res.status(200).json({
    success: true,
    count: balances.length,
    balances,
  });
});

// Assign Leave Balance
export const assignLeaveBalance = asyncHandler(async (req, res) => {
  const { employeeId, leaveTypeId, balance } = req.body;

  const existingBalance = await LeaveBalance.findOne({
    tenantId: req.user.tenantId,
    employeeId,
    leaveTypeId,
  });

  if (existingBalance) {
    return res.status(400).json({
      success: false,
      message: "Leave Balance Already Exists",
    });
  }

  const leaveBalance = await LeaveBalance.create({
    tenantId: req.user.tenantId,
    employeeId,
    leaveTypeId,
    balance,
  });

  res.status(201).json({
    success: true,
    leaveBalance,
  });
});

// Apply Leave
export const applyLeave = asyncHandler(async (req, res) => {
  const { employeeId, leaveTypeId, startDate, endDate, reason } = req.body;

  const leaveDays = calculateDays(startDate, endDate);

  const leaveBalance = await LeaveBalance.findOne({
    tenantId: req.user.tenantId,
    employeeId,
    leaveTypeId,
  });

  if (!leaveBalance) {
    return res.status(404).json({
      success: false,
      message: "Leave Balance Not Found",
    });
  }

  if (leaveBalance.balance < leaveDays) {
    return res.status(400).json({
      success: false,
      message: "Insufficient Leave Balance",
    });
  }

  const leave = await LeaveRequest.create({
    tenantId: req.user.tenantId,
    employeeId,
    leaveTypeId,
    startDate,
    endDate,
    reason,
  });

  res.status(201).json({
    success: true,
    leave,
  });
});

// Approve Leave
export const approveLeave = asyncHandler(async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);

  if (!leave) {
    return res.status(404).json({
      success: false,
      message: "Leave Not Found",
    });
  }

  if (leave.status === "approved") {
    return res.status(400).json({
      success: false,
      message: "Leave Already Approved",
    });
  }

  if (leave.status === "rejected") {
    return res.status(400).json({
      success: false,
      message: "Rejected Leave Cannot Be Approved",
    });
  }

  //   if (leave.status === "approved") {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Leave Already Approved",
  //     });
  //   }

  const leaveDays = calculateDays(leave.startDate, leave.endDate);

  const balance = await LeaveBalance.findOne({
    tenantId: leave.tenantId,
    employeeId: leave.employeeId,
    leaveTypeId: leave.leaveTypeId,
  });

  if (!balance) {
    return res.status(404).json({
      success: false,
      message: "Leave Balance Not Found",
    });
  }

  // 👇 yaha add karo
  if (balance.balance < leaveDays) {
    return res.status(400).json({
      success: false,
      message: "Insufficient Leave Balance",
    });
  }

  balance.balance -= leaveDays;

  await balance.save();

  leave.status = "approved";

  await leave.save();

  res.status(200).json({
    success: true,
    leave,
  });
});

// Reject Leave
export const rejectLeave = asyncHandler(async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);

  if (!leave) {
    return res.status(404).json({
      success: false,
      message: "Leave Not Found",
    });
  }

  // Already Rejected Check
  if (leave.status === "rejected") {
    return res.status(400).json({
      success: false,
      message: "Leave Already Rejected",
    });
  }

  //  Approved Leave Cannot Be Rejected
  if (leave.status === "approved") {
    return res.status(400).json({
      success: false,
      message: "Approved Leave Cannot Be Rejected",
    });
  }

  leave.status = "rejected";

  await leave.save();

  res.status(200).json({
    success: true,
    leave,
  });
});

// Leave History
export const myLeaves = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const leaves = await LeaveRequest.find({
    tenantId: req.user.tenantId,
    employeeId,
  }).populate("leaveTypeId", "name code");

  res.status(200).json({
    success: true,
    count: leaves.length,
    leaves,
  });
});

