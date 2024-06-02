const User = require("../models/User");
const mailSender = require("../utills/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// exports.resetPasswordToken= async(req,res)=>{
// 	try{
// 	//find email from request body
// 	const {email}= req.body
// 	// const email1= req.body.email
// 	//check user  for this email and validation

// 	const userExist= await User.findOne({email});
// 	if(!userExist){
// 		return res.status(400).json({
// 			sucess:false,
// 			message:"user not exist first you have to signup"

// 		})
// 	}
// 	//generate token
// 	const token= crypto.randomUUID;
// 	console.log(token)
// 	//update details and add exparation time
// 	const updateDetails= await User.findOneAndUpdate({email:email},
// 		{token:token,
// 		resetPasswordExpires: Date.now()+5*60*1000},
// 		{new:true}
// 		)
// //create url
// 	const url=`http://localhost:3000/update-password/${token}`

// await mailSender(
// 	email,
// 	"ResetPassword ",
// 	`Reset password Link${url}`
// );

// return res.status(200).json({
// 	sucess:true,
// 	message:"password reset link send to your email kindly reset"
// })
// 	}
// 	catch(error){
// 		return res.status(500).json({
// sucess:false,
// message:"something went wrong when yo will reset the pasword"

// 		})

// 	}
// }
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }
    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    //fetch the data
    const { password, confirmPassword, token } = req.body;
    console.log(req.body);
    //password and confirm password not match
    if (password !== confirmPassword) {
      return res.status(400).json({
        sucess: false,
        message: "password are not match repeaat again all the step",
      });
    }
    //find user by using token
    const userDetails = await User.findOne({ token: token });
    //user not exist
    if (!userDetails) {
      return res.status(400).json({
        sucess: false,
        message: "token is not valid",
      });
    }
    //toke timecheck
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        sucess: false,
        message: "reset password time Expires",
      });
    }
    // hahed the new password
    const hashedpassword = await bcrypt.hash(password, 10);
    //update password

    await User.findOneAndUpdate(
      { token: token },
      { password: hashedpassword },
      { new: true }
    );

    return res.status(200).json({
      sucess: true,
      message: "password ereset sucssfully champ best of luck",
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "something went wrog when you call reset password2",
    });
  }
};
