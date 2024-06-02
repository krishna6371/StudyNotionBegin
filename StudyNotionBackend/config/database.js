const mongoose=require("mongoose");
require("dotenv").config();


exports.connect=()=>{mongoose.connect(
	process.env.MONGODBURL,
	{

})
.then(()=>{console.log("db connected sucessfully")})
.catch((error)=>{
	console.log("db connection failed")
	console.error(error)
	process.exit(1);
})
}