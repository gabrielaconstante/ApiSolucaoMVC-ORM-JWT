import { Sequelize } from "sequelize";
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Produto = db.define('produto', {
  cod_produto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nome_produto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qtde_produto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  timestamps: false,
  freezeTableName: true
});

export default Produto