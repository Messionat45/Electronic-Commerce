require("dotenv").config();
const express = require("express");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");


const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());



app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);


app.use((error, req, res, next)=>{
    console.error(error.stack);
    res.status(500).send('somthing went wrong');
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started at port : ${PORT}`));
