import mongoose from "mongoose";

const leaveTypeSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    yearlyQuota: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "LeaveType",
  leaveTypeSchema
);