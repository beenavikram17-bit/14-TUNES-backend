const express = require("express");

const router = express.Router();

const Contact = require("../models/Contact");



// ========================================
// SAVE CONTACT MESSAGE
// ========================================

router.post("/", async(req,res)=>{

try{


const contact = new Contact({

name:req.body.name,

phone:req.body.phone,

message:req.body.message

});


await contact.save();



res.json({

success:true,

message:"Contact saved successfully"

});


}


catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


});




// ========================================
// GET ALL CONTACT MESSAGES
// ========================================

router.get("/", async(req,res)=>{


try{


const contacts = await Contact
.find()
.sort({
date:-1
});



res.json({

success:true,

contacts:contacts

});


}


catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


});





// ========================================
// GET SINGLE MESSAGE
// ========================================

router.get("/:id", async(req,res)=>{


try{


const contact =
await Contact.findById(
req.params.id
);



res.json(contact);


}


catch(error){


res.status(500).json({

message:error.message

});


}


});





// ========================================
// DELETE MESSAGE
// ========================================

router.delete("/:id", async(req,res)=>{


try{


await Contact.findByIdAndDelete(
req.params.id
);



res.json({

success:true,

message:"Message deleted successfully"

});


}


catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


});




module.exports = router;