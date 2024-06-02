import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operation/CourseDEetailsApi";
import { PiCurrencyInrFill } from "react-icons/pi";
import { categories } from "../../../../../services/api";
import { RequirmentField } from "./RequirmentField";
import { toast } from "react-toastify";
import { setCourse, setStep } from "../../../../../slice/courseSlice";
import { COURSE_STATUS } from "../../../../../utills/constant";
import { Iconbutton } from "../../../../common/Iconbutton";

export const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [courseCategories, setCourseCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCourseCategories();
      //   const categories1 = await categories.json()
      // console.log(categories1)
      console.log("categories are here ", categories.allTags);

      //   if (categories.status===200) {
      console.log("here");
      setCourseCategories(categories.allTags);
      //   }
      console.log(courseCategories);
    };
    if (editCourse) {
      setValue("courseTittle", course.name);
      setValue("courseShortDesc", course.desc);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenifits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseReuirments", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTittle !== course.name ||
      currentValues.courseShortDesc !== course.desc ||
      currentValues.coursePrice !== course.price ||
      // currentValues.courseTags.toString()!==course.tag
      currentValues.courseBenifits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category ||
      currentValues.courseRequirments.toString() !==
        course.instructions.toString()
      // currentValues.courseImage!==course.thumbnail
    )
      return true;
    else return false;
  };

  //   console.log(courseCategories)
  // console.log(categories,"after submission is here ")
  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        console.log("form data is printed here", formData);
        formData.append("course_Id", course._id);
        if (currentValues.courseTittle !== course.name) {
          formData.append("name", data.courseTittle);
        }
        if (currentValues.courseShortDesc !== course.desc) {
          formData.append("desc", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseBenifits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenifits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirments.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirments)
          );
        }
        const result = await editCourseDetails(formData, token);
        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made in form");
      }
      return;
    }
    const formData = new FormData();
    formData.append("name", data.courseTittle);
    formData.append("desc", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenifits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirments));
    formData.append("status", COURSE_STATUS.DRAFT);
    const result = await addCourseDetails(formData, token);
    if (result) {
      setStep(2);
      dispatch(setCourse(result));
    } else {
      toast.error("No changes made in form o adding new data");
    }
    console.log(formData, "form data printed here so ");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700  bg-richblack-800 p-6"
    >
      <div>
        <label>
          Course Title <sup>*</sup>
        </label>
        <input
          id="courseTittle"
          placeholder="Enter the course title"
          {...register("courseTittle", { required: true })}
          className="w-full"
        />
        {errors.courseTittle && (
          <span>
            Course Tittle is required<sup>*</sup>
          </span>
        )}
      </div>

      <div>
        <label>
          Cure description<sup>*</sup>
        </label>
        <input
          id="courseShortDesc"
          placeholder="enter the course description"
          {...register("courseShortDesc", { required: true })}
          className="   w-full"
        ></input>
        {errors.courseShortDesc && (
          <span>
            Course description is required<sup>*</sup>
          </span>
        )}
      </div>
      <div className="relative">
        <label htmlFor="coursePrice">
          Course Price<sup>*</sup>
        </label>
        <input
          id="coursePrice"
          placeholder="enter the course description"
          {...register("coursePrice", { required: true, valueAsNumber: true })}
          className="w-full"
        ></input>
        <PiCurrencyInrFill className="absolute top-1/2    w-[50px]" />
        {errors.coursePrice && (
          <span>
            coursePrice is required<sup>*</sup>
          </span>
        )}
      </div>
      <div>
        <label htmlFor="courseCategory">
          Course category<sup>*</sup>
        </label>
        {/* {console.log(courseCategories.sucess,"sucess was there or not")}
        {courseCategories.map((category) => {
          return <p key={category._id}>{category.name}</p>
        })} */}
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled>
            Choose a ctaegory
          </option>
          {courseCategories.map((category, index) => (
            <option key={index} value={category?._id}>
              {console.log(category.name)}
              {category?.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && (
          <span>
            course category required <sub>*</sub>
          </span>
        )}
      </div>
      <div>
        <label>
          benifits of the course<sup>*</sup>
        </label>
        <textarea
          id="courseBenifits"
          {...register("courseBenifits", { required: true })}
          className="  w-full min-h-[150px]"
        />
        {errors.courseBenifits && <span> benifits are required</span>}
      </div>
      <RequirmentField
        name="courseReuirments"
        label="courseReuirments/instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {console.log(editCourse)}
      <div>
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            className="flex items-center gap-x-2 bg-richblack-300"
          >
            Continue Without Saving
          </button>
        )}

        <Iconbutton
          onclick={() => dispatch(setStep(2))}
          text={!editCourse ? "Next" : "Save Changes"}
        />
      </div>
    </form>
  );
};
