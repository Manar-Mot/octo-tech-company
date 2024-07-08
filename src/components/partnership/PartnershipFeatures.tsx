import React from "react";
import SectionContainer from "../sharedComponent/SectionContainer";
import TitleSection from "../sharedComponent/TitleSection";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  bgSectionWhite,
  credIcon,
  growthIcon,
  octoPartner,
  octoPartnerRes,
  techIcon,
  trainingIcon,
} from "@/public/assets";

const PartnershipFeatures = () => {
  const t = useTranslations("partnershipSection.partnershipFeatures");
  const title =t('title');
  const wordsToColor = ["OCTO TECH", "؟"];
  const splitTitle = title.split(
    new RegExp(`(${wordsToColor.join("|")})`, "g")
  );

  return (
    <SectionContainer>
      <Image
        src={bgSectionWhite}
        alt="bg-section-white"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />
      <TitleSection title={t('title')} wordsToColor={wordsToColor} />
      <p className="mt-6 md:max-w-[80%] lg:text-[20px] md:text-[18px] text-[16px] text-pargraph text-center mx-auto ">
        {t('description')}
      </p>
      <div className="w-full flex flex-col items-center justify-center mt-12 ">
        <div className=" w-full flex flex-col md:flex-row gap-10  items-center justify-between  ">
          <div className="bg-white rounded-md p-6 shadow-md w-full md:w-[430px] h-[150px] md:h-[170px] lg:h-[150px]">
            <div className="flex items-center gap-2 ">
              <Image src={techIcon} alt="Advanced technologies features icon" />
              <h4 className=" text=[18px] md:text-[20px] text-title lg:text-[22px] font-bold">
                {t('features.tech.title')}
              </h4>
            </div>
            <p className=" text=[16px] md:text-[18px] text-title mt-2 max-w-[400px]">
              {t('features.tech.description')}
            </p>
          </div>
          <div className="bg-white rounded-md p-6 shadow-md w-full md:w-[430px] h-[150px] md:h-[170px] lg:h-[150px]">
            <div className="flex items-center gap-2 ">
              <Image
                src={growthIcon}
                alt="Growth icon"
              />
              <h4 className=" text=[18px] md:text-[20px] text-title lg:text-[22px] font-bold">
                {t('features.growth.title')}
              </h4>
            </div>
            <p className=" text=[16px] md:text-[18px] text-title mt-2 max-w-[400px]">
              {t('features.growth.description')}
            </p>
          </div>
        </div>
        <div className="my-4 lg:my-0">
          <Image src={octoPartner} alt="partnerships features section image " className="hidden w-full h-auto md:block" />
          <Image src={octoPartnerRes} alt="partner hero  " className="block w-full h-auto md:hidden" />
        </div>
        <div className=" w-full flex flex-col md:flex-row gap-10  items-center justify-between mb-4  ">
          <div className="bg-white rounded-md p-6 shadow-md w-full md:w-[430px] h-[150px] md:h-[170px] lg:h-[150px]">
            <div className="flex items-center gap-2 ">
              <Image src={credIcon} alt="Credibility icon" />
              <h4 className=" text=[18px] md:text-[20px] text-title lg:text-[22px] font-bold">
                {t('features.credibility.title')}
              </h4>
            </div>
            <p className=" text=[16px] md:text-[18px] text-title mt-2 max-w-[400px]">
              {t('features.credibility.description')}
            </p>
          </div>
          <div className="bg-white rounded-md p-6 shadow-md w-full md:w-[430px] h-[150px] md:h-[170px] lg:h-[150px]">
            <div className="flex items-center gap-2 ">
              <Image
                src={trainingIcon}
                alt="Training icon"
              />
              <h4 className=" text=[18px] md:text-[20px] text-title lg:text-[22px] font-bold">
                {t('features.training.title')}
              </h4>
            </div>
            <p className=" text-[16px] md:text-[18px] text-title mt-2 max-w-[400px]">
              {t('features.training.description')}
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default PartnershipFeatures;
