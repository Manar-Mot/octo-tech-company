import { bgSectionWhite, heroImages } from "@/public/assets";
import Image from "next/image";
import React from "react";

const ImageHero = () => {
  return (
    <div className="relative w-full h-fit pt-2 ">
      <Image
        src={heroImages}
        alt="dashboard"
        className="w-[86%] md:w-[600px] lg:w-[800px] h-auto mx-auto object-cover z-10"
      />
      <div className="w-full h-1/3 bg-primary absolute left-0 bottom-0 -z-10">
        <Image
          src={bgSectionWhite}
          alt="bg-section"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ImageHero;
