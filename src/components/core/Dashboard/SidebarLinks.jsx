import React from 'react'
import * as Icons  from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

export const SidebarLinks = ({link,iconName}) => {
	console.log("her e is my sidebar link",link)

	const Icon=Icons[iconName]
	const location=useLocation();
	const dispatch= useDispatch();
	 const matchRoute=(route)=>{
		return matchPath({path:route},location.pathname);
	 }

  return (
	<NavLink to={link.path}    
	className={`${matchRoute(link.path)?"bg-yellow-800":"bg-opacity-0"}`}
	>
		<span className={`absolute left-0 h-0 top-full w-[0.2rem] bg-yellow-5
		${matchRoute(link.path)?"opacity-100":"opacity-0"}`}></span>
		<div className='flex items-center gap-x-2'>
     <Icon className="text-lg"></Icon>
      <span>{link.name}</span>
		</div>

	</NavLink>

  )
}
