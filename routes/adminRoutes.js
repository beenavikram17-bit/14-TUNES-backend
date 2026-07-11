const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");




// =================================
// ADMIN LOGIN API
// POST /api/admin/login
// =================================

router.post("/login", async (req, res) => {


    try{


        const {

            username,

            password

        } = req.body;




        const admin = await Admin.findOne({

            username: username

        });





        if(!admin){


            return res.status(401).json({

                message:"Invalid Username or Password"

            });


        }





        const isPasswordValid =

        await admin.comparePassword(password);





        if(!isPasswordValid){


            return res.status(401).json({

                message:"Invalid Username or Password"

            });


        }






        const token = jwt.sign(

            {

                id: admin._id,

                username: admin.username

            },


            process.env.JWT_SECRET,


            {

                expiresIn:"1h"

            }


        );







        res.status(200).json({


            message:"Login Successful",


            token:token



        });





    }


    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});






module.exports = router;