const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();


const app = express();



// =================================
// CORS CONFIGURATION
// =================================

app.use(cors({

    origin:true,

    methods:[
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ],

    credentials:true

}));

// =================================
// MIDDLEWARE
// =================================

app.use(express.json());




// =================================
// TEST ROUTE
// =================================

app.get("/",(req,res)=>{

    res.json({

        success:true,

        message:
        "14 TUNES Backend Server Running 🚀"

    });

});




// =================================
// CONTACT ROUTES
// =================================

const contactRoutes =
require("./routes/ContactRoutes");


app.use(
    "/api/contact",
    contactRoutes
);




// =================================
// USER ROUTES
// =================================

const userRoutes =
require("./routes/userRoutes");


app.use(
    "/api/users",
    userRoutes
);




// =================================
// ADMIN LOGIN ROUTES
// =================================

const adminRoutes =
require("./routes/adminRoutes");


app.use(
    "/api/admin",
    adminRoutes
);




// =================================
// DATABASE CONNECTION
// =================================



mongoose.connect(process.env.MONGO_URI)

.then(()=>{

console.log(
"MongoDB Atlas Connected Successfully ✅"
);


})

.catch(error=>{


console.log(
"MongoDB Error:",
error.message
);


});
// =================================
// SERVER START
// =================================

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