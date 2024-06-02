import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Iconbutton } from '../../common/Iconbutton'

export const MyProfile = () => {
	const{user} =useSelector((state)=>state.profile)
	console.log("finding user",user)
	const navigate=useNavigate()
  return (
	<div>
		<h1>My Profile</h1>
		{/* {section1} */}
		<div>
			<div>
				<img src={user?.img} alt={`profile-${user?.firstName}`}></img>
				<div>
					<p>{user?.firstName} {user?.lastName}</p>
					<p>{user?.email}</p>
				</div>
			</div>
			<Iconbutton text="edit" onclick={()=>{
				navigate("/dashboard/settings")
			}}></Iconbutton>
		</div>
   {/* section2 */}
   <div>
	<div>
		<p>About</p>
		<Iconbutton text="edit" onclick={()=>{navigate("/dashboard/settings")}} />
	</div>
	<p>{user?.additionalDetails?.about ?? "write something about Yourself"}</p>
   </div>
   {/* {setion3} */}
   <div>
	<div>
		<p>Personal Details</p>
		<Iconbutton text="edit" onclick={()=>{navigate("/dashboard/settings")}} />
	</div>
	<div>
		<p>Fisrt Name</p>
		<p>{user?.firstName}</p>
	</div>
	<div>
		<p>Last Name</p>
		<p>{user?.lastName}</p>
	</div>
	<div>
		<p>Email</p>
		<p>{user?.email}</p>
	</div>
	<div>
		<p>Email</p>
		<p>{user?.email}</p>
	</div>
	<div>
		<p>Gender</p>
		<p>{user?.additionalDetails?.gender}</p>
	</div>
	<div>
		<p>Phone No</p>
		<p>{user?.additionalDetails?.phoneNo}</p>
	</div>
	<div>
		<p>Date of Birth</p>
		<p>{user?.additionalDetails?.dateOfBirth}</p>
	</div>
   </div>

	</div>
  )
}
