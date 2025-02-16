import express from "express";
import {
  createGrocery,
  getAllGroceries,
  getGroceryById,
  updateGrocery,
  deleteGrocery,
} from "../controllers/groceryController";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticateUser, authorizeAdmin, createGrocery); // Only admin
router.get("/", authenticateUser, getAllGroceries);
router.get("/:id", authenticateUser, getGroceryById);
router.put("/:id", authenticateUser, authorizeAdmin, updateGrocery); // Only admin
router.delete("/:id", authenticateUser, authorizeAdmin, deleteGrocery); // Only admin

export default router;
