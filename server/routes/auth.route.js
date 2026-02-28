// Packages
import path from "path";
import multer from "multer";
import express from "express";

// Controllers
import {
  loginUser,
  registerUser,
  updateAvatar,
  resetPassword,
  getUserProfile,
  forgotPassword,
  deleteUserAccount,
  updateUserProfile,
} from "../controllers/auth.controller.js";

// Middlewares
import { protect } from "../middlewares/auth.middleware.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", protect, getUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.delete("/profile", protect, deleteUserAccount);
router.put("/profile", protect, upload.single("avatar"), updateUserProfile);
router.put("/profile/avatar", protect, upload.single("image"), updateAvatar);

export default router;
