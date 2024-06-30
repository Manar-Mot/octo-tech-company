"use client";
import { useTranslations } from "next-intl";
import SectionContainer from "@/src/components/sharedComponent/SectionContainer";
import Image from "next/image";
import { contactHeroImage } from "@/public/assets";

const ContactHero = () => {
  const t = useTranslations("contact");
  return (
    <SectionContainer custom=" bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)]">
      <div className="flex flex-col lg:flex-row items-center gap-10  w-full justify-between text-center lg:text-justify">
        <div>
          <h4 className="text-[28px] lg:text-[36px] text-title font-semibold">
            {t("question")}
          </h4>
          <p className="text-[18px] lg:text-[20px] text-slate-500 mt-4 max-w-[500px]  mb-4">
            {t("description")}
          </p>
        </div>
        <Image
          src={contactHeroImage}
          alt="contactHeroImage"
          className="w-full lg:w-[570px] h-auto object-cover"
        />
      </div>
    </SectionContainer>
  );
};
export default ContactHero;
