import React from 'react'
import { Link } from 'react-router-dom'

export const CBbutton = ({children,linkto,flag}) => {
  return (
	<Link to={linkto}>
		<div className={`text-center rounded-full text-[13px] px-6 py-3  font-bold
		${flag?'bg-yellow-50 text-black' :' bg-black text-white'}`}>
        {children}
		</div>
	</Link>

  )
}
