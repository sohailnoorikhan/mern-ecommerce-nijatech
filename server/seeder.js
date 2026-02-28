// Packages
import dotenv from "dotenv";
import mongoose from "mongoose";

// Models
import Product from "./models/product.model.js";

// Seed data
import { products } from "./products.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products added");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();

