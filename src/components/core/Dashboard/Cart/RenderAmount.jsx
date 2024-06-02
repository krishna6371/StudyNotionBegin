import React from 'react'
import { useSelector } from 'react-redux'
import { Iconbutton } from '../../../common/Iconbutton'

export const RenderAmount = () => {
	const{cart,total} =useSelector(state=>(state.cart))
	const handleClick= ()=>{
		const courses= cart.map((course)=>course._id)
      console.log("Bought these courses ",courses)
	}
  return (
	<div>
		<p>Total Items</p>
		<p>Amount{total}</p>
		<Iconbutton
		text={"Buy course"}
		onclick={handleClick}></Iconbutton>


	</div>
  )
}
