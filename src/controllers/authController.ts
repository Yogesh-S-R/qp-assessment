import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

// Generate Access Token
const generateAccessToken = (user: { id: number; role: string }) => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "15m",
  });
};

// Generate Refresh Token
const generateRefreshToken = async (user: User) => {
  const refreshToken = uuidv4();
  user.refreshToken = refreshToken;
  await user.save();
  return refreshToken;
};

// User Signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Signup failed" });
  }
};

// User Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Refresh Access Token
export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(403).json({ error: "Refresh token required" });
    return;
  }

  const user = await User.findOne({ where: { refreshToken } });
  if (!user) {
    res.status(403).json({ error: "Invalid refresh token" });
    return;
  }

  const newAccessToken = generateAccessToken(user);
  res.status(200).json({ accessToken: newAccessToken });
};

// Logout User
export const logout = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  await User.update({ refreshToken: null }, { where: { refreshToken } });
  res.status(200).json({ message: "Logged out successfully" });
};
