import React, { useEffect, useState } from 'react'

export const RequirmentField = ({name,label,register,errors,setValue,getValues}) => {
	const[requirment,setReqiurment]=useState()
	const[requirmentList,setReqiurmentList]=useState([])
	useEffect(()=>{
		register(name,{
			required:true,
			// validate: (value)=>value.length>0
		})
	},[])
	//jab bi ye requirment list change hooga tabhi ye call hoga
	useEffect(()=>{
		setValue(name,requirmentList)
	},[requirmentList])
	
	const  handleAddRequirment=()=>{
		if(requirment){
			console.log(requirment)
			setReqiurmentList([...requirmentList,requirment])
			setReqiurment("")
		}
	}
	const handleRemoveRequirment=(index)=>{
		const updateRequirmentList=[...requirmentList]
		updateRequirmentList.splice(index,1)
		setReqiurmentList(updateRequirmentList)
	}
  return (
	<div>
  <label htmlFor={name} >{label}<sup>*</sup></label>
  <input
  type='text'
  value={requirment}
  onChange={(e)=>setReqiurment(e.target.value)}
  className='  w-full'/>
  <button onClick={handleAddRequirment} className='  text-yellow-50'>Add</button>
  {console.log(requirmentList,"requirment list")}

  {
  
	requirmentList.length>0 &&(
		<ul>
			{
				requirmentList.map((requirment,index)=>(
					<li key={index} className='flex  text-white'>
                     
						<span>{requirment}</span>
						<button
						type='button'
						onClick={()=>handleRemoveRequirment(index)} 
						className='text-xs text-pure-greys-300'> Remove</button>

					</li>
				))
			}
		</ul>
	)
  }
{
	errors[name]&&(
		<span>{label} is required</span>
	)
}


	</div>
  )
}
