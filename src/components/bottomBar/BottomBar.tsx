import { useTranslations } from "next-intl";
import React from "react";

const BottomBar = () => {
  const t = useTranslations("bottomBar");
  return (
    <div className="border-t-[0.1px] border-[#767677] w-full text-center text-[#E0E0E3] text-[12px] lg:text-[14px] bg-secondary py-2">
      {t("title")}
    </div>
  );
};

export default BottomBar;
