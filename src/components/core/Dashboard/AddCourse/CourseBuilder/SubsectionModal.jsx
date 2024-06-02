import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operation/CourseDEetailsApi";
import { setCourse } from "../../../../../slice/courseSlice";
import { get } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { Iconbutton } from "../../../../common/Iconbutton";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Upload from "../Upload";

export const SubsectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (view || edit) {
      setValue("leactureTittle", modalData.title);
      setValue("leactureDesc", modalData.description);
      setValue("leactureVideo", modalData.videoUrl);
    }
  }, []);
  const isFromUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.leactureTittle !== modalData.title ||
      currentValues.leactureDesc !== modalData.description ||
      currentValues.leactureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formdata = new FormData();
    formdata.append("sectionId", modalData.section._id);
    formdata.append("subSectionId", modalData._id);
    if (currentValues.leactureTittle !== modalData.title) {
      formdata.append("tittle", currentValues.leactureTittle);
    }
    if (currentValues.leactureDesc !== modalData.description) {
      formdata.append("description", currentValues.leactureDesc);
    }
    if (currentValues.leactureVideo !== modalData.videoUrl) {
      formdata.append("videoUrl", currentValues.leactureVideo);
    }
    // do api calling
    const result = await updateSubSection(formdata, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
      dispatch(setCourse(result));
    }
    setModalData(null);
  };
  const onSubmit = async (data) => {
    if (view) return;
    if (edit) {
      if (!isFromUpdated) {
        toast.error("no dtata changes inside  the form");
      } else {
        handleEditSubSection();
      }
      return;
    }
    console.log(data, " data");
    // console.log(data["Leacture Video"], " data leacture video");
    console.log(data);
    const formdata = new FormData();
    formdata.append("file", data["Leacture Video"]);
    formdata.append("upload_preset", "bkynijta");
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dr4rx4jfp/video/upload`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const uploadData = await response.json();

    // formdata.append("sectionId", modalData);
    // console.log("first", formdata);
    // console.log(modalData);
    // formdata.append("title", data.leactureTittle);
    // formdata.append("description", data.leactureDesc);
    // formdata.append("video", data["Leacture Video"]);
    console.log(uploadData);
    const result = await createSubSection(
      {
        sectionId: modalData,
        videoUrl: uploadData.secure_url,
        title: data.leactureTittle,
        description: data.leactureDesc,
        duration: uploadData.duration,
      },
      token
    );
    console.log(result);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
  };
  return (
    <div>
      <div>
        <div>
          <p>
            {view && "viewing"} {add && "adding"} {edit && "editing"} Leacture
          </p>
          <button>
            <ImCross />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Upload
            name="Leacture Video"
            label="Leacture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          ></Upload>

          <div>
            <label>Leacture Tittle</label>
            <input
              id="leactureTittle"
              placeholder="Enter the leacture Tittle"
              {...register("leactureTittle", { require: true })}
              className="w-full"
            />
            {errors.leactureTittle && <span>Leacture Tittle is required</span>}
          </div>
          <div>
            <label>Leacture Description</label>
            <textarea
              id="leactureDesc"
              placeholder="Enter leacureDescription"
              {...register("leactureDesc", { required: true })}
              className="w-full"
            ></textarea>
            {errors.leactureDesc && <span>Leacture Description Required</span>}
          </div>
          {!view && (
            <div>
              <Iconbutton text={edit ? "save Changes" : "save"} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
