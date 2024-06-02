const { json } = require("express")
const {instance}= require("../config/razorpay")
const User= require("../models/User")
const Course= require("../models/course")
const mailSender= require("../utills/mailSender")

//capture payment

exports.capturePayment = async(req,res)=>{
	//get course id and user id from request bod
	const{course_id}= req.body
	const user_id= req.user_id

	//check validation

	//valid course id
	if(!course_id){
		return res.status.json({
			sucess:false,
			message:"it is not a valid course id"
		})
	}
	let courseDetail
	try{
		courseDetail= await Course.findById({course_id})
		//course not valid
		if(!courseDetail){
			return res.status.json({
				sucess:false,
				message:"invalid course id ",
			})
		}
		//user already paid for the course
		//string user id to object id
		const uid= new mongoose.Types.objectId(user_id);
		//if student already enrolled in the course
		if(Course.studentsEnrolled.includes(uid)){
			return res.json({
				sucess:false,
				message:"student is already enrolled in the course",
			})
		}
	}
	catch(error){
		 return res.status(500).json({
			sucess:false,
			message:error.message,
		 })
	}

//creating  an order
 const amount=Course.price
  const currency="INR"
  const options={
	amount:amount*100,
	currency,
	receipt:Math.random(Date.now()).toString(),
	notes:{
		course_id:course_id,
		user_id,
	}
  }
  //creating an order
  //initiate the payment using razopay
  try{
     const paymentResponse= await instance.orders.create(options)
	 console.log(paymentResponse);
 return res.status(200).json({
	sucess:true,
	courseName:Course.name,
	courseDescription:Course.desc,
	thumbnail:Course.thumbnail,
	order_id:paymentResponse.id,
	currency:paymentResponse.currency,
	amount:paymentResponse.amount,
 })
  }
  catch(error){
	console.log(error)
	return res.status(500).json({
		sucess:false,
		message:"any error ocures during capturing payment",
	})

  }
 

}
//authorization part
//verify signature

exports.verifySignature= async(req,res)=>{
	
   const webhookSecret= "12345678"

   const signature= req.headers["x-razorpay-signature"];


   //we don not go to backward after hashing but we will do simple hashing

   const shasum= crypto.create.hmac("sha256",webhookSecret)
   //we have to convert into string

   shasum.update(json.stringify(req.body));

   //digest
   const digest= shasum.digest("hex")

   if(digest===signature){
	try{
	//first we have to find user id and course id
	const{user_id,course_id}= req.body.payload.payment.entity.notes

	//find the course and enrooll the student

	const enrolledCourse= await  Course.findByIdAndUpdate(course_id,
		{
			$push:{studentsEnrolled:user_id},
		},{new:true}) 
     
		if(!enrolledCourse){
			return res.status(200).json({
				sucess:false,
				message:"course id not exist",
			})
		}
		console.log(enrolledCourse)
		//find the student and update their courses

		const enrolledStudent= await  User.findByIdAndUpdate(user_id,{
			$push:{courseProgress:course_id},
		},{new:true});

		console.log(enrolledStudent);

		//send the  mail

		const emailResponse= await mailSender(
			enrolledStudent.email,
			"congragulation you sucessfulyy buyed",
			"thanks for buying"
		)
		console.log(emailResponse);
		return res.status(200).json({
			sucess:true,
			message:"congragulations  you are authorized",
		})
	}
	catch(error){
		console.log(error);
		return res.status(500).json({
			sucess:false,
			message:error.message
		})
	}
}
   else{
	return res.status(500).json({
		sucess:false,
		message:"Invalid request",
	})

   }




}