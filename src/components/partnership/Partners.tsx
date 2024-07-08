"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslations } from "next-intl";

import {
  acceptLogo,
  growthLogo,
  middleLogo,
  sarLogo,
  zaitunLogo,
} from "@/public/assets";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Image from "next/image";

interface PartnerSliderProps {
  locale: string;
}

const PartnerSlider: React.FC<PartnerSliderProps> = ({ locale }) => {
  const t = useTranslations("partnershipsSection");
  const partnerships = t.raw("partnerships") || [];
  const partnershipsList = [
    { id: 1, name: partnerships[0], logo: zaitunLogo },
    { id: 2, name: partnerships[1], logo: middleLogo },
    { id: 3, name: partnerships[2], logo: acceptLogo },
    { id: 4, name: partnerships[3], logo: sarLogo },
    { id: 5, name: partnerships[4], logo: growthLogo },
  ];
  const sliderRef = useRef<Slider>(null);

  const [canGoNext, setCanGoNext] = useState(true);
  const [canGoPrev, setCanGoPrev] = useState(false);

  const nextSlide = () => {
    if (sliderRef.current) {
      if (locale === "ar") {
        sliderRef.current.slickNext();
      } else {
        sliderRef.current.slickPrev();
      }
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      if (locale === "ar") {
        sliderRef.current.slickPrev();
      } else {
        sliderRef.current.slickNext();
      }
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    afterChange: (current: number) => {
      setCanGoPrev(current > 0);
      setCanGoNext(current < partnershipsList.length - 4);
    },
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

  useEffect(() => {
    if (sliderRef.current) {
      setCanGoNext(partnershipsList.length > 4);
      setCanGoPrev(false);
    }
  }, [partnershipsList.length]);

  return (
    <div
      className={`flex items-center justify-center  ${
        locale === "ar" ? "flex-row-reverse" : ""
      }`}
    >
      <button
        onClick={prevSlide}
        className={` text-[18px] md:text-[24px] z-10 ${
          locale === "ar" ? "rtl:rotate-180" : "ltr:rotate-180"
        } ${
          !canGoPrev
            ? "cursor-not-allowed text-slate-400"
            : "cursor-pointer text-slate-500"
        }`}
        disabled={!canGoPrev}
      >
        <HiChevronRight />
      </button>
      <Slider
        ref={sliderRef}
        {...sliderSettings}
        className="my-0 w-[90%] mx-auto"
      >
        {partnershipsList.map((partner) => (
          <div key={partner.id} className=" ">
            <Image
              src={partner.logo}
              alt={partner.name}
              className="w-32 md:w-36 lg:w-56 h-auto mx-auto"
            />
            <h4 className="text-title font-semibold text-[16px] md:text-[18px] lg:text-[22px] text-center mx-auto mt-3">
              {partner.name}
            </h4>
          </div>
        ))}
      </Slider>
      <button
        onClick={nextSlide}
        className={` text-[18px] md:text-[24px]  z-10 ${
          locale === "ar" ? "rtl:rotate-180" : "ltr:rotate-180"
        } ${
          !canGoNext
            ? "cursor-not-allowed text-slate-400"
            : "cursor-pointer text-slate-500"
        }`}
        disabled={!canGoNext}
      >
        <HiChevronLeft />
      </button>
    </div>
  );
};

export default PartnerSlider;
