//authorization
 const jwt = require("jsonwebtoken");
 const user= require("../models/User")
 require("dotenv").config();
//  exports.auth= async(req,res,next)=>{

// //const token= req.cookies.token|| req.body.token|| req.header("Authorization").replace("Bearer ","");
// const token =
//   req.cookies.token ||
//   req.body.token ||
//   (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

// try{
// //token is not valid
// if(!token){
// 	res.status(400).json({
// 		message:false,
// 		message:"token is empty"
// 	})
// }

// try{
// 	//token is not verified

// 	const decode=  jwt.verify(token,process.env.JWT_SECRET);
// 	console.log(decode);
// //not thinking that line
//   req.user=decode;
// }
// catch(error){
// 	res.status(401).json({
// 		sucess:false,
// 		message:"token is not valid"
// 	})
// }
// next();

//  }

// catch(error){

// 	res.status(401).json({
// 		sucess:false,
// 		message:"something went wrong in auth section",
// 	})
// }

//  }
 //isStudent


 exports.auth = async (req, res, next) => {
	// const token = req.cookies.token || req.body.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
	const token = req.cookies.token || req.body.token || (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
 console.log(token);
	try {
	   // token is not valid
	   if (!token) {
		  return res.status(400).json({
			 success: false,
			 message: "Token is empty",
		  });
	   }
 
	   try {
		  // token is not verified
		  const decode = jwt.verify(token, process.env.JWT_SECRET);
		  console.log(decode);
		  req.user = decode;
	   } catch (error) {
		  return res.status(401).json({
			 success: false,
			 message: "Token is not valid",
		  });
	   }
 
	   // Move the 'next()' call inside the outer try block to ensure it's only called when there's no error.
	   next();
	} catch (error) {
	   // This catch block is unnecessary unless you're handling errors from 'next()' explicitly.
	   res.status(401).json({
		  success: false,
		  message: "Something went wrong in auth section",
	   });
	}
 };
 
 exports.isStudent = async(req,res,next)=>{
	try{
		if(req.user.accountType!=="Student"){
       return res.status(400).json({
		sucess:false,
		message:"It is  student protected route beware ifyou are not student"
	   })
		}
		next();

	}
	catch(error){
		 res.status(500).json({
		message:false,
		mesage:"problem in student domain authentication"

		})
	}

 }
//isInstructor
exports.isInstructor = async(req,res,next)=>{
	try{
		if(req.user.accountType!=="Instructor"){
       return res.status(400).json({
		sucess:false,
		message:"It is  Instructor protected route beware ifyou are not Instructor"
	   })
		}
		next();

	}
	catch(error){
		 res.status(500).json({
		message:false,
		mesage:"problem in Instructor domain authentication"

		})
	}

 }
//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Instructor") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Instructor only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }




 //isAdmin

 exports.isAdmin = async(req,res,next)=>{
	try{
		if(req.user.accountType!=="Admin"){
       return res.status(400).json({
		sucess:false,
		message:"It is Admin protected route beware ifyou are not Admin"
	   })
		}
		next();

	}
	catch(error){
		 res.status(500).json({
		message:false,
		mesage:"problem in Admin domain authentication"

		})
	}

 }