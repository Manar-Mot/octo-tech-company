import React from "react";

import { useTranslations } from "next-intl";

import {
  bgSectionWhite,
  f1,
  f1Icon,
  f2,
  f2Icon,
  f3,
  f3Icon,
} from "@/public/assets";
import Image from "next/image";
import SectionContainer from "../../sharedComponent/SectionContainer";
import TitleSection from "../../sharedComponent/TitleSection";
import Transition from "../../sharedComponent/Transition";


const FeaturesSection = () => {
  const t = useTranslations("featuresSection");
  const title = t("title");
  const wordsToColor = [
    "الإبتكار",
    "التطور",
    "Innovation",
    "Development",
    "Yeniliği",
    "Gelişimi",
  ];
  const features = [
    {
      title: t("modernTech.title"),
      description: t("modernTech.description"),
      icon: f1Icon,
      imageF: f1,
    },
    {
      title: t("development.title"),
      description: t("development.description"),
      icon: f2Icon,
      imageF: f2,
    },
    {
      title: t("clientsAndPartnerships.title"),
      description: t("clientsAndPartnerships.description"),
      icon: f3Icon,
      imageF: f3,
    },
  ];

  return (
    <SectionContainer>
      <Image
        src={bgSectionWhite}
        alt="bg-section-white"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />
      <TitleSection title={title} wordsToColor={wordsToColor} />

      <div className="mt-20">
        {features.map((f, index) => (
          <Transition key={index}  delay={index * 0.5}>
            <div
              key={index}
              className={`flex flex-col gap-10 w-full items-center justify-between my-6 ${
                index % 2 == 0 ? "md:flex-row " : "md:flex-row-reverse"
              }`}
            >
              <div>
                <div className="flex items-center gap-3 ">
                  <div className=" bg-accent w-8 h-8 md:w-12 md:h-12 grid place-items-center rounded-full">
                    <Image
                      src={f.icon}
                      alt={`icon feature  ${index}`}
                      className="w-4 md:w-6  h-auto text-accent"
                    />
                  </div>
                  <h3 className="text-[20px] md:text-[24px] lg:text-[28px] text-secondary font-semibold">
                    {f.title}
                  </h3>
                </div>
                <p className=" text-[16px] lg:text-[20px] text-pargraph max-w-[600px] mt-3">
                  {f.description}
                </p>
              </div>
              <Image
                src={f.imageF}
                alt={`feature ${index} `}
                className="object-cover rounded-md md:w-[400px] md:h-[300px]  lg:w-[600px] lg:h-[400px] shadow-md"
              />
            </div>
          </Transition>
        ))}
      </div>
    </SectionContainer>
  );
};

export default FeaturesSection;
