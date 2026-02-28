// Models
import Product from "../models/product.model.js";

export const getCategoryCounts = async (req, res) => {
  try {
    const counts = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
