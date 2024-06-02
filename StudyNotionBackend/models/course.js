// const mongoose= require("mongoose");

// const course=  new mongoose.Schema({
// name:{
// 	type:String,
// 	requird:true,
// },
// desc:{
// 	type:String,
// },
// instructor:{
// 	type:mongoose.Schema.Types.ObjectId,
// 	ref:"User",
// 	required:true,
// },
// whatYouWillLearn:{
// 	type:String,
// },
// courseContent:[{
//  type:mongoose.Schema.Types.ObjectId,
//  ref:"Course",
// }],
// ratingAndReviews:[{
// 	type:mongoose.Schema.Types.ObjectId,
// 	ref:"RatingAndReviews",
// }],
// price:{
// 	type:Number,
// },
// thumbnail:{
// 	type:String,
// },
// tag:{
// 	type:mongoose.Schema.Types.ObjectId,
// 	ref:"Tag",
// },
// studentsEnrolled:[{
// 	type:mongoose.Schema.Types.ObjectId,
// 	requird:true,
// 	ref:"User",
// }]
// })
// module.exports = mongoose.model("Course",course);
const mongoose = require("mongoose");

// Define the Courses schema
const coursesSchema = new mongoose.Schema({
	name: { type: String },
	desc: { type: String },
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	whatYouWillLearn: {
		type: String,
	},
	courseContent: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
	],
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
	price: {
		type: Number,
	},
	thumbnail: {
		type: String,
	},
	tag: {
		type: [String],
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Tag",
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
});

// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema);