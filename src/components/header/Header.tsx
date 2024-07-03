"use client"
import React from "react";
import TopBar from "./TopBar/TopBar";
import NavBar from "./NavBar/NavBar";
import { usePathname } from "@/src/navigation";

const Header = ({ locale }: { locale: string }) => {
  const pathname = usePathname();

  if (pathname.includes("auth")) {
    return <></>;
  }
  return (
    <div className="sticky top-0 left-0 z-[999]">
      <TopBar locale={locale}/>
      <NavBar locale={locale} />
    </div>
  );
};

export default Header;
