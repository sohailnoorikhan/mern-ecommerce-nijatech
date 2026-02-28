// Packages
import express from "express";

// Controller
import { getCategoryCounts } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/category-counts", getCategoryCounts);

export default router;
