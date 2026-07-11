const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./config/database");

const userRoutes = require("./routes/userRoutes");

const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

connectDB();

const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// User API Routes

app.use("/api/users", userRoutes);


// Admin API Routes

app.use("/api/admin", adminRoutes);


// Test Route

app.get("/", (req,res)=>{

    res.send(
    "14 TUNES Backend Running Successfully 🎬"
    );

});


const PORT = process.env.PORT || 5001;


app.listen(PORT,()=>{

    console.log(
    `Server running on port ${PORT}`
    );

});