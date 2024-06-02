import React from 'react'

export const Iconbutton = ({text,onclick,children,disabled,type}) => {
  return (
<button disabled={disabled} onClick={onclick}  type={type}>
	{
		children?(<><span>{text}</span>{children}</>):(text) 
	}
</button>
  )
}
