import Location from "../models/location.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createLocation =
  asyncHandler(async (req, res) => {

    const {
      name,
      code,
      address,
      city,
      state,
      country,
    } = req.body;

    const location =
      await Location.create({
        tenantId: req.user.tenantId,
        name,
        code,
        address,
        city,
        state,
        country,
      });

    res.status(201).json({
      success: true,
      location,
    });
});

export const getLocations =
  asyncHandler(async (req, res) => {

    const locations =
      await Location.find({
        tenantId: req.user.tenantId,
        isActive: true,
      });

    res.status(200).json({
      success: true,
      count: locations.length,
      locations,
    });
});

export const getLocationById =
  asyncHandler(async (req, res) => {

    const location =
      await Location.findOne({
        _id: req.params.id,
        tenantId: req.user.tenantId,
        isActive: true,
      });

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location Not Found",
      });
    }

    res.status(200).json({
      success: true,
      location,
    });
});

export const updateLocation =
  asyncHandler(async (req, res) => {

    const location =
      await Location.findOneAndUpdate(
        {
          _id: req.params.id,
          tenantId: req.user.tenantId,
          isActive: true,
        },
        req.body,
        {
          new: true,
        }
      );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location Not Found",
      });
    }

    res.status(200).json({
      success: true,
      location,
    });
});

export const deleteLocation =
  asyncHandler(async (req, res) => {

    const location =
      await Location.findOneAndUpdate(
        {
          _id: req.params.id,
          tenantId: req.user.tenantId,
        },
        {
          isActive: false,
        },
        {
          new: true,
        }
      );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Location Deactivated",
    });
});