require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 5000;

app.use(express.json());
app.use(categoryRoutes);
app.use(productRoutes);
app.use(userRoutes);

connectDB();
app.listen(port, () => console.log(`server started at port : ${port}`));
