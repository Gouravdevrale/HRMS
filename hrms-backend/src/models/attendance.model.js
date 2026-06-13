import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
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

    date: {
      type: Date,
      required: true,
    },

    punchIn: {
      type: Date,
    },

    punchOut: {
      type: Date,
    },

    workingHours: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "present",
        "absent",
        "half-day"
      ],
      default: "present",
    },
  },
  {
    timestamps: true,
  }
);

attendanceSchema.index(
  {
    tenantId: 1,
    employeeId: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

const Attendance = mongoose.model(
  "Attendance",
  attendanceSchema
);

export default Attendance;