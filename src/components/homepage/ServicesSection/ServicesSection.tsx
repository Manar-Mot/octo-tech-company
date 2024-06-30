"use client";
import React, { useEffect, useRef } from "react";
import SectionContainer from "../../sharedComponent/SectionContainer";
import ServiceCard from "./ServiceCard";
import TitleSection from "../../sharedComponent/TitleSection";
import { useTranslations } from "next-intl";
import {
  controllerProgrammingServiceIcon,
  graphicDesignServiceIcon,
  interiorDesignServiceIcon,
  marketingServiceIcon,
  mobileAppServiceIcon,
  translateServiceIcon,
  videoEditingAerviceIcon,
  webServiceIcon,
} from "@/public/assets";
import { motion } from "framer-motion";

const ServicesSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const t = useTranslations("servicesSection");

  const servicesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (servicesRef.current) {
        const topPos = servicesRef.current.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        if (topPos <= screenHeight * 0.75) {
          console.log("Services section is in view!");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    [
      {
        title: t("service1.title"),
        description: t("service1.description"),
        icon: webServiceIcon,
      },
      {
        title: t("service2.title"),
        description: t("service2.description"),
        icon: mobileAppServiceIcon,
      },
      {
        title: t("service3.title"),
        description: t("service3.description"),
        icon: graphicDesignServiceIcon,
      },
      {
        title: t("service8.title"),
        description: t("service8.description"),
        icon: interiorDesignServiceIcon,
      },
    ],
    [
      {
        title: t("service4.title"),
        description: t("service4.description"),
        icon: videoEditingAerviceIcon,
      },
      {
        title: t("service5.title"),
        description: t("service5.description"),
        icon: translateServiceIcon,
      },
      {
        title: t("service6.title"),
        description: t("service6.description"),
        icon: marketingServiceIcon,
      },
      {
        title: t("service7.title"),
        description: t("service7.description"),
        icon: controllerProgrammingServiceIcon,
      },
    ],
  ];

  return (
    <SectionContainer
      ref={ref}
      custom="
        bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)] 
      "
      {...props}
    >
      <TitleSection title={t("title")} />
      <p className="lg:text-[24px] md:text-[20px] text-[18px] text-pargraph text-center mt-8">
        {t("description")}
      </p>
      <motion.div
        className="grid grid-cols-1 gap-10 lg:gap-28 py-10 lg:py-20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-between gap-10">
          {services[0].map((service, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: (index+1)*0.5 }}
            key={index}

            >
              <ServiceCard
                key={index}
                title={service.title}
                iconUrl={service.icon}
                description={service.description}
                index={index}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-stretch gap-10">
          {services[1].map((service, index: number) => (
            <motion.div
            key={index}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ServiceCard
                key={index}
                title={service.title}
                iconUrl={service.icon}
                description={service.description}
                index={index + 1}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
});

export default ServicesSection;
