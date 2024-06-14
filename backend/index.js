const express = require("express");
const cors = require("cors");
const DB = require("./config/db.js");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to api");
});

DB();

app.listen(process.env.PORT, () => console.log("Server Started"));
