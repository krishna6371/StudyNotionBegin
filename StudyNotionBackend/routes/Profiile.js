const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth")
const {
	deleteProfile,
	ProfileUpdate,
	getAllCourse,
	updateDisplayPicture,
  getEnrolledCourses,
} = require("../controller/Profile")

// Delet User Account
router.delete("/deleteProfile",auth, deleteProfile)
router.put("/updateProfile", auth, ProfileUpdate)
router.get("/getUserDetails", auth, getAllCourse)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router