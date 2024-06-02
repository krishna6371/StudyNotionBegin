const User=require("../models/User");
const OTP=require("../models/somnath")
const otpGenerator= require("otp-generator");
const bcrypt= require("bcrypt");
const Profile= require("../models/Profile")
const jwt = require('jsonwebtoken');
require("dotenv").config();
//send otp


exports.SendOTP= async(req,res)=>{
try{
//whateever give by the user
	const{email}= req.body
//if user already exist then we have to the return rsponse
    const userExist=await User.findOne({email});

	if(userExist){
		return res.status(401).json({
			sucess:false,
			message:"user already exist no need to signup",
		})
	}
	//generate otp after that
	let otp=otpGenerator.generate(6,{
		upperCaseAlphabets:false,
		lowerCaseAlphabets:false,
		specialChars:false,
	})
	let result = await OTP.findOne({otp:otp})
	//if otp does not find same otp then no isusue if the otp exist in db
	while(result){
		otp=otpGenerator.generate(6,{
			upperCaseAlphabets:false,
			lowerCaseAlphabets:false,
			specialChars:false,
		})
		result= await OTP.findOne({otp:otp});
	}

//after finding unique otp i have to send to the user

//

//creating object
// Generate OTP and set expiration time (e.g., 5 minutes from now)
const otpExpiryTime = new Date();
otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 5); // Adjust as needed

const payLoad = {
    email,
    otp,
    expiryTime: otpExpiryTime,
};

// Create OTP document in the database
const otpBody = await OTP.create(payLoad);


res.status(200).json({
	sucess:true,
	message:"otp sended sucessfully",
	otp,
})
}
catch(error){
	console.log("error in otp formation ",error.message);
	return res.status(500).json({
		sucess:false,
		message:error.message,
	})


}
}
exports.SignUp= async(req,res)=>{
	try{
// fetch data from req.body
    const{firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp}=req.body;

	//validate the data 

	if(!firstName || !lastName || !email || !password || !confirmPassword  || !otp){
  return  res.status(401).json({

    sucess:false,
	message:"kindly fill all the valid position",
	})
	}
	// console.log(firstName);
	// console.log(lastName);
	// console.log(otp);
	//check password and confirm password
	if(password!==confirmPassword){
  return res.status(400).json({
	sucess:false,
	message:"password not matched sucessfully",
  })
	}
	//
	let userExist= await User.findOne({email});
	if(userExist){
		return res.status(400).json({
			sucess:false,
			message:"user alredy exist kindly login",
		})
	}
	//finding most recent otp we fetch from otp databse it  return an array 
	const recentOtp= await OTP.find({email}).sort({createdAt:-1}).limit(1);
  console.log(recentOtp);
	if(recentOtp.length===0){
		return res.status(400).json({
			sucess:false,
			message:"otp is invalid due to length is zero"
		})
	}
	else if(recentOtp[0].otp!==otp){
		return res.status(400).json({
			sucess:false,
			message:"otp is invalid due to  incoorect otp you enterd"
		})
	}
	const hashedpassword= await bcrypt.hash(password,10);

	const profileData = {
		gender: null,
		dateOfBirth: null,
		about: null,
		phoneno: null,
	};
	
	const profile = await Profile.create(profileData);
	

 

const user= await User.create({
	firstName,
	lastName,
	email,
	password:hashedpassword,
	accountType,
	contactNumber,
	additionalDetails: profile._id,
	image:`https://api.dicebar.com/7.x/initials/svg?speed=${firstName}${lastName}`
})


return res.status(200).json({
	sucess:true,
	message:"user is registerd sucessfully",
	user,
})

	}
	catch(error){
		console.log(error);
		return res.status(500).json({
			sucess:false,
			message:"user not signup sucessfully",

		})

	}
}
// login 
exports.login= async(req,res)=>{
try{
	const{email,password}= req.body;
	//validation
	if(!email || !password){
		return res.status(400).json(
			{
				sucess:false,
				message:"login or may be password field empty",
			}
		)
	}
	//user exist or not
const user= await User.findOne({email}).populate("additionalDetails");
console.log(user);
if(!user){

	return res.status(400).json(
		{
			sucess:false,
			message:"user not exist",
		}
	)
}
///if pssword  match compare function in bcrypt
// if(await bcrypt.compare(password,User.password)){
// 	const payload={
// 		email:User.email,
// 		id:User._id,
// 		accountType:User.accountType,
// 	}
if (await bcrypt.compare(password, user.password)) {
    const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
    };
	//create token
	const token= jwt.sign(payload,process.env.JWT_SECRET,{
		expiresIn:"2h"
	});
	User.token= token;
	User.password=undefined;

	//create cookie and send response
	const options={
		expires: new Date(Date.now()+2*24*60*60*100),
		httpOnly:true,
	}
	res.cookie("token",token,options).status(200).json({
		sucess:true,
		token,
		user,
		message:"logged sucessfully",
	})

}
else{
	res.status(401).json({
		sucess:false,
		message:"password does not matches"
	})
}

}
catch(error){
	console.log(error);
	return res.status(500).json({
		sucess:false,
		message:"you can not logged in",
	})
}

}
//change password todo 
exports.changePassword= async(req,res)=>{
	//get data from req body
  const{password,confirmPassword,newConfirmPassword}= req.body
	//old password new password and confirm new password

	if(!password || !confirmPassword || !newConfirmPassword){
		return res.status(401).json({

		})
	}
	//validation
	//update password
	//send mail when password update
	//return response

}