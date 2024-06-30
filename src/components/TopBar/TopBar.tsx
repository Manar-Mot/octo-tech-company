import { useTranslations } from "next-intl";
import React, { use } from "react";
import LocalSwitcher from "./LocalSwitcher";
import { getLocale } from "next-intl/server";
import AuthLinks from "./AuthLinks";

const TopBar = () => {
  const t = useTranslations("TopBar");
  const locale = use(getLocale());
  return (
    <div className=" w-full bg-secondary text-white px-4 lg:px-10  py-2 flex flex-row-reverse items-center gap-5 text-[12px] lg:text-[15px]">
      <LocalSwitcher locale={locale} />
      <AuthLinks LinkSignIn={t("signIn-btn")} LinkSignUp={t("signUp-btn")} />
    </div>
  );
};

export default TopBar;
