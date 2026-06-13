import Employee from "../models/employee.model.js";
import Department from "../models/department.model.js";
import Designation from "../models/designation.model.js";
import Location from "../models/location.model.js";

import asyncHandler from "../utils/asyncHandler.js";

import generateEmployeeId from "../utils/generateEmployeeId.js";

export const createEmployee = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    departmentId,
    designationId,
    locationId,
    managerId,
    joiningDate,
    employmentType,
  } = req.body;

  if (managerId) {
    const manager = await Employee.findOne({
      _id: managerId,
      tenantId: req.user.tenantId,
      isActive: true,
    });

    if (!manager) {
      return res.status(404).json({
        success: false,
        message: "Manager Not Found",
      });
    }
  }

  const employeeId = await generateEmployeeId(req.user.tenantId);

  const employee = await Employee.create({
    tenantId: req.user.tenantId,

    employeeId,

    firstName,
    lastName,
    email,
    phone,

    departmentId,
    designationId,
    locationId,

    managerId,

    joiningDate,
    employmentType,
  });

  res.status(201).json({
    success: true,
    employee,
  });
});

// export const getEmployees = asyncHandler(async (req, res) => {
//   const employees = await Employee.find({
//     tenantId: req.user.tenantId,
//     isActive: true,
//   })
//     .populate("departmentId", "name code")
//     .populate("designationId", "name code")
//     .populate("locationId", "name code");

//   res.status(200).json({
//     success: true,
//     count: employees.length,
//     employees,
//   });
// });

export const getEmployees = asyncHandler(async (req, res) => {
  const { search, department, designation, location } = req.query;

  const query = {
    tenantId: req.user.tenantId,
    isActive: true,
  };

  if (department) {
    query.departmentId = department;
  }

  if (designation) {
    query.designationId = designation;
  }

  if (location) {
    query.locationId = location;
  }

  if (search) {
    query.$or = [
      {
        firstName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        employeeId: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const employees = await Employee.find(query)
    .populate("departmentId", "name code")
    .populate("designationId", "name code")
    .populate("locationId", "name code")
    .populate("managerId", "firstName lastName employeeId");

  res.status(200).json({
    success: true,
    count: employees.length,
    employees,
  });
});
export const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({
    _id: req.params.id,
    tenantId: req.user.tenantId,
    isActive: true,
  })
    .populate("departmentId")
    .populate("designationId")
    .populate("locationId");

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee Not Found",
    });
  }

  res.status(200).json({
    success: true,
    employee,
  });
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findOneAndUpdate(
    {
      _id: req.params.id,
      tenantId: req.user.tenantId,
      isActive: true,
    },
    req.body,
    {
      new: true,
    },
  );

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee Not Found",
    });
  }

  res.status(200).json({
    success: true,
    employee,
  });
});

export const deactivateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findOneAndUpdate(
    {
      _id: req.params.id,
      tenantId: req.user.tenantId,
    },
    {
      isActive: false,
      status: "inactive",
    },
    {
      new: true,
    },
  );

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee Not Found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Employee Deactivated",
  });
});


export const getMyTeam = asyncHandler(async (req, res) => {
  const team = await Employee.find({
    managerId: req.params.id,
    tenantId: req.user.tenantId,
    isActive: true,
  });

  res.status(200).json({
    success: true,
    count: team.length,
    team,
  });
});
