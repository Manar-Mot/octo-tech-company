"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslations } from "next-intl";
import SectionContainer from "../../sharedComponent/SectionContainer";
import TitleSection from "../../sharedComponent/TitleSection";
import { acceptLogo, middleLogo, sarLogo, zaitunLogo } from "@/public/assets";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Image from "next/image";
import { Link } from "@/src/navigation";

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

const PartnershipsSection: React.FC = () => {
  const t = useTranslations("partnershipsSection");
  const partnerships = t.raw("partnerships");
  const partnershipsList = [
    { id: 1, name: partnerships[0], logo: zaitunLogo },
    { id: 2, name: partnerships[1], logo: middleLogo },
    { id: 3, name: partnerships[2], logo: acceptLogo },
    { id: 4, name: partnerships[3], logo: sarLogo },
  ];
  const sliderRef = useRef<Slider>(null);

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <SectionContainer
      custom="
        bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)] overflow-hidden
      "
    >
      <TitleSection title={t("title")} />
      <div className="flex items-center  justify-center ">
        <button
          onClick={prevSlide}
          className=" text-[24px] text-slate-400  z-10 ltr:rotate-180"
        >
          <HiChevronRight />
        </button>
        <Slider
          ref={sliderRef}
          {...sliderSettings}
          className="my-10  w-[90%] mx-auto "
        >
          {partnershipsList.map((partner) => (
            <div key={partner.id} className=" ">
              <div className="flex flex-col items-center justify-center gap-3">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  className=" w-32 md:w-36 lg:w-48 h-auto"
                />
                <h4 className="text-title font-semibold text-[16px] lg:text-[18px] text-center">
                  {partner.name}
                </h4>
              </div>
            </div>
          ))}
        </Slider>
        <button
          onClick={nextSlide}
          className=" text-[24px]   text-slate-400  z-10 ltr:rotate-180"
        >
          <HiChevronLeft />
        </button>
      </div>
      <Link href="/partnerships" className="text-secondary underline">
        {t("link")}
      </Link>
    </SectionContainer>
  );
};

export default PartnershipsSection;
