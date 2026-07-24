const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Admin = require("./models/Admin");


mongoose.connect(process.env.MONGO_URI)

.then(async()=>{


    const existingAdmin =
    await Admin.findOne({
        username:"14TunesOwner"
    });


    if(existingAdmin){

        console.log(
            "Admin already exists ❌"
        );

        process.exit();

    }



    const hashedPassword =
    await bcrypt.hash(
        "Vicky83176",
        10
    );



    const admin =
    new Admin({

        username:"14TunesOwner",

        password:hashedPassword

    });



    await admin.save();



    console.log(
        "Admin Created Successfully ✅"
    );


    process.exit();


})


.catch(error=>{


    console.log(
        "Database Error:",
        error.message
    );


});
