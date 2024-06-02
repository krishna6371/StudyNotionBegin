import React from 'react'

export const Card = ({cardData,index}) => {
	const{heading,description,level,lessionNumber}=cardData;
	const cardStyle={
		backgroundColor:index===0?'white':'black',
		color: index === 0 ? 'black' : 'white',
		boxShadow:index===0?'5px 5px 10px yellow':'none',
		width: '300px',
		height: '250px',
		padding: '10px',
	}
	
  return (
	<div style={cardStyle}>
		<div className='flex flex-col '>
			<h2 className='text-2xl font-bold mt-3'>{heading}</h2>
	
              <p className='text-black-600'>{description}</p>
			  <div className='border-t border-dotted  mt-2'></div>
			  <div className='flex flex-row mt-6 justify-between'>
				<div>{level}</div>
				<div>{lessionNumber}</div>
       			  </div>

		</div>
	</div>
  )
}
