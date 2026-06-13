import Designation from "../models/designation.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createDesignation =
  asyncHandler(async (req, res) => {
//  console.log(req.body);
    const {
      departmentId,
      name,
      code,
      description,
    } = req.body;

    const designation =
      await Designation.create({
        tenantId: req.user.tenantId,
        departmentId,
        name,
        code,
        description,
      });

    res.status(201).json({
      success: true,
      designation,
    });
});

export const getDesignations =
  asyncHandler(async (req, res) => {

    const designations =
      await Designation.find({
        tenantId: req.user.tenantId,
        isActive: true,
      }).populate(
        "departmentId",
        "name code"
      );

    res.status(200).json({
      success: true,
      count: designations.length,
      designations,
    });
});

export const getDesignationById =
  asyncHandler(async (req, res) => {

    const designation =
      await Designation.findOne({
        _id: req.params.id,
        tenantId: req.user.tenantId,
        isActive: true,
      }).populate(
        "departmentId",
        "name code"
      );

    if (!designation) {
      return res.status(404).json({
        success: false,
        message: "Designation Not Found",
      });
    }

    res.status(200).json({
      success: true,
      designation,
    });
});

export const updateDesignation =
  asyncHandler(async (req, res) => {

    const designation =
      await Designation.findOneAndUpdate(
        {
          _id: req.params.id,
          tenantId: req.user.tenantId,
          isActive: true,
        },
        req.body,
        {
          new: true,
        }
      );

    if (!designation) {
      return res.status(404).json({
        success: false,
        message: "Designation Not Found",
      });
    }

    res.status(200).json({
      success: true,
      designation,
    });
});

export const deleteDesignation =
  asyncHandler(async (req, res) => {

    const designation =
      await Designation.findOneAndUpdate(
        {
          _id: req.params.id,
          tenantId: req.user.tenantId,
        },
        {
          isActive: false,
        },
        {
          new: true,
        }
      );

    if (!designation) {
      return res.status(404).json({
        success: false,
        message: "Designation Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Designation Deactivated",
    });
});

