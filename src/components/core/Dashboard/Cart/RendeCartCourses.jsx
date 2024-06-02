import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'

import { removeFromCart } from '../../../../slice/cartSlice';
import { MdDelete } from "react-icons/md";
export const RendeCartCourses = () => {

	const {cart} = useSelector((state)=>state.cart)
	const dispatch =useDispatch();
  return (
	<div>
      {
		cart.map((course,index)=>(
			<div>
				<div key={index}>
        <img src={course.thumbnail} alt="" />

					</div>
					<div>
						<p>{course?.name}</p>
						<p>{course?.category?.name}</p>
						</div>
						<div>
							<div>
							<span>4.8</span>
							<ReactStars
							  count={5}
							  size={24}
							  color2={'#ffd700'}
							  edit={false}
							  emptyIcon={<MdDelete />}
							  fullIcon={<MdDelete />}
							/>
							<span>{course?.ratingAndReviews?.length}</span>
						</div>  	 

						</div>  
						<div>
							<button onClick={()=>dispatch(removeFromCart(course._id))}>
							<MdDelete />
							<span>Remove</span>
							</button>
							<p>{course?.price}</p>
							</div>




			</div>

		))
	  }


	</div>
  )
}
  