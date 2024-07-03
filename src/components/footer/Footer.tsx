"use client";
import React, { useState, useEffect } from "react";

import BottomBar from "../bottomBar/BottomBar";
import { usePathname } from "@/src/navigation";
import FooterContent from "./FooterContent";

const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes("auth")) {
    return <></>;
  }
  

  return (
    <>
      <FooterContent/>
      <BottomBar />
    </>
  );
};

export default Footer;
