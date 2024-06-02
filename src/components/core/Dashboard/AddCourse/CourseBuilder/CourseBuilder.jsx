import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Iconbutton } from "../../../../common/Iconbutton";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slice/courseSlice";
import {
  createSection,
  updateSection,
} from "../../../../../services/operation/CourseDEetailsApi";
import { NestedView } from "./NestedView";
export const CourseBuilder = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editsectionName, setEditsectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch  = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const onSubmit = async (data) => {
    console.log(data.sectionName);
    console.log(course)
    console.log(data)
    let result;
    if (editsectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editsectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );

    }
    if (result) {
      dispatch(setCourse(result));
      setEditsectionName(null);
      setValue("sectionName", "");
    }
  };
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };
  const goNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("add courseContent");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("please add subsection");
      return;
    }
    dispatch(setStep(3));
  };

  function cancelEdit() {
    setEditsectionName(null);
    setValue("editsectionName", "");
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editsectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditsectionName(sectionId);
    setValue("sectionName", sectionName);
  };
  return (
    <div>
      <p>course builder </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">
            Section Name<sup>*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="add section name"
            {...register("sectionName", { required: true })}
            className="w-full"
          />
          {errors.sectionName && <span>Section name is required</span>}
          <Iconbutton
            type="Submit"
            text={editsectionName ? "edit Section" : "create Section"}
          >
            <MdAdd />
          </Iconbutton>
          {editsectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="font-sm    text-yellow-300"
            >
              {" "}
              Cancel Edit
            </button>
          )}
        </div>
      </form>
     
      {
       
        
        course.courseContent.length > 0 && (
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
          />
        )
      }
      <div>
        <button onClick={goBack} className=" bg-yellow-100">
          Back
        </button>
        <button onClick={goNext} className="   bg-yellow-400">
          Next
        </button>
      </div>
    </div>
  );
};
