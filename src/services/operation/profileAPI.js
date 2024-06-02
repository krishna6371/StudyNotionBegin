import { toast } from "react-hot-toast"

import {  setUser } from "../../slice/profileSlice"
import { ApiConnector } from "../Apiconnector"
import { profileEndpoints } from "../api"
import { logout } from "./Authapi1"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } =  profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    

    try {
      const response = await ApiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }

 
  }
}

export async function getUserEnrolledCourses(token) {
  // const toastId = toast.loading("Loading...")
  let result = []
  
  try {
    // console.log("token",token);
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await ApiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    )
    console.log("response",response);
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  // toast.dismiss(toastId)
  return result
}