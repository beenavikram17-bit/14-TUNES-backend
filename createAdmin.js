const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const Admin = require("./models/Admin");

dotenv.config();


mongoose.connect(process.env.MONGO_URI)

.then(async ()=>{


    const existingAdmin =
    await Admin.findOne({

        username:"14TunesOwner"

    });



    if(existingAdmin){


        console.log(
        "Admin already exists ✅"
        );


        mongoose.disconnect();

        return;

    }




    const hashedPassword =
    await bcrypt.hash(

        "X7944RR@2026",

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



    mongoose.disconnect();



})


.catch(error=>{


    console.log(
    error.message
    );


});