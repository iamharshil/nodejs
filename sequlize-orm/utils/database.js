import Sequelize from "sequelize";

const database = new Sequelize("sequelize_orm", "root", "", {
	dialect: "mysql",
	host: "localhost",
});


export default database;
