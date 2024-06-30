"use client"
import React, { useState, useEffect } from "react";
import SectionContainer from "../sharedComponent/SectionContainer";
import Image from "next/image";
import { AppLogoWhite } from "@/public/assets";
import { useTranslations } from "next-intl";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import { HiChevronUp } from "react-icons/hi2";
import { motion } from "framer-motion";

const Footer = () => {
  const t = useTranslations("footerSection");

  // State to track whether to show the scroll-to-top button
  const [showScroll, setShowScroll] = useState(false);

  // Function to handle scrolling to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Effect to show/hide the scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SectionContainer custom="bg-secondary py-20 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-0 text-[#E0E0E3] py-10">
        <div className="flex flex-col gap-6 items-center lg:items-start md:col-span-2">
          <Image src={AppLogoWhite} alt="logo" className="w-[150px] h-auto" />
          <p className="text-[18px] md:max-w-[92%] lg:max-w-[500px] text-center lg:text-start ">
            {t("description")}
          </p>
        </div>
        <div className="flex justify-center">
          <ul className="flex flex-col gap-4 items-center lg:items-start ">
            <h5 className="font-bold text-white mb-4 relative">
              {t("quickLinks.title")}
              <span className="block h-[1.2px] bg-accent absolute -bottom-2 left-0 right-0"></span>
            </h5>
            <Link
              href="/"
              className="transition-all ease-linear duration-75 hover:text-[#ccd1f8]"
            >
              {t("quickLinks.links.homePage")}
            </Link>
            <Link
              href="/"
              className="transition-all ease-linear duration-75 hover:text-[#ccd1f8]"
            >
              {t("quickLinks.links.contactUs")}
            </Link>
            <Link
              href="/"
              className="transition-all ease-linear duration-75 hover:text-[#ccd1f8]"
            >
              {t("quickLinks.links.testimonials")}
            </Link>
            <Link
              href="/"
              className="transition-all ease-linear duration-75 hover:text-[#ccd1f8]"
            >
              {t("quickLinks.links.services")}
            </Link>
            <Link
              href="/"
              className="transition-all ease-linear duration-75 hover:text-[#ccd1f8]"
            >
              {t("quickLinks.links.aboutUs")}
            </Link>
          </ul>
        </div>
        <div className="flex flex-col items-center lg:items-start lg:col-span-2  ">
          <h5 className=" font-bold relative text-white mb-4">
            {t("followUs")}
            <span className="block h-[1.2px] bg-accent absolute -bottom-1 left-0 right-0"></span>
          </h5>
          <div className="flex text-[30px] items-center gap-2 text-white">
            <Link href="/">
              <FaFacebook className=" transition-all ease-linear duration-75 hover:text-[#ccd1f8] cursor-pointer" />
            </Link>
            <Link href="/">
              <FaTelegram className=" transition-all ease-linear duration-75 hover:text-[#ccd1f8] cursor-pointer" />
            </Link>
            <Link href="/">
              <FaInstagram className=" transition-all ease-linear duration-75 hover:text-[#ccd1f8] cursor-pointer" />
            </Link>
            <Link href="/">
              <FaLinkedin className=" transition-all ease-linear duration-75 hover:text-[#ccd1f8] cursor-pointer" />
            </Link>
            <Link href="/">
              <FaYoutube className=" transition-all ease-linear duration-75 hover:text-[#ccd1f8] cursor-pointer" />
            </Link>
            <Link href="/">
              <FaTwitter className=" transition-all ease-linear duration-75 hover:text-[#ccd1f8] cursor-pointer" />
            </Link>
            <Link href="/">
              <FaWhatsapp className=" transition-all ease-linear duration-75 hover:text-[#ccd1f8] cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
      {showScroll && (
        <motion.div
          className="fixed bottom-14 right-10 p-2 bg-accent text-[20px] text-white w-fit rounded-md cursor-pointer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
        >
          <HiChevronUp />
        </motion.div>
      )}
    </SectionContainer>
  );
};

export default Footer;
