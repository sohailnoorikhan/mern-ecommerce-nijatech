// Packages
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      default: null,
    },
    discountPercentage: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      required: true,
      default: [],
    },
    rating: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ram: {
      type: String,
      default: null,
    },
    processor: {
      type: String,
      default: null,
    },
    screen: {
      type: String,
      default: null,
    },
    memory: {
      type: String,
      default: null,
    },
    vram: {
      type: String,
      default: null,
    },
    weight: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
