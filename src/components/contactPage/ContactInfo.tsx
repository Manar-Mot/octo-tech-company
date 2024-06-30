"use client"
import {  HiClipboardDocumentCheck, HiEnvelope, HiMapPin, HiOutlineClipboard, HiPhone } from "react-icons/hi2";
import SectionContainer from "../sharedComponent/SectionContainer";
import { useTranslations } from "next-intl";
import { useState } from "react";

const ContactInfo: React.FC = () => {
  const t = useTranslations("contact");
  const title = t("contactInfoTitle");
  const wordsToColor = ["أهدافك", "hedeflerinizi", "your goals"];
  const splitTitle = title.split(
    new RegExp(`(${wordsToColor.join("|")})`, "g")
  );

  const [copyText, setCopyText] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeCopyItem, setActiveCopyItem] = useState<number | null>(null); 
  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setActiveCopyItem(index); 
      setTimeout(() => {
        setCopySuccess(false);
        setActiveCopyItem(null); 
      }, 1000); 
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  return (
    <SectionContainer>
      <div className="mx-auto md:max-w-[700px] text-center text-[24px] md:text-[28px] lg:text-[32px] text-title font-bold">
        {splitTitle.map((word, index) => (
          <span
            key={index}
            className={
              wordsToColor.includes(word) ? "text-accent" : " text-title"
            }
          >
            {word}
          </span>
        ))}
      </div>
      <ul className="w-full text-title text-[20px] grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-10 mt-20">
        <li
          className="flex items-center gap-3 bg-white shadow-md rounded-md transition duration-300 hover:scale-90 relative"
          onMouseEnter={() => setCopyText("Idleb, Idleb, Syria")}
          onMouseLeave={() => setCopyText("")}
        >
          <div className="bg-secondary h-full w-24 py-10  rtl:rounded-tr-md rtl:rounded-br-md ltr:rounded-tl-md ltr:rounded-bl-md flex items-center justify-center">
            <HiMapPin className="text-white text-[30px]" />
          </div>
          <span>Idleb, Idleb, Syria</span>
          {copyText === "Idleb, Idleb, Syria" && (
            <button
              onClick={() => copyToClipboard(copyText,1)}
              className=" absolute bottom-5 ltr:right-5 rtl:left-5   "
            >
              {copySuccess&&activeCopyItem === 1 ? (
                <HiClipboardDocumentCheck className="text-accent text-[20px] cursor-pointer" />
              ) : (
                <HiOutlineClipboard className="text-gray-500 text-[20px] hover:text-gray-700 cursor-pointer" />
              )}
            </button>
          )}
        </li>
        <li
          className="flex items-center gap-3 bg-white shadow-md rounded-md transition duration-300 hover:scale-90 relative"
          onMouseEnter={() => setCopyText("+352 681 540 864")}
          onMouseLeave={() => setCopyText("")}
        >
          <div className="bg-secondary h-full w-24 py-10 rtl:rounded-tr-md rtl:rounded-br-md ltr:rounded-tl-md ltr:rounded-bl-md flex items-center justify-center">
            <HiPhone className="text-white text-[30px]" />
          </div>
          <span
            className="text-left"
            style={{ unicodeBidi: "bidi-override", direction: "ltr" }}
          >
            +352 681 540 864
          </span>
          {copyText === "+352 681 540 864" && (
            <button
              onClick={() => copyToClipboard(copyText,2)}
              className=" absolute bottom-5 ltr:right-5 rtl:left-5   "
            >
              {copySuccess &&activeCopyItem === 2? (
                <HiClipboardDocumentCheck className="text-accent text-[20px] cursor-pointer" />
              ) : (
                <HiOutlineClipboard className="text-gray-500 text-[20px] hover:text-gray-700 cursor-pointer" />
              )}
            </button>
          )}
        </li>
        <li
          className="flex items-center gap-3 bg-white shadow-md rounded-md transition duration-300 hover:scale-90 relative"
          onMouseEnter={() => setCopyText("info@octo-tech.co")}
          onMouseLeave={() => setCopyText("")}
        >
          <div className="bg-secondary h-full w-24 py-10  rtl:rounded-tr-md rtl:rounded-br-md ltr:rounded-tl-md ltr:rounded-bl-md  flex items-center justify-center">
            <HiEnvelope className="text-white text-[30px]" />
          </div>
          <span>info@octo-tech.co</span>
          {copyText === "info@octo-tech.co" && (
            <button
              onClick={() => copyToClipboard(copyText,3)}
              className=" absolute bottom-5 ltr:right-5 rtl:left-5   "
            >
              {copySuccess &&activeCopyItem === 3 ? (
                <HiClipboardDocumentCheck className="text-accent text-[20px] cursor-pointer" />
              ) : (
                <HiOutlineClipboard className="text-gray-500 text-[20px] hover:text-gray-700 cursor-pointer" />
              )}
            </button>
          )}
        </li>
      </ul>
    </SectionContainer>
  );
};

export default ContactInfo;
