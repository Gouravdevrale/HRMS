import mongoose from "mongoose";

const designationSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
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

designationSchema.index(
  {
    tenantId: 1,
    code: 1,
  },
  {
    unique: true,
  }
);

const Designation = mongoose.model(
  "Designation",
  designationSchema
);

export default Designation;