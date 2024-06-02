const Course = require("../models/course");
const tag = require("../models/tag");
const Tag = require("../models/tag");
const User = require("../models/User");
const { imageUploaderCloudinary } = require("../utills/imageUploader");
require("dotenv").config();
//
exports.createCourse = async (req, res) => {
  try {
    //fetch data
    let {
      name,
      desc,
      category,
      whatYouWillLearn,
      // tag,
      price,
    } = req.body;
    //get thumbnail
    // const thumbnail= req.files.thumbnail
    // console.log(name,desc,category,whatYouWillLearn,tag,price);
    //validation
    if (
      !name ||
      !desc ||
      !category ||
      !whatYouWillLearn ||
      // ||!tag
      !price
    ) {
      return res.status(400).json({
        sucess: false,
        message: "kindly input all the valid filelds",
      });
    }
    //instructor validation because in starting we send the req.id so that we have to also feth
    //from that payload
    const userid = req.user.id;
    const instructordetails = await User.findById(userid);
    //todo verify user id and todo user id same or different
    console.log("instructordetails", instructordetails);

    if (!instructordetails) {
      return res.status(400).json({
        sucess: false,
        message: "instrutor details is not fetched so that you have to find it",
      });
    }
    //tag details
    // const Tagdetails= await Tag.findById(tag);
    // if(!Tagdetails){
    // 	return res.status(200).json({
    // 		sucess:false,
    // 		message:"Tag details not found"
    // 	})
    // }
    // const thumbnailImage = await imageUploaderCloudinary(thumbnail,process.env.FOLDER_NAME);

    //create an entry in db
    const newCourse = await Course.create({
      name,
      desc,
      instructor: instructordetails._id,
      //whenever we create a course we have to also find that who is my instructor
      whatYouWillLearn: whatYouWillLearn,
      price,
      // // thumbnail:thumbnailImage.secure_url,
      //  tag:Tagdetails._id,
    });
    //add new course in courses array

    await User.findByIdAndUpdate(
      { _id: instructordetails._id },
      {
        $push: {
          courses: newCourse,
        },
      },
      { new: true }
    );
    await tag.findByIdAndUpdate(
      {
        _id: category,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //home work add new tag or update tag ka schema
    return res.status(200).json({
      sucess: true,
      message: "not to wooried bro coure=se added sucessfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "while adding the course details som error occured",
    });
  }
};
//get allcourese handeller
// getAllCourses
exports.getAllCourses = async (req, res) => {
  try {
    const getallcourse = await Course.find(
      {},
      { name: true, desc: true, instructor: true, tag: true, price: true }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      sucess: true,
      message: "all tag data fetched",
      data: getallcourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "something went wrong in course section",
    });
  }
};
//get course details
exports.getCourseDetails = async (req, res) => {
  try {
    const { course_id } = req.body;
    const courseDetails = await Course.find(course_id)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("Tag")
      //.populate("RatingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    if (!courseDetails) {
      return res.status(400).json({
        sucess: false,
        mssage: "course details is not valid",
      });
    }
    return res.status(200).json({
      sucess: true,
      message: "course details is valid",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};
