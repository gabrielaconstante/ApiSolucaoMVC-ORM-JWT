import { Sequelize } from "sequelize";
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Pedido = db.define('produto', {
    num_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  cod_produto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qtde_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
    timestamps: false,
    freezeTableName: true
});

export default Pedido