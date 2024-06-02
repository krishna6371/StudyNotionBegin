import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operation/CourseDEetailsApi";
import { setCourse } from "../../../../../slice/courseSlice";
import { CiCirclePlus } from "react-icons/ci";
import { SubsectionModal } from "./SubsectionModal";
import { ConfirmModal } from "../../../../common/ConfirmModal";

export const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubsection, setaddSubsection] = useState(null);
  const [viewSubsection, setViewSubsection] = useState(null);
  const [editSubSection, setEditSubsection] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      {
        sectionId,
        courseId: course._id,
      },
      token
    );
    console.log("PRINTING AFTER DELETE SECTIOn", result);
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmModal(null);
  };
  const handleDeleteSubsection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });

    if (result) {
      //first converted to  course  then set into course then those things are happening
      const updatedCourseContent = course.courseContent.map(
        (section) => (section._id = sectionId ? result : section)
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmModal(null);
  };
  console.log(course);
  return (
    <div>
      {course?.courseContent?.map((section) => (
        <details key={section._id} open>
          <summary>
            <div>
              <RxDropdownMenu />
              <p>{section.sectionName}</p>
            </div>
            <div>
              <button
                onClick={() =>
                  handleChangeEditSectionName(section._id, section.sectionName)
                }
              >
                <MdEdit />
              </button>
              <button
                onClick={() => {
                  setConfirmModal({
                    text1: "delete all these section",
                    text2: "all These section deleted",
                    btn1Text: "delete",
                    btn2Text: "cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handeler: () => setConfirmModal(null),
                  });
                }}
              >
                <MdDelete />
              </button>
              <span>|</span>
              <IoIosArrowDropdownCircle className={`text-xl  `} />
            </div>
          </summary>
          <div>
            {section?.subSection?.map((data) => (
              <div key={data._id} onClick={() => setViewSubsection(data)}>
                <div>
                  <RxDropdownMenu />
                  <p>{data.title}</p>
                </div>
                <div onClick={(e) => e.stopPropagation}>
                  <button
                    onClick={() =>
                      setEditSubsection({ ...data, sectionId: section._id })
                    }
                  >
                    <MdEdit></MdEdit>
                  </button>
                  <button
                    onClick={() => {
                      setConfirmModal({
                        text1: "delete all these section",
                        text2: "all These section deleted",
                        btn1Text: "delete",
                        btn2Text: "cancel",
                        btn1Handler: () =>
                          handleDeleteSubsection(data._id, section._id),
                        btn2Handeler: () => setConfirmModal(null),
                      });
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setaddSubsection(section._id)}>
            <CiCirclePlus />
            <p>Add leacture</p>
          </button>
        </details>
      ))}
      {addSubsection ? (
        <SubsectionModal
          modalData={addSubsection}
          setModalData={setaddSubsection}
          add={true}
        />
      ) : viewSubsection ? (
        <SubsectionModal
          modalData={viewSubsection}
          setModalData={setViewSubsection}
          view={true}
        />
      ) : editSubSection ? (
        <SubsectionModal
          modalData={editSubSection}
          setModalData={setEditSubsection}
          edit={true}
        />
      ) : (
        <div></div>
      )}
      {confirmModal ? <ConfirmModal modalData={confirmModal} /> : <div></div>}
    </div>
  );
};
