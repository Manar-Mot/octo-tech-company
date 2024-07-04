"use client"
import React from "react";
import TopBar from "./TopBar/TopBar";
import NavBar from "./NavBar/NavBar";


const Header = ({ locale }: { locale: string }) => {

  
  return (
    <div className="sticky top-0 left-0 z-[999]">
      <TopBar locale={locale}/>
      <NavBar locale={locale} />
    </div>
  );
};

export default Header;
