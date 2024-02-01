import express from "express";
import responseTime from "response-time";

const app = express();

app.use(responseTime());

app.get("/", (req, res) => {
    res.send("Hello World!");
    }
);

app.listen(3030, () => {
    console.log("Server is listening on port 3000");
    }
);
