import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation ,Link} from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { resetPassword } from '../services/operation/Authapi1';

export const UpdatePassword = () => {
const dispatch=useDispatch(); 
const location=useLocation();
	const [formData,setformData]= useState({
		password:"",
		confirmPassword:"",
	})
	const[showPassword,setShowPassword]=useState(false);
	const[showConfirmPassword,setShowConfirmPassword]=useState(false);
	const {password,confirmPassword}=formData
	const handleOnChange=(e)=>{
		setformData((prevData)=>(
			{
				...prevData,
				[e.target.name] : e.target.value,
			}
		)

		)

	}
	const handleOnSubmit=(e)=>{
		e.preventDefault();
		const id=location.pathname.split('/')
		const token=id[2]
		console.log(token)
		dispatch(resetPassword(password,confirmPassword,token))
	}

  return (
	
	<div>
		<h1>Choose new Password</h1>
		<p>Almost done brother your new password all set</p>
		{/* <p>New Password</p>
		<p>Confirm New Password</p> */}
		<form onSubmit={handleOnSubmit}>
			<label>
				<p>New Password</p>
				<input 
				required
				type={showPassword ?"text":"password"}
                name='password'
				value={password}
				onChange={handleOnChange}
				placeholder='password'
				/>
					<span
			onClick={()=>setShowPassword((prev)=>!prev)}>
				{
					showPassword ?<FaEye  fontSize={25}/>:<FaEyeSlash  fontSize={25}/>
				}
			</span>
			</label>
		
			<label>
				<p>Confirm Password</p>
				<input 
				required
				type={showConfirmPassword ?"text":"password"}
                name='confirmPassword'
				value={confirmPassword}
				onChange={handleOnChange}
				placeholder='confirm Password'
				/>
					<span
			onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
				{
					showConfirmPassword ?<FaEye  fontSize={25}/>:<FaEyeSlash  fontSize={25}/>
				}
			</span>
			</label>
			<button type='submit'>
				Reset Password

			</button>
		</form>
    <div>
		<Link to ='/login'>
			<p>Back To Login</p>
		</Link>
	</div>
	</div>
  )
}
