import React from 'react';
import { CBbutton } from './CBbutton';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const StylingBoxes = ({ position, heading, cbutton1, cbutton2, subheading,codeblock }) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      <div className={` w-[50%] flex flex-col `}>
        {heading}
        <div className=' text-rich-black-300'>
          {subheading}
        </div>
        <div className='flex mt-10'>
          <CBbutton linkto={cbutton1.linkto} flag={cbutton1.flag}>
            <div className='flex items-center'>{cbutton1.text}</div>
            <FaArrowRight />
          </CBbutton>
          <CBbutton linkto={cbutton2.linkto} flag={cbutton2.flag}>
            <div className='flex items-center'>{cbutton2.text}</div>
          </CBbutton>
        </div>
      </div>
	  {/* {section 2} */}
	  <div className='h-fit flex flex-row w-[100%] text-[15px] lg:w-[500px]'>
		<div className='flex flex-col w-[10%] text-center text-richblack-200'>
			<p>1</p>
			<p>2</p>
			<p>3</p>
			<p>4</p>
			<p>5</p>
			<p>6</p>
			<p>7</p>
			<p>8</p>
			<p>9</p>
			<p>10</p>
			<p>11</p>
		</div>
		<div className={`w-[90%] flex flex-col gap-2   font-bold`} style={{ color: 'yellow' }}>
			<TypeAnimation
        sequence={[codeblock,5000,""]}
		repeat={Infinity}
		cursor={true}
		style= {
			{
				whiteSpace: "pre-line",
				display:"block",
			}

		}
		omitDeletionAnimation={true}
			/>

			

		</div>

	  </div>
	   
	 
	  </div>
	  
    
  );
};

export default StylingBoxes;
