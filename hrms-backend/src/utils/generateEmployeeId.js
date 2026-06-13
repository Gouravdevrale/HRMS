import Employee from "../models/employee.model.js";

const generateEmployeeId = async (
  tenantId
) => {

  const count =
    await Employee.countDocuments({
      tenantId,
    });

  return `EMP${String(
    count + 1
  ).padStart(4, "0")}`;
};

export default generateEmployeeId;