import React from 'react'
import { HighlightText } from '../Homepage/HighlightText'
import { CBbutton } from '../Homepage/CBbutton'

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];
export const LearningGrid = () => {
	return (
		<div className='grid mx-auto grid-cols-4 gap-4  w-11/12 h-[350px]'>
		  {LearningGridArray.map((card, index) => (
			<div
			  key={index}
			  className={`${
				index === 0 && "col-span-2"
			  } ${
				card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"
			  } ${
				card.order === 3 && "col-start-2"
			  }`}
			>
			  {card.order < 0 ? (
				<div className='flex flex-col  text-center gap-3 '>
				  <h3 className='text-4xl'>{card.heading}
				  <HighlightText text={card.highlightText}  /></h3>
				 
				  <p>{card.description}</p>
				  <div className='flex items-center'>
				  <CBbutton linkto={card.BtnLink} flag={true}>
					{card.BtnText}
				  </CBbutton>
				  </div>
				</div>
			  ) : (
				<div>
				  <h2>{card.heading}</h2>
				  <p>{card.description}</p>
				</div>
			  )}
			</div>
		  ))}
		</div>
	  );
	  
}