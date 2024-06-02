import React from 'react'
import { ContactusForm } from '../../Contactpage/ContactusForm'

export const ContactFromSection = () => {
  return (
	<div className='flex  flex-col items-center'>
		<h1>Get In Touch</h1>
		<p>We'd love to here for you, Please fill out this form</p>
		<ContactusForm></ContactusForm>
	</div>
  )
}
