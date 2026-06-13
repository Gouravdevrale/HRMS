import Department from "../models/department.model.js";

export const createDepartment = async (
  req,
  res
) => {
  try {
    const { name, code, description } =
      req.body;

    const department =
      await Department.create({
        tenantId: req.user.tenantId,
        name,
        code,
        description,
      });

    res.status(201).json({
      success: true,
      department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDepartments = async (
  req,
  res
) => {
  try {
    const departments =
      await Department.find({
        tenantId: req.user.tenantId,
        isActive: true,
      });

    res.status(200).json({
      success: true,
      count: departments.length,
      departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDepartmentById = async (
  req,
  res
) => {
  try {
    const department =
      await Department.findOne({
        // _id: req.params.id,
        _id: departmentId,
        tenantId: req.user.tenantId,
        isActive: true,
      });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department Not Found",
      });
    }

    res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateDepartment = async (
  req,
  res
) => {
  try {
    const department =
      await Department.findOneAndUpdate(
        {
          _id: req.params.id,
          tenantId: req.user.tenantId,
        },
        req.body,
        {
          new: true,
        }
      );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department Not Found",
      });
    }

    res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDepartment = async (
  req,
  res
) => {
  try {
    const department =
      await Department.findOneAndUpdate(
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

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department Deactivated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};