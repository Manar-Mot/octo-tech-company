
import { getLocale } from "next-intl/server";
import Image from "next/image";
import React, { use } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  iconUrl: string;
  index: number;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  description,
  iconUrl,
  title,
  index,
}) => {
  return (
    <div
      className={`relative bg-white ${
        index%2!==0 &&"lg:-bottom-14 " 
      }  md:h-[350px]   flex flex-col gap-1 items-center py-10 
    px-6 justify-center rounded-md shadow-md`}
    key={index}
    >
      <Image
        src={iconUrl}
        alt={`serviceIcon${index}`}
        className="w-16 h-auto my-3"
      />
      <h4 className="text-[18px] font-bold text-title text-center">{title}</h4>
      <p className="text-[16px] text-pargraph text-center  md:ext-justify ">{description}</p>
    </div>
  );
};

export default ServiceCard;
