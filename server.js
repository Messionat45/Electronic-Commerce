require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const port = 5000;

connectDB();
app.listen(port, () => console.log(`server started at port : ${port}`));
