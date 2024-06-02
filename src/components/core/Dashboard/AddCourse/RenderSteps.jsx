import React from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { CourseInformation } from "./CourseInformation/CourseInformation";
import { CourseBuilder } from "./CourseBuilder/CourseBuilder";
import PublishCourse from "./PublishCourse";
export const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Public",
    },
  ];
  return (
    <>
      <div>
        {steps.map((item) => (
          <>
            <div>
              <div
                className={`${
                  step === item.id
                    ? "bg-yellow-700 text-yellow-300"
                    : "bg-richblack-500 text-white"
                }`}
              ></div>
            </div>
            {step > item.id ? <FaCheckCircle /> : item.id}
          </>
        ))}
      </div>
      <div>
        {steps.map((item) => (
          <div>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      {step === 1 && <CourseInformation />}
      {step === 2 && <CourseBuilder />}
      {step === 3 && <PublishCourse />}
    </>
  );
};
