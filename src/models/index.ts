import sequelize from "../config/database";
import User from "./User";
import Grocery from "./Grocery";

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use `{ force: true }` to reset DB
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

export { User, Grocery, syncDatabase };
