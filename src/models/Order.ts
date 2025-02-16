import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Grocery from "./Grocery";

class Order extends Model {
  public id!: number;
  public userId!: number;
  public groceryId!: number;
  public quantity!: number;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    groceryId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "orders" }
);

// Associations
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Grocery.hasMany(Order, { foreignKey: "groceryId" });
Order.belongsTo(Grocery, { foreignKey: "groceryId" });

export default Order;
