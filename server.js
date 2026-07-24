const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();


const app = express();



// =================================
// CORS CONFIGURATION
// =================================

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

.then(async()=>{


console.log(
"MongoDB Atlas Connected Successfully ✅"
);



const Admin = require("./models/Admin");


const admins = await Admin.find();


console.log(
"Admins in database:",
admins
);



})
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