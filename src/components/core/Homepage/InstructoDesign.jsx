import React from 'react'
import { HighlightText } from './HighlightText'
import { CBbutton } from './CBbutton'
import  {FaArrowRight} from "react-icons/fa"
import instructor_design from "../../../assets/Images/Instructor.png"

export const InstructoDesign = () => {
  return (
	<div>
		<div className=' flex flex-row  items-center justify-between'>
			{/* {div for image} */}

			<div className=' w-[45%]'>
				<img src={instructor_design} alt="instructor design" />

			</div>
			<div className=' w-[45%] flex flex-col  gap-8'>
				<div className='text-3xl font-bold'>Become an<br></br> <HighlightText text={"Instructor"}></HighlightText></div>
				<p>Instructors from around the world teach millions of students on StudyNotion.
					 We provide the tools and skills to teach what you love.</p>
					 <div className='flex flex-row'>
					 <CBbutton linkto={"/signup"} flag={true} > 
					 <div className="flex flex-row items-center gap-3">
								ExploreFullCatalog
						<FaArrowRight></FaArrowRight>
						</div>
					 
					
					 </CBbutton>
					
					 </div>
			</div>

		</div>

	</div>
  )
}
