import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserEnrolledCourses } from '../../../services/operation/profileAPI'
import ProgressBar from "@ramonak/react-progress-bar";

export const EnrolledCourses = () => {
  const {token}= useSelector((state)=>state.auth)
  const[enrrolledCourses,setEnrolledCourses]= useState(null)
     
  const getEnrolledCourses=async()=>{
    try{
      const response= await   getUserEnrolledCourses(token);
      setEnrolledCourses(response)
    }
    catch(error){
      console.log(error)
    }

  }
  
  useEffect(()=>{
getEnrolledCourses();
  },[])

  return (
    <div className='text-white'>

    <div>Enrolled Courses</div>
    {
        !enrrolledCourses ? (<div>
            Loading...
        </div>)
        : !enrrolledCourses.length ? (<p>You have not enrolled in any course yet</p>)
        : (
            <div>
                <div>
                    <p>Course Name</p>
                    <p>Durations</p>
                    <p>Progress</p>
                </div>
                {/* Cards shure hote h ab */}
                {
                   enrrolledCourses.map((course,index)=> (
                        <div>
                            <div>
                                <img  src={course.thumbnail}/>
                                <div>
                                    <p>{course.courseName}</p>
                                    <p>{course.courseDescription}</p>
                                </div>
                            </div>

                            <div>
                                {course?.totalDuration}
                            </div>

                            <div>
                                <p>Progress: {course.progressPercentage || 0}%</p>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height='8px'
                                    isLabelVisible={false}
                                    />
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
  
</div>
  )
}
