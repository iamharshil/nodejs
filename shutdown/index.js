const express = require("express");
const { faker } = require("@faker-js/faker");
const User = require("./user.model");
const { default: mongoose } = require("mongoose");
const responseTime = require("response-time");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(responseTime());

function longRunningTask() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("");
		}, 5000);
	});
}

app.get("/", async (req, res) => {
	console.time();
	console.log("Request received");
	await longRunningTask();
	res.json({ message: "Hello World" });
	console.timeEnd();
});

app.get("/users", async (req, res) => {
	const users = await user.find();
	res.json(users);
});

app.post("/users", async (req, res) => {
	const user = await user.create({
		name: faker.person.fullName(),
		email: faker.internet.email(),
		age: faker.string.numeric(2),
	});
	res.json(user);
});

app.post("/add-many-users", async (req, res) => {
	console.log("Request started...");
	console.time();
	const promises = [];
	Array.from({ length: 20000 }).forEach(() => {
		const user = new User({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			age: faker.string.numeric(2),
		});
		promises.push(user.save());
	});
	const result = await Promise.all(promises);
	res.json({ count: result.length });
	console.timeEnd();
	console.log("Request completed");
});

app.delete("/users", async (req, res) => {
	const result = await User.deleteMany();
	res.json(result);
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(process.pid);
	console.log(`Server listening on port ${PORT} on process id ${process.pid}`);
});

mongoose.connect(process.env.MONGODB_URI, {
	dbName: "shutdown-node",
});

mongoose.connection.on("connected", () => {
	console.log("Mongoose connected");
});

mongoose.connection.on("error", (err) => {
	console.log("Mongoose connection error " + err);
});

mongoose.connection.on("disconnected", () => {
	console.log("Mongoose disconnected");
});

process.on("SIGINT", () => {
	// when process is terminated by the user like ctrl + c
	server.close(async () => {
		console.log("Server closed");
		mongoose.connection
			.close()
			.then(() => {
				console.log("Mongoose connection disconnected");
				process.exit(0);
			})
			.catch((error) => {
				console.error("Error while closing the mongoose connection", error);
			});
	});
	console.log("SIGINT received");
});

process.on("SIGTERM", () => {
	// when process is terminated by the system like kill port or kill process
	server.close(async () => {
		console.log("Server closed");
		mongoose.connection
			.close()
			.then(() => {
				console.log("Mongoose connection disconnected");
				process.exit(0);
			})
			.catch((error) => {
				console.error("Error while closing the mongoose connection", error);
			});
	});
	console.log("SIGTERM received");
	process.exit(0);
});
