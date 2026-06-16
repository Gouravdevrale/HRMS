import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
    },

    employeeId: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    

    phone: {
      type: String,
      required: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    designationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
    },

    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    employmentType: {
      type: String,
      enum: [
        "full-time",
        "part-time",
        "intern",
        "contract"
      ],
      default: "full-time",
    },

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
        "terminated"
      ],
      default: "active",
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

employeeSchema.index(
  {
    tenantId: 1,
    employeeId: 1,
  },
  {
    unique: true,
  }
);
employeeSchema.index(
  {
    tenantId: 1,
    email: 1,
  },
  {
    unique: true,
  }
);

const Employee = mongoose.model(
  "Employee",
  employeeSchema
);

export default Employee;