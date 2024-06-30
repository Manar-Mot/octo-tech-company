"use client";
import { useTranslations } from "next-intl";
import React from "react";
import TitleSection from "../../sharedComponent/TitleSection";
import SectionContainer from "../../sharedComponent/SectionContainer";
import Image from "next/image";
import { bgSectionWhite, quotationMarks } from "@/public/assets";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  testimonial: string;
}

const Testimonials = () => {
  const t = useTranslations("testimonials");
  const testimonials: Testimonial[] = t.raw("userTestimonial");

  return (
    <SectionContainer>
      <Image
        src={bgSectionWhite}
        alt="bg-section-white"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />
      <TitleSection title={t("title")} />
      <div className="mx-auto relative bg-white w-[100%] lg:w-[80%] p-8 rounded-md shadow-md pt-14 mt-20">
        <div className="w-[60px] h-[60px] absolute -top-8 left-[calc(50%-30px)] bg-accent rounded-full  flex items-center justify-center ">
          <Image
            src={quotationMarks}
            alt="quotationMarks"
            className="w-8 h-auto"
          />
        </div>
        {/* {testimonials.map((testimonial, index) => ( */}
          <motion.div
            // key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3 * 0.3 }}
            className="mb-8 text-[20px] lg:text-[24px]"
          >
            <p className="text-pargraph text-center">{testimonials[0].testimonial}</p>
            <h3 className="text-title font-semibold text-center mt-8">{testimonials[0].name}</h3>
          </motion.div>
        {/* ))} */}
      </div>
    </SectionContainer>
  );
};

export default Testimonials;
