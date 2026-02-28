// Packages
import mongoose from "mongoose";

// Models
import Product from "../models/product.model.js";

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID formatı yanlışdır" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server xətası: " + error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      category,
      brand,
      images,
      rating,
      discountedPrice,
      ...rest
    } = req.body;

    const product = new Product({
      title,
      price,
      description,
      category,
      brand,
      images: Array.isArray(images) ? images : [],
      rating: rating || 0,
      discountedPrice,
      ...rest,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Server xətası: " + error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID formatı yanlışdır" });
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Məhsul tapılmadı" });
    res.json({ message: "Məhsul uğurla silindi", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID formatı yanlışdır" });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Məhsul tapılmadı" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCategoryCounts = async (req, res) => {
  try {
    const counts = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const formatted = {};
    counts.forEach((item) => {
      const key = item._id || "Digər";
      formatted[key] = item.count;
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
