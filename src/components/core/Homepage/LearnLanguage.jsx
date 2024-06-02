import React from 'react'
import { HighlightText } from './HighlightText'
import { CBbutton } from './CBbutton'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with from "../../../assets/Images/Compare_with_others.png"
import  plan_your from "../../../assets/Images/Plan_your_lessons.png"
export const LearnLanguage = () => {
  return (
	<div className='flex flex-col items-center mt-36'>
		<p className='text-3xl'>Your Swiss Knife for<HighlightText text="learning any language"></HighlightText> </p>
		<p className='text-center'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom <br></br>schedule and more.</p>
		<div className='flex flex-row'>
		<img src={know_your_progress} alt="know_your progress"  className='mr-[-100px] w-[400px] h-[400px]'/>
		<img src={compare_with} alt="compareWith" />
		<img src={plan_your} alt="plan_your"  className='ml-[-150px] w-[450px] h-[450px]'/>
			 

		</div>
		<CBbutton linkto={"/login"}flag={true} >Learn More</CBbutton>
	</div>
  )
}
