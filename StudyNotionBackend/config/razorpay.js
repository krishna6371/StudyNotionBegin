const Razorpay = require("razorpay")
require("dotenv").config()
//exports
console.log( "key id"+process.env.KEY_ID);
console.log(process.env.KEY_SECRET);
exports.instance= new Razorpay({
	// key_id: process.env.KEY_ID,
	// key_secret: process.env.KEY_SECRET,
	key_id:"rzp_test_OH0fnlqYXdLVnm",
	key_secret:"4FhVfCyTXHX2ZIG0vauHk4xr",
})