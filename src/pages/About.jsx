import React from 'react'

import { HighlightText } from '../components/core/Homepage/HighlightText'
import image1 from '../assets/Images/aboutus1.webp'
import image2 from '../assets/Images/aboutus2.webp'
import image3 from '../assets/Images/aboutus3.webp'
import { Qoute } from '../components/core/AboutPage/Qoute'
import FoundingStory from '../assets/Images/FoundingStory.png'
import { StatsComponent } from '../components/core/AboutPage/StatsComponent'
import { LearningGrid } from '../components/core/AboutPage/LearningGrid'
import { ContactFromSection } from '../components/core/AboutPage/ContactFromSection'
export const About = () => {
  return (
	<div>
		{/* {sectiion1} */}
		<section>
			<div>
				<header>
				Driving Innovation in Online Education for a
                 <HighlightText text={"Brighter Future"}/>
				<p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies,
					 and nurturing a vibrant learning community.</p>
				</header>
				<div className='flex flex-row gap-3'>
					<img src={image1}alt="imager1" />
					<img src={image2} alt="image2"></img>
					<img src={image3} alt="image3" />
				</div>
				<div></div>
			</div>
			
			</section>
			{/* {section2} */}
			<section>
			<div>
				<Qoute/>
			</div>
		
			</section>
			{/* {section3} */}
			<section>
			<div className='flex flex-col gap-5'>
				<div className='flex flex-row w-[45%] gap-7'>
				<div className='flex flex-col'>
					<h1>Our Founding Story</h1>
					<p>
					Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality
					 learning opportunities in a rapidly evolving digital world.
					</p>
					<p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals 
						from all walks of life to unlock their full potential.</p>
				</div>
				<div className=''>
              <img src={FoundingStory} alt="FoundingStory"  style={{width:'1000px' ,height:'500px'}}/>
				</div>
				</div>
				<div className='flex flex-row'>
					<div className='flex flex-col'>
						<div>Our Vision</div>
                      <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, 
						fostering a dynamic and interactive learning experience.</p>
					</div>
					<div>
						<div>Our mission</div>
						<p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of 
							collaboration through forums, live sessions, and networking opportunities.</p>
					</div>

				</div>

			</div>
			<StatsComponent/>
		
			</section>
			{/* {section5} */}
			<section>
				<LearningGrid/>
				<ContactFromSection></ContactFromSection>
			</section>
			</div>
  )
}
