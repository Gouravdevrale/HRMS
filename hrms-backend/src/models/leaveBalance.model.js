import mongoose from "mongoose";

const leaveBalanceSchema =
  new mongoose.Schema(
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

      leaveTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LeaveType",
         required: true,
      },

      balance: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    {
      timestamps: true,
    }
  );

  // Prevent duplicate balance records
leaveBalanceSchema.index(
  {
    tenantId: 1,
    employeeId: 1,
    leaveTypeId: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "LeaveBalance",
  leaveBalanceSchema
);