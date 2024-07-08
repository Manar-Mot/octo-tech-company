import React from "react";
import SectionContainer from "../sharedComponent/SectionContainer";
import { useTranslations } from "next-intl";
import TitleSection from "../sharedComponent/TitleSection";
import Image from "next/image";
import { bgSectionWhite } from "@/public/assets";
import PartnerSlider from "./Partners";
import { getLocale } from "next-intl/server";
const OurParteners =  ({locale}:{locale:string}) => {

  const t = useTranslations("partnershipSection.partnerHero");
  const title = " شركاؤنا المميزون ";
  const wordsToColor = ["المميزون"];
  const splitTitle = title.split(
    new RegExp(`(${wordsToColor.join("|")})`, "g")
  );

  return (
    <SectionContainer custom="bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)]">
      <Image
        src={bgSectionWhite}
        alt="bg-section-white"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />
      <TitleSection title={title} wordsToColor={wordsToColor} />
      <p className="mt-8 md:max-w-[80%] lg:text-[20px] md:text-[18px] text-[16px] text-pargraph text-center mx-auto ">
        نحن نفتخر بالتعاون مع مجموعة متميزة من الشركاء الذين يساهمون في تقديم
        أفضل الحلول والخدمات
      </p>
      <PartnerSlider locale={locale} />
    </SectionContainer>
  );
};

export default OurParteners;
