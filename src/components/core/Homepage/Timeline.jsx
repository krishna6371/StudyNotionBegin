import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../assets/Images/TimelineImage.png"
const Data=[
	{
   heading:"Leadership",
   para:"Fully committed to the success company",
   logo:logo1,
  },
  {
	heading:"Leadership",
	para:"Fully committed to the success company",
	logo:logo2,
   },
   {
	heading:"Leadership",
	para:"Fully committed to the success company",
	logo:logo3,
   },
   {
	heading:"Leadership",
	para:"Fully committed to the success company",
	logo:logo4,
   }
]
export const Timeline= () => {
	
  return (
	<div className="flex flex-row mt-11">
					< div className="flex flex-col w-[45%] items-center mt-10">
						{Data.map((item,index)=>(
                     	<div key={index} className=" flex flex-row gap-6">
						<img src={item.logo} alt="Logo" />
                          <div className="flex flex-col">
							<div className="font-bold text-lg">{item.heading}</div>
							<div>{item.para}</div>
						  </div>
						  </div>
						  ))};
						</div>
						<div class="relative ">
                   <img src={timeLineImage} alt="timeLIneImage"
				   className='h-[400px]  shadow-white object-cover' />
				   <div className='absolute   text-white  bg-caribbeangreen-700 flex flex-row gap-10 left-[30%] translate-x-[-30%] translate-y-[-40%] w-[400px] h-[90px]'>
					<div className='flex flex-row items-center gap-5 border-r border-caribbeangreen-200 '>
						<div className='text-3xl font-bold'>10</div>
						<div className='text-sm text-caribbeangreen-200  mr-8'>YEARS OF <br></br>  <span className=''>EXPERINCE</span> </div>
					</div>
					<div className='flex flex-row gap-8 items-center '>
					<div className='text-3xl font-bold'>250</div>
						<div className='text-sm text-caribbeangreen-200'>TYPE OF <br></br>  <span className=''>COURSE</span> </div>	
					</div>

				   </div>
						</div>
						</div>
  )
}
