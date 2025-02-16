import { Request, Response } from "express";
import Grocery from "../models/Grocery";

// Create Grocery
export const createGrocery = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, stock } = req.body;
    const grocery = await Grocery.create({ name, price, stock });
    res.status(201).json(grocery);
  } catch (error) {
    res.status(500).json({ error: "Failed to create grocery item" });
  }
};

// Get All Groceries
export const getAllGroceries = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const groceries = await Grocery.findAll();
    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch groceries" });
  }
};

// Get Grocery by ID
export const getGroceryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const grocery = await Grocery.findByPk(req.params.id);
    if (!grocery) {
      res.status(404).json({ error: "Grocery not found" });
      return;
    }
    res.status(200).json(grocery);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch grocery item" });
  }
};

// Update Grocery
export const updateGrocery = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const grocery = await Grocery.findByPk(req.params.id);
    if (!grocery) {
      res.status(404).json({ error: "Grocery not found" });
      return;
    }

    await grocery.update(req.body);
    res.status(200).json(grocery);
  } catch (error) {
    res.status(500).json({ error: "Failed to update grocery item" });
  }
};

// Delete Grocery
export const deleteGrocery = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const grocery = await Grocery.findByPk(req.params.id);
    if (!grocery) {
      res.status(404).json({ error: "Grocery not found" });
      return;
    }

    await grocery.destroy();
    res.status(200).json({ message: "Grocery deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete grocery item" });
  }
};
