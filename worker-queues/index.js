import express from "express";

const app = express();
const PORT = 4000;

// config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => res.send("Welcome to API"));

app.listen(PORT, () => console.log("Server running on http://localhost:4000"));
