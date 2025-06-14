require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const port = 5000;

app.use(express.json());
app.use(categoryRoutes);
app.use(productRoutes);

connectDB();
app.listen(port, () => console.log(`server started at port : ${port}`));
