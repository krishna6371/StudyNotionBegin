const mongoose= require("mongoose");

const profileSchema=  new mongoose.Schema({
	gender:{
		type:String,
	},
	dateOfBirth:{
		type:String,
	},
	about:{
		type:String,
		trim:true,
	},
	phoneNo:{
		type:Number,
      trim:true,
	}

})
module.exports= mongoose.model("Profile",profileSchema);
// const mongoose= require("mongoose");
// const mailSender = require("../utills/mailSender");


// const OTPSchema= new mongoose.Schema({
// 	email:{
// 		type:String,
// 		required:true,
// 	},
// 	otp:{
// 		type:String,
// 		required:true,
// 	},
// 	createdAt:{
// 		type:Date,
// 		default:Date.now(),
// 		expires:5*60,
// 	}
// })
// // a function to send emails
// async function sendVerificationEmail(email,otp){
// try{
// 	const mailResponse= await mailSender(email,"verification email from notionsite",otp);
// 	console.log("email sent sucessfully:",mailResponse);
// }
// catch(error){
// 	console.log("error occured in sending mail",error);
// 	throw error;

// }

// }

// OTPSchema.pre("save",async function(next){
// 	await sendVerificationEmail(this.email,this.otp);
// 	next();
// })





// module.exports=mongoose.model("OTP",OTPSchema);