"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useTransition } from "react";
import { HiChevronDown } from "react-icons/hi2";

interface LocalSwitcherProps {
  locale: string;
}

const LocalSwitcher: React.FC<LocalSwitcherProps> = ({ locale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(locale);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
    const nextLocale = value;

    startTransition(() => {
      const newPathname = pathname?.replace(/^\/(en|tr|ar)/, `/${nextLocale}`);
      newPathname&&router.replace(newPathname);
    });
  };

  return (
    <div className="relative">
      <div
        className="border-[0.5px] rounded px-3 py-1 flex items-center gap-1 w-fit cursor-pointer  transition-all ease-linear duration-75  hover:text-slate-300"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Change language</span>
        <div className="flex items-center w-full ">
          {selectedOption === "en" && <span>English</span>}
          {selectedOption === "tr" && <span>Turkey</span>}
          {selectedOption === "ar" && <span>العربية</span>}
        </div>
        <HiChevronDown />
      </div>

      {isOpen && (
        <div className=" z-50 absolute mt-1 w-full bg-white text-secondary text-center border-[0.2px] rounded border-gray-300 shadow-lg">
          <div
            className="px-2 py-1 cursor-pointer hover:bg-gray-200"
            onClick={() => handleOptionClick("en")}
          >
            English
          </div>
          <div
            className="px-2 py-1 cursor-pointer hover:bg-gray-200"
            onClick={() => handleOptionClick("tr")}
          >
            Turkey
          </div>
          <div
            className="px-2 py-1 cursor-pointer hover:bg-gray-200"
            onClick={() => handleOptionClick("ar")}
          >
            العربية
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalSwitcher;
