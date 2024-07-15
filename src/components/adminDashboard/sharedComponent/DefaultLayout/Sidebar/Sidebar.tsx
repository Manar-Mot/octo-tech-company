"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import ClickOutside from "./ClickOutside";
import useLocalStorage from "@/src/hooks/useLocalStorage";
import { AppLogoWhite } from "@/public/assets";
import { HiChevronRight } from "react-icons/hi2";
import { menuGroups } from "@/src/utils/admin/sidebarNavItems";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}



const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed lg:sticky right-0  text-[16px] top-0 text-white z-[9999] flex h-screen w-[250px] flex-col overflow-y-hidden bg-gradient-to-b from-title  to-secondary duration-300 ease-linear lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0  " : "translate-x-full  "
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="relative flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image
              src={AppLogoWhite}
              alt="Logo"
              priority
              className="w-28 h-auto mt-10"
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="  block  lg:hidden font-bold rounded-full"
          >
            <HiChevronRight  size={18} className="cursor-pointer  " />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold ">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
