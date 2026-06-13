import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
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

    month: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    grossSalary: Number,

    deductions: Number,

    netSalary: Number,

    status: {
      type: String,
      enum: ["generated", "paid"],
      default: "generated",
    },
  },
  {
    timestamps: true,
  },
);

payrollSchema.index(
  {
    tenantId: 1,
    employeeId: 1,
    month: 1,
    year: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Payroll", payrollSchema);
