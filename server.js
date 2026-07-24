const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();


const app = express();





// ==============================
// CORS
// ==============================


app.use(cors({

origin:[

"https://6a63c3faa7bd82a2a926e35f--14-tunes-frontend.netlify.app"

],

methods:[

"GET",
"POST",
"PUT",
"PATCH",
"DELETE"

],

credentials:true


}));





app.use(express.json());





// ==============================
// TEST ROUTE
// ==============================


app.get("/",(req,res)=>{


res.json({

success:true,

message:
"14 TUNES Backend Server Running 🚀"


});


});





// ==============================
// ROUTES
// ==============================


const contactRoutes =
require("./routes/ContactRoutes");


app.use(
"/api/contact",
contactRoutes
);




const userRoutes =
require("./routes/userRoutes");



app.use(
"/api/users",
userRoutes
);







// ==============================
// DATABASE
// ==============================


mongoose.connect(

process.env.MONGO_URI

)

.then(()=>{


console.log(
"MongoDB Atlas Connected Successfully ✅"
);


})

.catch(error=>{


console.log(
"MongoDB Connection Error:",
error.message
);


});







// ==============================
// SERVER
// ==============================


const PORT =
process.env.PORT || 5001;



app.listen(

PORT,

()=>{


console.log(

`Server running on port ${PORT} 🚀`

);


}

);