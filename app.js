const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const dotenv=require("dotenv");
const cors=require("cors");
const mongoose=require("mongoose"); 
const fileUpload = require("express-fileupload");

const Order = require("./models/orderModels");
dotenv.config({path:"backend/config/config.env"});
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//route import
const product =require("./routes/productRoute")
const user =require("./routes/userRoute");
const order=require("./routes/orderRoute");
const payment=require("./routes/paymentRoute")
const recommendation=require("./routes/recommendationRoute")
app.use("/api/v1",product);
app.use("/api/v1",user)
app.use("/api/v1",order);
app.use("/api/v1",payment);
app.use("/api",recommendation);
//middleware for errors
app.use(errorMiddleware);
// API endpoint for recommendations
// app.get('/api/recommend/:userId', async (req, res) => {
//     const userId = req.params.userId;
//     // Fetch user-item data from MongoDB or another data source
//     const userItemData = await Order.find({user:userId }); // Implement this function
//     console.log(userItemData);

//     const similarityMatrix = collaborativeFiltering.generateSimilarityMatrix(userItemData);

//     const recommendations = collaborativeFiltering.recommendItems(userId, userItemData, similarityMatrix);  
//     res.json({ recommendations });
    
//   });
module.exports = app;