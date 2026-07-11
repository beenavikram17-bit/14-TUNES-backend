const mongoose = require("mongoose");

const bcrypt = require("bcrypt");


const adminSchema = new mongoose.Schema({

    username:{

        type:String,

        required:true,

        unique:true

    },


    password:{

        type:String,

        required:true

    }


});




// Compare password method

adminSchema.methods.comparePassword = async function(password){


    return await bcrypt.compare(

        password,

        this.password

    );


};




module.exports = mongoose.model(
    "Admin",
    adminSchema
);