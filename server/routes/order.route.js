// Packages
import express from "express";

// Controllers
import {
  createOrder,
  getMyOrders,
  deleteOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

// Middlewares
import { protect, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createOrder)
  .get(protect, isAdmin, getAllOrders);

router.get("/myorders", protect, getMyOrders);

router
  .route("/:id")
  .delete(protect, deleteOrder)
  .put(protect, isAdmin, updateOrderStatus);

export default router;
