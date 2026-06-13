import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    //   unique: true,
    //   lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["employee", "manager", "hr", "admin"],
      default: "employee",
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

userSchema.index(
  {
    email: 1,
    tenantId: 1,
  },
  {
    unique: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;