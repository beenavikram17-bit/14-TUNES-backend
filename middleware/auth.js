const jwt = require("jsonwebtoken");


// =================================
// JWT AUTHENTICATION MIDDLEWARE
// =================================

const auth = (req, res, next) => {


    try{


        const token =

        req.headers.authorization;



        if(!token){


            return res.status(401).json({

                message:"Access denied. No token provided"

            });


        }





        const jwtToken =

        token.split(" ")[1];





        const verified =

        jwt.verify(

            jwtToken,

            process.env.JWT_SECRET

        );





        req.admin = verified;



        next();



    }


    catch(error){


        res.status(401).json({

            message:"Invalid or expired token"

        });


    }


};




module.exports = auth;
