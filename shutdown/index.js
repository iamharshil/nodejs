const express = require("express");
const { faker } = require("faker");
const user = require("./user.model");
const { default: mongoose } = require("mongoose");
const responseTime = require("response-time");

const app = express();
app.use(responseTime());

function longRunningTask() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("");
        }, 5000);
    })
}


app.get("/", async (req,res) => {
    console.time();
    console.log("Request received");
    res.json({ message: "Hello World" });
    console.timeEnd();
});


app.get("/users", async (req,res) => {
    const users = await user.find();
    res.json(users);
}

app.post("/users", async (req,res) => {
    const user = await user.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        age: faker.random.numeric(2),
    });
    res.json(user);
});

app.get("/add-many-users", async (req,res) => {
    console.log("Request started...");
    console.time();
    let promises = [];
    Array.from({ length: 20000 }).forEach(() => {
        const user = new User({
                name: faker.name.findName(),
                email: faker.internet.email(),
                age: faker.random.numeric(2),
            });
        promises.push(user.save());
    });
    const result = await Promise.all(promises);
    res.json({ count: result.length });
    console.timeEnd();
    console.log("Request completed");
});

app.delete("/users", async (req,res) => {
    const result = await user.deleteMany();
    res.json(result);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(process.pid);
    console.log(`Server listening on port ${PORT}`);
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
