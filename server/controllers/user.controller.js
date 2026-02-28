// Models
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role === "admin") {
        return res.status(400).json({ message: "Admini silmək olmaz" });
      }
      await User.deleteOne({ _id: user._id });
      res.json({ message: "İstifadəçi uğurla silindi" });
    } else {
      res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.role = user.role === "admin" ? "user" : "admin";
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
