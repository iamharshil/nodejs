import Sequelize from "sequelize";
import database from "../utils/database.js";

const Customer = database.define("customer", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allownull: false,
	},
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	email: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});

export default Customer;
