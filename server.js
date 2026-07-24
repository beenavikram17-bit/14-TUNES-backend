// =====================================================
//          14 TUNES BACKEND SERVER
//          PRODUCTION VERSION
// =====================================================


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();



const app = express();




// =====================================================
//                  MIDDLEWARE
// =====================================================


app.use(
    cors({
        origin: "*",
        methods:[
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE"
        ],
        allowedHeaders:[
            "Content-Type",
            "Authorization"
        ]
    })
);


app.use(
    express.json()
);




// =====================================================
//                  TEST API
// =====================================================


app.get("/",(req,res)=>{


    res.status(200).json({

        success:true,

        message:
        "14 TUNES Backend Server Running 🚀",

        status:
        "Online"

    });


});




// =====================================================
//                  HEALTH CHECK
// =====================================================


app.get("/health",(req,res)=>{


    res.status(200).json({

        server:
        "Running",

        database:
        mongoose.connection.readyState === 1
        ?
        "Connected"
        :
        "Disconnected"

    });


});




// =====================================================
//                  CONTACT ROUTE
// =====================================================


const contactRoutes =
require("./routes/ContactRoutes");


app.use(
    "/api/contact",
    contactRoutes
);




// =====================================================
//                  USER ROUTE
// =====================================================


const userRoutes =
require("./routes/userRoutes");


console.log(
    "User Route Loaded ✅"
);


app.use(
    "/api/users",
    userRoutes
);




// =====================================================
//              DATABASE CONNECTION
// =====================================================


mongoose.set(
    "strictQuery",
    true
);


mongoose.connect(
    process.env.MONGO_URI
)

.then(()=>{


    console.log(
        "MongoDB Atlas Connected Successfully ✅"
    );


})


.catch((error)=>{


    console.log(

        "MongoDB Connection Error:",

        error.message

    );


});




// =====================================================
//                  SERVER START
// =====================================================


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