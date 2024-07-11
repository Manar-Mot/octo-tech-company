import { useTranslations } from "next-intl";
import React from "react";
import LocalSwitcher from "./LocalSwitcher";
import { usePathname } from "@/src/navigation";

const TopBar = ({ locale }: { locale: string }) => {
  const path = usePathname();

  return (
    <div
      className={`w-full bg-title text-white px-4 lg:px-10  py-2 flex flex-row-reverse items-center gap-5 text-[14px] lg:text-[16px] ${
        path.includes("auth") ? "border-b border-slate-300" : ""
      }`}
    >
      <LocalSwitcher locale={locale} />

    </div>
  );
};

export default TopBar;
