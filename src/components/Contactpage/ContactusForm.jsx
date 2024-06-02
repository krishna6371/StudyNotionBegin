import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import countrycode from '../../data/countrycode.json'
import { useState } from 'react';

export const ContactusForm = () => {
	const [selectedCountryCode, setSelectedCountryCode] = useState(''); 


	const{
		register,
		handleSubmit,
		reset,
		formState:{errors,isSubmitSucessful}
	}=useForm();
	
	const submitContactForm= async(data)=>{
		console.log("Logging the data",data);
		try{
    const response= {status:"OK"}
	console.log("loading response",response)
		}
		catch(error){
			console.log(error)

		}


	}
	useEffect(()=>{
		if(isSubmitSucessful){
			reset({
				firstname:'',
				lastname:'',
				email:'',
				contactno:'',
			});
		}
	},[isSubmitSucessful,reset]
	)
  return (
	<form onSubmit={handleSubmit(submitContactForm)}>
	<div className='h-[300px] flex flex-col'>
		<div className='flex flex-row items-center  gap-5'>
		
		
			<div className='flex flex-col'>
			<label htmlFor='firstname' className='text-xl'>FirstName</label>
			<input type='text'
			name='firstname'
			id='firstname'
			placeholder='Ener first name'
			{...register("firstname",{required:true})}
			 />{
			 errors.firstname && (
				<p>Please Enter Your name</p>
			 )
			 
			 }
			 </div>
		
	
		<div className='flex flex-col items-center'>
		
			<div className='flex flex-col'>
			<label htmlFor='lastname' className='text-xl'>LastName</label>
			<input type='text'
			name='lastname'
			id='lastname'
			placeholder='Enter your last name'
			{...register("lastname",{required:true})}
			 />{
			 errors.lastname && (
				<p>Please Enter Your  last name</p>
			 )
			 
			 }
			 </div>
	
		</div>
		</div>
		{/* {for email address} */}
		<div>

			<div className='flex flex-col'>
			<label htmlFor='email' className='text-xl'>Email</label>
			<input type='email'
			name='email'
			id='email'
			placeholder='Enter your email'
			{...register("email",{required:true})}
			 />{
			 errors.email && (
				<p>Please Enter Your  email</p>
			 )
			 
			 }
			 </div>

		</div>
		<div className='flex flex-col'>
			<label htmlFor='phonenumber'>Phone Number</label>
			{/* {creating dropdown} */}
			<div className='flex flex-row '>
				<select
				 name='dropdown'
				 value={selectedCountryCode} 
				 onChange={(e) => setSelectedCountryCode(e.target.value)}
				 {...register("countrycode",{required:true})} className='w-12'>
                    {
						 countrycode.map((value,index)=>{
							return(
								<option key={index} value={value.code}>
									{value.code}- {value.country}
								</option>
							)
						 })
					}
				</select>
				<div>
					<input type='number'
					name='phonenumber'
					id='phonenumber'
					{...register("phonenumber",{
						required:{value:true,message:"please enter the valid phone no"},
						maxLength:{value:10,message:"please enter a valid phone no"},
					   minLength:{value:8,message:"please enter valid length phone"},
					})}></input>
				</div>
			</div>
			{
				errors.phonenumber &&(
					<span>
					{errors.phonenumber.message}
					</span>
				)
			}
		</div>
		<div className='flex flex-col'>
			<label htmlFor='message'>Message</label>
			<textarea 
			name='message'
			id='message'
			rows="8"
			cols="30"
			placeholder='enter your message'
			/>
			{
				errors.message &&(
					<p>Please enter your message</p>
				)
			}
   
			
		</div>
		
	</div>
	<button type='submit' className='  bg-yellow-300 text-black border-richblack-300 h-[20px] mt-10 ml-6 mb-8 font-bold'>Send Message</button>
	  </form>
	
  )
}
