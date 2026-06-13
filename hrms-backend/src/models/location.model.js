import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
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

    address: {
      type: String,
      required: true,
    },

    city: String,

    state: String,

    country: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

locationSchema.index(
  {
    tenantId: 1,
    code: 1,
  },
  {
    unique: true,
  }
);

const Location = mongoose.model(
  "Location",
  locationSchema
);

export default Location;