

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operation/Authapi1'

export const ForgotPassword = () => {
	const[emailsent,setEmailsent]=useState(false)
	const[email,setEmail]=useState("")
	const dispatch=useDispatch();
	const handleOnSubmit=(e)=>{
		e.preventDefault();
		dispatch(getPasswordResetToken(email,setEmailsent));

	}

  return (
	<div className='text-white flex flex-col justify-center items-center'> 
   <h1>
	{
		!emailsent?"Reset yor Password":"Check your email"
	}

   </h1>
   <p>
	{
		!emailsent?
		"Have no fear we will sent email to reset Your Password if you donot have then we also try for recover"
		:`we have sent mail to your ${email}`
	}
   </p>
   <form onSubmit={handleOnSubmit}>
	{
		!emailsent&&(
			<label>
				<p>Email address</p>
				<input
				required
				type='email'
				name='email'
				value={email}
				placeholder='Enter your email Address'
				onChange={(e)=>setEmail(e.target.value)}

				></input>
			</label>
		)
	}
	<button type='submit'>
		{
			!emailsent?"ForgotPassword":"Resendemail"
		}
	</button>
   </form>
   <div>
	<Link to="/Login">
		<p>Back to login</p>
	</Link>
   </div>

	</div>
  )
}
