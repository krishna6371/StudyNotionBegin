const mongoose= require("mongoose");

const RatingAndReviews= new mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User",
		required:true,
	},
	rating:{
		type:Number,
		required:true,
	},
	reviews:{
		type:String,
		required:true,
	},
	course:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Course",
		required:true,
		index:true,
	},
})
module.exports=mongoose.model("RatingAndReviews",RatingAndReviews);