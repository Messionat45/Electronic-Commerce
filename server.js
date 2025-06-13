require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const ecomRoutes = require("./routes/ecomRoutes");

const app = express();
const port = 5000;

app.use(express.json());
app.use(ecomRoutes);

connectDB();
app.listen(port, () => console.log(`server started at port : ${port}`));
