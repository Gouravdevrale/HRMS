import mongoose from "mongoose";

const leaveRequestSchema =
  new mongoose.Schema(
    {
      tenantId: {
        type: String,
        required: true,
      },

      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },

      leaveTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LeaveType",
      },

      startDate: Date,

      endDate: Date,

      reason: String,

      status: {
        type: String,
        enum: [
          "pending",
          "approved",
          "rejected",
        ],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "LeaveRequest",
  leaveRequestSchema
);