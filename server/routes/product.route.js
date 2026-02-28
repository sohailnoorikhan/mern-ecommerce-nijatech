// product.route.js
import express from "express";

// Middlewares
import { protect, isAdmin } from "../middlewares/auth.middleware.js";

// Controller
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getCategoryCounts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/category-counts", getCategoryCounts);

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);

router.get("/", getProducts);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

export default router;
