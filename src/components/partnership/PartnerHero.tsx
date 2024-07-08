"use client";
import React from "react";
import Image from "next/image";
import { partnerHero } from "@/public/assets";
import SectionContainer from "../sharedComponent/SectionContainer";
import ButtonComp from "../sharedComponent/ButtonComp";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/navigation";

const PartnerHero = () => {
  const t = useTranslations("partnershipSection.partnerHero");
  const router = useRouter();
  const title = t("title");
  const wordsToColor = ["آفاق جديدة", "Yeni Yüksekliklere", "New Heights"];
  const splitTitle = title.split(
    new RegExp(`(${wordsToColor.join("|")})`, "g")
  );

  const handleButtonClick = () => {
    router.push("/partnerships/apply");
  };

  return (
    <SectionContainer custom=" md:!py-28  gap-20 flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)]">
      <div className="flex flex-col items-center md:items-start">
        <div className="ltr:md:max-w-[420px] rtl:md:max-w-[480px] text-center md:text-start text-[24px] md:text-[28px] lg:text-[36px] text-title font-bold">
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
          {t("description")}
        </p>
        <div className="mt-4">
          <ButtonComp
            content={t("buttonText")}
            event={handleButtonClick}
            isPrimary
          />
        </div>
      </div>
      <div>
        <Image src={partnerHero} alt="partner hero " />
      </div>
    </SectionContainer>
  );
};

export default PartnerHero;
