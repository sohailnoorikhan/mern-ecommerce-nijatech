// Models
import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  const { orderItems, totalPrice, shippingAddress, phone } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "Səbətiniz boşdur" });
  }
  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
      address: shippingAddress,
      phone,
      status: "processing",
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sifariş yaradılarkən xəta: " + error.message });
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (order.isDelivered) {
        return res
          .status(400)
          .json({ message: "Çatdırılmış sifarişi ləğv etmək olmaz." });
      }

      await order.deleteOne();
      res.json({ message: "Sifariş uğurla ləğv edildi və silindi" });
    } else {
      res.status(404).json({ message: "Sifariş tapılmadı" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server xətası" });
  }
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "id name email phone")
    .sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = req.body.status || order.status;

    if (req.body.status === "delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Sifariş tapılmadı" });
  }
};

export const getOrderStats = async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalSales = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  res.json({
    totalOrders,
    totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
  });
};
