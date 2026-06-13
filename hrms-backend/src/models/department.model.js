import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
    },

    description: {
      type: String,
      default: "",
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

// Unique department code per tenant
departmentSchema.index(
  {
    tenantId: 1,
    code: 1,
  },
  {
    unique: true,
  }
);

const Department = mongoose.model(
  "Department",
  departmentSchema
);

export default Department;