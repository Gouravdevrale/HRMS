import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from "../controllers/location.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  createLocation
);

router.get(
  "/",
  authMiddleware,
  getLocations
);

router.get(
  "/:id",
  authMiddleware,
  getLocationById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  updateLocation
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteLocation
);

export default router;