import React from 'react'

export const StatsComponent = () => {
	const data =[
		{
			count:"5K",
			value:"ActiveStudents"
		},
		{
			count:"10+",
			value:"Mentors",
		},
		{
			count:"200+",
            value:"courses",
		},
		{
			count:"50+",
			value:"Awards",
		}
	]
  return (
	<section>
	<div className='flex flex-row justify-between'>
    {
		data.map((data,index)=>(
			<div key={index}>
				<h1 className='text-3xl'>{data.count}</h1>
				<h2>{data.value}</h2>

			</div>
		))
	}
	</div>
	</section>
  )
}
