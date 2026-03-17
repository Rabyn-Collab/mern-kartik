import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  const id = req.userId;
  const role = req.userRole;
  try {
    if (role !== "admin") {
      const orders = await Order.find({});
      return res.status(200).json(orders);

    } else {
      const orders = await Order.find({ userId: id });
      return res.status(200).json(orders);
    }

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

}


export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    return res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

}

export const createOrder = async (req, res) => {
  const { totalAmount, products, address } = req.body;
  try {
    await Order.create({ userId: req.userId, totalAmount, products, address });
    return res.status(201).json({
      message: "Order created",
    });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

}