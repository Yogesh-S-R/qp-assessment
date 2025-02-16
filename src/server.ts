import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database";
import { syncDatabase } from "./models";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import groceryRoutes from "./routes/groceryRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/groceries", groceryRoutes);

app.get("/", (req, res) => {
  res.send("Grocery Booking API is running...");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!");
    syncDatabase();
  })
  .catch((err) => console.error("Database connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
