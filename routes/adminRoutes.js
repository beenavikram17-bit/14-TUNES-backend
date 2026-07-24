const express=require("express");

const router=express.Router();

const jwt=require("jsonwebtoken");

const Admin=require("../models/Admin");



router.post("/login",async(req,res)=>{


try{


const {
username,
password
}=req.body;



if(!username || !password){

return res.status(400).json({

message:"Username and password required"

});

}



const admin =
await Admin.findOne({
username
});



if(!admin){

return res.status(401).json({

message:"Invalid Username or Password"

});

}



const valid =
await admin.comparePassword(password);



if(!valid){

return res.status(401).json({

message:"Invalid Username or Password"

});

}



const token =
jwt.sign(

{
id:admin._id,
username:admin.username
},

process.env.JWT_SECRET,

{
expiresIn:"1h"
}

);



res.json({

message:"Login Successful",

token

});



}

catch(error){


res.status(500).json({

message:error.message

});


}


});



module.exports=router;