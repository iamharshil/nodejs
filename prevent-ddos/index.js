const express = require("express");
const limitter = require("express-rate-limit");

const app = express();

// app.use(limitter({
//    windowMs: 5000,
//    max: 5,
//    message: {
//        code: 429,
//        message: "Too many request"
//    }
//}));

app.get("/", (req, res) => {
    res.send("Hello from a rate limitted app.");
});
app.get("/api", (req,res) => res.send("Only certain number requests allowed per s/m/h/d"));


app.get("/open", (req,res) => res.send("This is an open endpoint"));


const registerLimitter = limitter({
    windowMs: 5 * 60 * 1000,
    max: 2,
})

app.get("/register", (req,res) => {

    return res.send("Register page");
})
app.post("/register", registerLimitter, (req, res) => res.send("Ok"));


const loginLimitter = limitter({
    windowMs: 1 * 60 * 1000,
    max: 5,
})

app.get("/login",(req,res) => res.send("Login page"));
app.post("/login", loginLimitter, (req,res) => res.send("Ok"));

app.listen(3000, () => console.log("Server on port 3000"))
