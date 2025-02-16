import express from "express";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
} from "../controllers/orderController";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticateUser, placeOrder);
router.get("/", authenticateUser, getUserOrders);
router.get("/all", authenticateUser, authorizeAdmin, getAllOrders); // Admin Only

export default router;
