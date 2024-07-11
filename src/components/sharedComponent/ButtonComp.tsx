
"use client"
import React from "react";
import { custom } from "zod";
interface ButtonCompProps {
  content: string;
  isPrimary?: boolean;
  path?: string;
  isSubmit?: boolean;
  event:any;
  custom?:string;
}
const ButtonComp: React.FC<ButtonCompProps> = ({
  content,
  isPrimary,
  event,
  isSubmit,
  custom
}) => {
 
  return (
    <button
    type={isSubmit? "submit":"button"}
      className={`${custom&&custom} text-[16px] lg:text-[18px]  py-[6px] px-3  rounded-md transition-all ease-linear duration-75 ${
        isPrimary
          ? "bg-accent text-white border-none hover:bg-secondary hover:bg-opacity-80"
          : "bg-primary  text-accent border border-accent  hover:bg-accent hover:text-white"
      }`}
      onClick={event}
    >
      {content}
    </button>
  );
};

export default ButtonComp;
