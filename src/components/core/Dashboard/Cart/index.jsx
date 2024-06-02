import { useSelector } from "react-redux";



import { RendeCartCourses } from "./RendeCartCourses";
import { RenderAmount } from "./RenderAmount";

export default function Cart (){
	const {totalItems,total} = useSelector((state)=>state.auth)
	return (
		<div className="text-white ">
			<h1>Your Cart items</h1>
			<p>{totalItems} No of courses in Your Cart</p>
			{
				total>0 ?(<div>
					<RendeCartCourses></RendeCartCourses>
					<RenderAmount></RenderAmount>
				</div>):(<div>No items exist on cart</div>)

			}
		</div>
	)
}