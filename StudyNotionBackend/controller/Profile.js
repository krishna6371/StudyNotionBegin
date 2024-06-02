const Profile=  require("../models/Profile");
const User= require("../models/User")
const {imageUploaderCloudinary}=require("../utills/imageUploader")

exports.ProfileUpdate= async(req,res)=>{
	try{
   //get data
   const{gender,dateOfBirth="",about="",phoneNo}= req.body
   
   const user_id= req.user.id;
   //validation
   if(!gender || !phoneNo || !user_id){
	return res.status(400).json({
		sucess:false,
		messag:"kindly fill all the details in profile"
	})
   }
   //find Profile
   const userDetails= await User.findById(user_id);
   console.log(userDetails)
    const profileId=  userDetails.additionalDetails;
	console.log(profileId);
	//update profile
//    const updateProfile= await User.findByIdAndUpdate(profileId,{
// 	gender:gender,
// 	phoneNo:phoneNo,
// 	dateOfBirth:dateOfBirth,
// 	about:about,
//    })
//another technique
const profileDetails= await Profile.findById(profileId);

profileDetails.gender= gender;
profileDetails.dateOfBirth=dateOfBirth;
profileDetails.phoneNo= phoneNo;
profileDetails.about= about;

const updateProfileDetails = await profileDetails.save();

return res.status(200).json({
	sucess:true,
	message:"profile updated sucessfully",
	updateProfileDetails,
})
	}
	catch(error){

		return res.status(500).json({
			sucess:false,
			message:"something went wrong in profile details",
			error:error.message,
		})

	}
}
//delete Profile


// exports.deleteProfile = async(req,res)=>{
// 	try{
// 		//finding user id
// 		const user_id = req.user.id
// 		if(!user_id ){
// 			return res.status(400).json({
// 				sucess:false,
// 				message:"any field in valid"
// 			})
// 		}
// 		const userDetails= await User.findById(user_id);
// 		const profile_id= userDetails.additionalDetails;
// 		//validation
		
// //delete profile becuase profile hold additional information
// const deleteProfile = await Profile.findByIdAndDelete(profile_id);
// //delete user 
// const deleteUser= await User.findByIdAndDelete(user_id);
// //HW TASK SCHEDULING 
// //HW CHRONE JOB

// return res.status(200).json({
// 	sucess:true,
// 	message:"id deleted sucessfully"
// })
// 	}
// 	catch(error){
// 		console.log(error);
	
// 		return res.status(500).json({
// 			sucess:false,
// 			message:"something went wrong in profile details",
// 			error:error.message,
// 		})

// 	}
// }
exports.deleteProfile = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		const id = req.user.id;
		console.log(id);
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete(id);
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};
// get all course

exports.getAllCourse= async(req,res)=>{
	try{
		const user_id = req.user.id;

		const profiledetails= await User.findById(user_id).populate("additionalDetails").exec();
		return res.status(200).json({
			sucess:true,
			message:"get all coursse",
			data:profiledetails,
		})

	}
	catch(error){

		console.log(error);
	
		return res.status(500).json({
			sucess:false,
			message:"something went get all course ",
			error:error.message,
		})
	}
}
//update and display pictures
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await imageUploaderCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
//get enrolled course
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};