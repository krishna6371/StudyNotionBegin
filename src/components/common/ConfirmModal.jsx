import React from "react";
import { Iconbutton } from "./Iconbutton";

export const ConfirmModal = ({ modalData }) => {
  console.log(modalData);
  return (
    <div>
      <div>
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>
      </div>
      <div>
        <Iconbutton
          onclick={modalData?.btn1Handler}
          text={modalData?.btn1Text}
        ></Iconbutton>
        <button
          onClick={modalData?.btn2Handler}
          text={modalData?.btn2Text}
        ></button>
      </div>
    </div>
  );
};
