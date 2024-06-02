//  const  {SubsectionModal}  = require("../../src/components/core/Dashboard/AddCourse/CourseBuilder/SubsectionModal");

const Course = require("../models/course");
const Section = require("../models/section");
const subSectionSchema = require("../models/subSectionSchema");

//create section

exports.createSection = async (req, res) => {
  try {
    //fetch the data
    const { sectionName, courseId } = req.body;
    console.log(sectionName, courseId);
    //validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        sucess: false,
        message: "kindly upload all the detais beore creating section",
      });
    }
    //create entry in db
    const createNewSection = await Section.create({ sectionName });

    //update the course
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: createNewSection,
        },
      },
      { new: true }
    );
    //return response
    const updatedCourseDetails = await Course.findById(courseId).populate(
      "courseContent",
      "sectionName"
    );

    return res.status(200).json({
      sucess: true,
      message: "create new section completed baba",
      data: updatedCourseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "something went wrong while creating section",
    });
  }
};
exports.updateSection = async (req, res) => {
  try {
    //fetch the data
    const { sectionName, sectionId, courseId } = req.body;
    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        sucess: false,
        message: "all fields are not valid",
      });
    }
    //update data
    const updateSectionDetails = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName: sectionName,
      },
      { new: true }
    );
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      sucess: true,
      message: "updated the section name",
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "something went wrong while updating the  section",
      error: error.message,
    });
  }
};
//delete the section
exports.deleteSection = async (req, res) => {
  try {
    //fetch id
    const { sectionId, courseId } = req.body;
    console.log(sectionId, courseId);
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });
    //find by id and delets
    const section = await Section.findById(sectionId);
    console.log(section);

    if (!section) {
      return res.status(404).json({
        sucess: false,
        message: "section id is not found",
      });
    }
    //delete subsection
    await subSectionSchema.deleteMany({ _id: { $in: Section.subSection } });

    await Section.findByIdAndDelete(sectionId);
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // const deleteSectiondetails= await section.findByIdAndDelete(sectionId);
    // do we need to dlete the section from course
    //return
    return res.status(200).json({
      sucess: true,
      message: "your  section id deleted ",
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "something went wrong while updating the  section",
      error: error.message,
    });
  }
};
