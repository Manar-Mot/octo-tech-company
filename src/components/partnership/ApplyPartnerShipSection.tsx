"use client";
import React from "react";
import Image from "next/image";
import { applyPartnership, applyRes, bgSectionWhite } from "@/public/assets";
import ButtonComp from "../sharedComponent/ButtonComp";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/navigation";
import SectionContainer from "../sharedComponent/SectionContainer";
const ApplyPartnerShipSection = () => {
  const t = useTranslations("partnershipSection.partnerHero");
  const router = useRouter();
  const title = "هل أنت جاهز للشراكة معنا؟";
  const wordsToColor = ["آفاق جديدة", "Yeni Yüksekliklere", "New Heights"];
  const splitTitle = title.split(
    new RegExp(`(${wordsToColor.join("|")})`, "g")
  );

  const handleButtonClick = () => {
    router.push("/partnerships/apply");
  };
  return (
    <SectionContainer custom="flex flex-col lg:flex-row items-center  justify-center lg:justify-between  ">
      <Image
        src={bgSectionWhite}
        alt="bg-section-white"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />
      <Image src={applyRes} alt="apply partnership " className="w-full h-auto block lg:hidden  mb-14" />
<div className="flex flex-col items-center lg:items-start">
        <div className="ltr:md:max-w-[420px] rtl:md:max-w-[480px] text-center md:text-start text-[22px] md:text-[24px] lg:text-[28px] text-title font-bold">
          {splitTitle.map((word, index) => (
            <span
              key={index}
              className={
                wordsToColor.includes(word) ? "text-accent" : "text-title"
              }
            >
              {word}
            </span>
          ))}
        </div>
        <p className="mt-3 md:max-w-[520px] lg:text-[20px] md:text-[18px] text-[16px] text-pargraph text-center md:text-start">
          إذا كنت ترغب في الانضمام إلى شبكة شركائنا المميزين والاستفادة من فرص
          التعاون المميزة، ندعوك لتقديم طلب الشراكة
        </p>
        <div className="mt-4">
          <ButtonComp
            content="تقديم طلب شراكة"
            event={handleButtonClick}
            isPrimary
          />
        </div>
      </div>
      <Image src={applyPartnership} alt="apply partnership " className="hidden lg:block" />
    </SectionContainer>
  );
};

export default ApplyPartnerShipSection;
