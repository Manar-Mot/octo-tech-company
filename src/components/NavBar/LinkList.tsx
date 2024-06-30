"use client";
import React, { useState } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import ButtonComp from "../sharedComponent/ButtonComp";
import { LinkItem } from "@/src/types";
import { Link, useRouter } from "@/src/navigation";
interface LinkListProps {
  links: LinkItem[];
  isScrolled: boolean;
  btnTite: string;
}
const LinkList: React.FC<LinkListProps> = ({ links, isScrolled, btnTite }) => {
  const [open, setOpen] = useState(false);
  const router =useRouter();

  const toggleOpenList = () => {
    setOpen(!open);
  };
  return (
    <>
      <ul
        className={`justify-self-end w-auto transition-all  ease-linear duration-75 ${
          isScrolled
            ? ""
            : "border bg-black shadow-md border-[rgba(112,112,112,0.1)]"
        }  hidden lg:flex text-[18px]  items-center justify-center
     gap-[70px]  bg-white  py-3 px-[50px] rounded-full`}
      >
        {links.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className="transition-all ease-linear duration-75 cursor-pointer hover:text-accent"
          >
            {link.link}
          </Link>
        ))}
      </ul>
      <div>
        <HiMiniBars3
          size={30}
          className="text-title block lg:hidden cursor-pointer transition-all ease-linear duration-75 hover:text-accent"
          onClick={() => toggleOpenList()}
        />
        <ul
          className={`lg:hidden p-4 flex flex-col items-center gap-8 z-[999] shadow-sm
          fixed  left-0 h-[500px] bg-white w-full  transition-all ease-linear duration-75 ${
            open ? "top-0" : "-top-[500px]"
          }`}
        >
          <MdClose
            size={20}
            className={` ${
              open ? "block" : "hidden"
            } lg:hidden text-title self-start cursor-pointer 
            transition-all ease-linear duration-75 hover:text-accent `}
            onClick={() => toggleOpenList()}
          />

          {links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="transition-all ease-linear duration-75 cursor-pointer hover:text-accent"
            >
              {link.link}
            </Link>
          ))}
          <ButtonComp content={btnTite} isPrimary={true} event={()=>router.push('/services')} />
        </ul>
      </div>
    </>
  );
};

export default LinkList;
