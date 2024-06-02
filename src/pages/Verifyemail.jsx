import React, { useEffect, useState } from 'react'

import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp } from '../services/operation/Authapi1';
import { signUp } from '../services/operation/Authapi1';
export const Verifyemail = () => {
	const[otp,setOtp]=useState(""); 
	const dispatch= useDispatch();
	const navigate=useNavigate();
	const{signupData}=useSelector((state)=>state.auth)
	console.log(signupData)
  useEffect(()=>{
	if(!signupData){
		navigate("/signup")
	}
  },[])


	const handleOnSubmit = (e)=>{
   e.preventDefault();
   const{
	firstName,
	lastName,
	email,
	password,
	confirmPassword,
	accountType,
   }=signupData;

   dispatch(signUp(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate));

	}
  return (
	<div>
		<h1>Verify Email</h1>
		<p>A verify email sent to your code.Enter the code below</p>
		
		<form onSubmit={handleOnSubmit}>
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
  <button type='submit'>
	Verify email
  </button>
  </form>
<div>
	<div>
		<Link to='/login'>
			<p>Login</p>
		</Link>
	</div>
	<button onClick={()=>dispatch(sendOtp(signupData.email))}>Resend It</button>
</div>
	</div>
  )
}
