import { Request, Response } from "express";
import Order from "../models/Order";
import Grocery from "../models/Grocery";
import { AuthRequest } from "../middleware/authMiddleware";

// Place an Order
export const placeOrder = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { groceryId, quantity } = req.body;
    const grocery = await Grocery.findByPk(groceryId);

    if (!grocery || grocery.stock < quantity) {
      res.status(400).json({ error: "Insufficient stock" });
      return;
    }

    // Deduct stock
    grocery.stock -= quantity;
    await grocery.save();

    const order = await Order.create({
      userId: req.user?.id,
      groceryId,
      quantity,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Order failed" });
  }
};

// Get Orders for Logged-in User
export const getUserOrders = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user?.id } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Admin: Get All Orders
export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
