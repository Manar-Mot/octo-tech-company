"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslations } from "next-intl";
import SectionContainer from "../../sharedComponent/SectionContainer";
import TitleSection from "../../sharedComponent/TitleSection";
import { Link } from "@/src/navigation";
import PartnerSlider from "../../partnership/Partners";
interface PartnershipsSectionProps {
  locale: string;
}
const PartnershipsSection: React.FC<PartnershipsSectionProps> = ({
  locale,
}) => {
  const t = useTranslations("partnershipsSection");

  return (
    <SectionContainer custom="bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)] overflow-hidden">
      <TitleSection title={t("title")} />
      <PartnerSlider locale={locale} />
      <Link href="/partnerships" className="text-secondary underline">
        {t("link")}
      </Link>
    </SectionContainer>
  );
};

export default PartnershipsSection;
