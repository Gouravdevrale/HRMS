import mongoose from "mongoose";

const salaryStructureSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
    },

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    basicSalary: {
      type: Number,
      required: true,
    },

    hra: {
      type: Number,
      default: 0,
    },

    bonus: {
      type: Number,
      default: 0,
    },

    deductions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

salaryStructureSchema.index(
  {
    tenantId: 1,
    employeeId: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("SalaryStructure", salaryStructureSchema);
