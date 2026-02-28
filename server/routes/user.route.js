// Packages
import express from "express";

// Controllers
import {
  getUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/user.controller.js";

// Middlewares
import { protect, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(protect, isAdmin, getUsers);

router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .put(protect, isAdmin, updateUserRole);

export default router;
