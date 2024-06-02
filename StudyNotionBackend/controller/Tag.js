const Tag= require("../models/tag");

//create course

exports.createCategory= async(req,res)=>{
try{
//fetch data from request body
const{name,description}=req.body
//validation
if(!name || !description){
	return res.status(401).json({
		sucess:false,
		message:"kindly fill all the field name as well as description"
	})
}
//create entry in mongodb

const createcourse= await  Tag.create({
	name:name,
	description:description,
})
console.log(createcourse);
return res.status(200).json({
	sucess:true,
	message:"name and descripton entry created in mongodb",
})}
catch(error){
	console.log(error);
	return res.status(500).json({
		sucess:false,
		message:"any error occured while creating entry tag in db"
	})
}
}
exports.showAllCategories= async(req,res)=>{
	try{
		const allTags= await Tag.find({},{name:true,description:true});
		console.log(allTags);
		return res.status(200).json({
			sucess:true,
			message:"get all course data here",
			allTags,
		})

	}
	catch(error){
		console.log(error);
		return res.status(500).json({
			sucess:false,
			message:"error while finding get all course",
		})

	}
}
//category page setails
exports.categoryPageDetails= async(req,res)=>{
	try{
	const {category_id}= req.body
	//category details
	const categoryDetails= await  Tag.findById(category_id)
                                             .populate("Course")
											 .exec();
   //validation
   
   if(!categoryDetails){
	return res.status(400).json({
		sucess:false,
		message:"in this category no courses is found",
	})
}
	//different couses
	const differentCategories= await Tag.findById({_id:{$ne: category_id}})
                                                        .populate("Course")
														.exec()
//HW GET TOPselling courses
//find to 10 selling course
return res.status(200).json({
	sucess:true,
	data:{
		categoryDetails,
		differentCategories,
	}
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
