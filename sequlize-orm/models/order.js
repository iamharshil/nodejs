import Sequelize from "sequelize";
import database from "../utils/database.js";

const Order = database.define("order", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	total: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

export default Order;
