
const { default: mongoose } = require("mongoose")
const Course= require("../models/course")
const ratingandreview = require("../models/ratingandreview")

//create rating and review


exports.createRatingAndReviews= async(req,res)=>{
	try{
// get user id
    const user_id= req.user.id//auth middleware we send then we fetch


	 //fetch data from request body
	 const{rating,reviews,course_id}= req.body
	
	 //validaton


//check if user enrolled or not
const courseDetails= await Course.findOne({_id:course_id,
	studentsEnrolled:  {$elemMatch : {$eq: user_id}}
	})
	if(!courseDetails){
		return res.status(400).json({
			sucess:false,
			message:"student is not enrolled in this course so you have not acess",
		})
	}


// if(!Course.studentsEnrolled.includes(user_id)){
// 	return res.status(400).json({
// 		sucess:false,
// 		message:"student is not enrolled in this course so you have not acess",
// 	})
//  }
 //check if already user review the course

 const alreadyReviewed= await ratingandreview.findOne({
	user:user_id,
	Course:course_id,
 })
 if(alreadyReviewed){
	return res.status(400).json({
		sucess:false,
		message:"already you reviwed don not need again",
	})
 }



 //create rating and review


const ratingAndReview=await ratingandreview.create({
	user:user_id,
	Course:course_id,
	rating,
	reviews,
})
//updates the course rating review sended byuser
 const updateCourseDetails=await Course.findByIdAndUpdate({_id:course_id},
	{$push: { studentsEnrolled:ratingandreview._id}},
	{new: true}
 )
console.log(updateCourseDetails);
return res.status(200).json({
	sucess:true,
	message:"created rating and review",
	ratingAndReview,
})
	}
	catch(error){
		console.log(error);
		return res.status(500).json({
			sucess:false,
			message:error.message,
		})

	}
}

//average rating
// exports.averageRating=  async(req,res)=>{
// try{
// 	//get course id
// 	const course_id= req.body.course_id

// 	const result = await ratingandreview.aggregate([{
// 		$match:{
// 			Course:new mongoose.Types.ObjectId(course_id)
// 		},
// 	},
// 	{
// 	  $group:{
//          _id:null,
// 		 averageRating: {$avg: "$rating"},

// 	  }
// 	}
// ])

// if(result.length>0){
// 	return res.status(200).json({
// 		sucess:true,
// 		averageRating:  result[0].averageRating,
// 	})
// }
// //if no rating

// return res.status(200).json({
// 	sucess:true,
// 	averageRating:0,
// 	message:"average rating  is ero till now kindly insert ratings"
// })


// }
// catch(error){
// 	console.log(error);
// 	return res.status(500).json({
// 		sucess:false,
// 		message:error.message,
// 	})
// }
// }
exports.getAverageRating = async (req, res) => {
    try {
            //get course ID
            const courseId = req.body.courseId;
            //calculate avg rating

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])

            //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
//get all rating and review
exports.getAllRatingReviews= async(req,res)=>{
	try{
		const allrating= await ratingandreview.find({})
		                                       .sort({rating:"desc"})
											   .populate({
												path:"User",
												select:"firstName,lastName,email,image",
											   })
											   .populate({
												path:"Course",
												select:"name",
											   })
											   .exec()
          return res.status(200).json({
			sucess:true,
			message:"all reviwed fetched sucessfully",
			data:allrating,

		  })
		                                              


	}
	catch(error){
		console.log(error);
	return res.status(500).json({
		sucess:false,
		message:error.message,
	})
	}
}