import React from "react";
import { MdClose } from "react-icons/md";
interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  handleOpen: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, handleOpen, open }) => {
  return (
    <div
      className={`transition-all ease-linear duration-75 bg-opacity-40 ${
        open ? "z-[1000] opacity-100  " : "-z-[1000] opacity-0"
      } fixed left-0 top-0 w-[100vw] h-[100vh] bg-slate-600  grid place-items-center `}
    >
      <div className=" relative w-[400px] bg-white p-10 rounded-md shadow-lg  ">
        <MdClose className="absolute rtl:right-4 ltr:left-4 top-4 text-pargraph text-[18px] md:text-[20px]
         cursor-pointer transition-all ease-linear duration-75 hover:text-accent  " onClick={()=>handleOpen()}/>
        {children}
      </div>
    </div>
  );
};

export default Modal;
