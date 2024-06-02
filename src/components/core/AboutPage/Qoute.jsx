import React from 'react'
import { HighlightText } from '../Homepage/HighlightText'

export const Qoute = () => {
  return (
	<div className='text-3xl font-bold'>
		We are passionate about revolutionizing the way we learn. Our innovative platform
		<HighlightText text={"combines technology"}></HighlightText>
		,
		<span className='text-brown-500'>expertise</span>
		,and community to create an
		<span className='text-brown-600'>unparalleled educational experience.</span>


	</div>
  )
}
