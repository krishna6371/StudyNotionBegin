import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import { HighlightText } from './HighlightText'
import { Card } from './Card'
const Dataset=[
	"Free",
	'New to coding',
	"Most popular",
	"Skills paths",
	"Career paths",
]
export const ExploreMore = () => {
		const [tab,setTab]=useState(Dataset[0])
		const[courses,setCourses]=useState(HomePageExplore[0].courses)
		const[card,setCard]=useState(HomePageExplore[0].courses[0].heading)
		const handleTabChange=(selectedTab)=>{
			setTab(selectedTab) 
			// imortant
			const selectedCourses=HomePageExplore.filter((course)=>course.tag===selectedTab)
			setCourses(selectedCourses[0].courses)
			setCard(selectedCourses[0].courses[0].heading)
		}

	
  return (
	<div>
		<div className='flex flex-col  items-center '>
			<div className='text-white text-4xl  text-center font-bold'>Unlock the <HighlightText text={"power of Code"}></HighlightText> </div>
			<p className='flex text-center mt-2 text-2xl font-bold'> Learn to build anything you can imagine</p>
			<div className='flex flex-row  mt-6 p-4 text-xl rounded-full gap-5  bg-richblack-800 '>
             {
				Dataset.map((element,index)=>{
					return(
						<div className={`gap-3 flex flex-row items-center 
						${tab===element?"bg-richblack-900":"bg-richblack-600"} rounded-full transition-all duration-200 hover:bg-richblack-900 `}
						key={index}
						onClick={()=>handleTabChange(element)}>
							{element}

							</div>
					)

				})
			 }
			</div>
			<div className='h-[200px]'>
				
			</div>
	
			<div className='absolute mt-48  flex flex-row justify-between w-full gap-10 items-center '>
			
				{
					
					courses.map((element,index)=>{
						return(
							<Card
							key={index}
							index={index}
							cardData={element}
							card={card}
							setCard={setCard}
							>
							</Card>
						)
					})
				}

			</div>
			</div>


		</div>

	
  )
}
