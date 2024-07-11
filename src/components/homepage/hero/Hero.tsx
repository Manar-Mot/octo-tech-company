"use client";
import React from "react";
import { useTranslations } from "use-intl";
import ImageHero from "./ImageHero";
import ButtonComp from "../../sharedComponent/ButtonComp";
import { bgHero } from "@/public/assets";
import Image from "next/image";
import { Link, useRouter } from "@/src/navigation";

const Hero = () => {
  const t = useTranslations("hero");
  const router = useRouter();
  const title = t("heroTitle");
  const wordsToColor = ["تقني", "Teknolojik", "Technological"];
  const splitTitle = title.split(
    new RegExp(`(${wordsToColor.join("|")})`, "g")
  );
  return (
    <div className=" relative">
      <div className="  relative     w-full  h-fit  pt-[60px]   bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)] ">
        <div className="relative px-8 lg:px-20">
          <div className="mx-auto w-fit flex flex-col items-center gap-3 justify-center   ">
            <div className="md:max-w-[700px] text-center  text-[28px] md:text-[36px] lg:text-[42px] text-title font-bold">
              {splitTitle.map((word, index) => (
                <span
                  key={index}
                  className={
                    wordsToColor.includes(word) ? "text-accent" : " text-title"
                  }
                >
                  {word}
                </span>
              ))}
            </div>
            <p className="mt-3  md:max-w-[700px]  lg:text-[28px] md:text-[22px] text-[20px] text-pargraph text-center">
              {t("heroDescription")}
            </p>
            <div className="flex items-center gap-2 justify-center flex-wrap">
              <ButtonComp
                content={t("contact-btn")}
                isPrimary={true}
                event={() => router.push("/contact-us")}
              />
              <Link
                href="https://wa.me/352681540864"
                passHref
                target="_blank"
                rel="noopener noreferrer"
                className={` text-[16px] lg:text-[18px]  py-[6px] px-3  rounded-md transition-all ease-linear duration-75 
                         bg-primary  text-accent border border-accent  hover:bg-accent hover:text-white
                `}
              >
                {t("consultation-btn")}
                {/* <ButtonComp
                  content={t("consultation-btn")}
                  isPrimary={false}
                /> */}
              </Link>
            </div>
          </div>

          <Image
            src={bgHero}
            alt="bg-hero"
            className="w-full h-auto object-cover  absolute lg:-top-56 md:-top-20 -top-14 left-0 -z-20 opacity-80 "
          />
        </div>
        {/* <div className="w-full bg-black h-60"> */}
        {/* </div> */}
        <ImageHero />
      </div>
    </div>
  );
};

export default Hero;
