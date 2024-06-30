import SignUpForm from "@/src/components/auth/form/signup-form";
import SectionContainer from "@/src/components/sharedComponent/SectionContainer";
import TitleSection from "@/src/components/sharedComponent/TitleSection";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import { use } from "react";

interface SignUpPageProps {
  searchParams: {
    callbackUrl: string;
  };
}

const SignUpPage = ({ searchParams: { callbackUrl } }: SignUpPageProps) => {
  const t = useTranslations("signUpPage");
  const locale = use(getLocale());
  return (
    <SectionContainer custom=" bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)]">
      <div className="w-full md:w-[400px] mx-auto bg-white p-8 my-4 rounded-md shadow-md">
        <TitleSection title={t("signUp")} />
        <SignUpForm locale={locale} />
      </div>
    </SectionContainer>
  );
};

export default SignUpPage;
