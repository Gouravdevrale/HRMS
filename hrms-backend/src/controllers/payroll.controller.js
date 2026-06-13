import SalaryStructure from "../models/salaryStructure.model.js";
import Payroll from "../models/payroll.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createSalaryStructure = asyncHandler(async (req, res) => {
  const { employeeId, basicSalary, hra, bonus, deductions } = req.body;

  const structure = await SalaryStructure.create({
    tenantId: req.user.tenantId,
    employeeId,
    basicSalary,
    hra,
    bonus,
    deductions,
  });

  res.status(201).json({
    success: true,
    structure,
  });
});

export const generatePayroll = asyncHandler(async (req, res) => {
  const { employeeId, month, year } = req.body;

  const existingPayroll = await Payroll.findOne({
    tenantId: req.user.tenantId,
    employeeId,
    month,
    year,
  });

  if (existingPayroll) {
    return res.status(400).json({
      success: false,
      message: "Payroll Already Generated",
    });
  }
  const structure = await SalaryStructure.findOne({
    employeeId,
  });

  if (!structure) {
    return res.status(404).json({
      success: false,
      message: "Salary Structure Not Found",
    });
  }

  const grossSalary = structure.basicSalary + structure.hra + structure.bonus;

  const netSalary = grossSalary - structure.deductions;

  const payroll = await Payroll.create({
    tenantId: req.user.tenantId,
    employeeId,
    month,
    year,
    grossSalary,
    deductions: structure.deductions,
    netSalary,
  });

  res.status(201).json({
    success: true,
    payroll,
  });
});

export const markPayrollPaid = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);

  if (!payroll) {
    return res.status(404).json({
      success: false,
      message: "Payroll Not Found",
    });
  }

  payroll.status = "paid";

  await payroll.save();

  res.status(200).json({
    success: true,
    payroll,
  });
});

export const payrollHistory = asyncHandler(async (req, res) => {
  const payrolls = await Payroll.find({
    employeeId: req.params.employeeId,
  });

  res.status(200).json({
    success: true,
    count: payrolls.length,
    payrolls,
  });
});

export const getPayrollById = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id).populate(
    "employeeId",
    "employeeId firstName lastName",
  );

  if (!payroll) {
    return res.status(404).json({
      success: false,
      message: "Payroll Not Found",
    });
  }

  res.status(200).json({
    success: true,
    payroll,
  });
});

export const getPayrolls = asyncHandler(async (req, res) => {
  const payrolls = await Payroll.find({
    tenantId: req.user.tenantId,
  }).populate("employeeId", "employeeId firstName lastName");

  res.status(200).json({
    success: true,
    count: payrolls.length,
    payrolls,
  });
});
