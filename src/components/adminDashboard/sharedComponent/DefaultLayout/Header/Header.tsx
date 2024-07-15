import Link from "next/link";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { AppLogo } from "@/public/assets";
import { FiSearch } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";

interface HeaderProps {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-[999] flex  bg-white shadow-sm w-auto">
      <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle Button */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden"
          >
            <HiMenuAlt3 className="text-title h-5.5 w-5.5" />
          </button>

          <Link className="block flex-shrink-0 lg:hidden" href="/admin">
            <Image
            className="w-14 h-auto"
              src={AppLogo}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="flex items-center gap-2 w-[300px]">
              <button className="text-slate-400 ">
                <FiSearch className="fill-body hover:fill-primary" size={20} />
              </button>
              <input
                type="text"
                placeholder=" ابحث.."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownNotification />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
