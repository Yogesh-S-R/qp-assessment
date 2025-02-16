import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Grocery extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;
}

Grocery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "groceries",
  }
);

export default Grocery;
