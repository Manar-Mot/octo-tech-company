import SignUpForm from "@/src/components/auth/form/signup-form";
import SectionContainer from "@/src/components/sharedComponent/SectionContainer";
import TitleSection from "@/src/components/sharedComponent/TitleSection";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import { use } from "react";
import Image from "next/image";
import { authImage } from "@/public/assets";

interface SignUpPageProps {
  searchParams: {
    callbackUrl: string;
  };
}

const SignUpPage = ({ searchParams: { callbackUrl } }: SignUpPageProps) => {
  const t = useTranslations("signUpPage");
  const locale = use(getLocale());

  return (
    <SectionContainer custom="bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)]">
      <div className="relative w-[100%] mx-auto rounded-md flex flex-col md:flex-row items-center h-auto md:h-[750px] bg-black">
        <div className="relative w-full h-64 md:h-full flex-1">
          <Image
            src={authImage}
            alt="authImage"
            layout="fill"
            objectFit="cover"
            className="rtl:rounded-r-md ltr:rounded-l-md"
          />
        </div>
        <div className="w-full h-auto md:h-full md:w-[50%] bg-white p-8 ltr:rounded-r-md rtl:rounded-l-md shadow-md z-20 flex flex-col items-center justify-center">
          <TitleSection title={t("signUp")} />
          <SignUpForm locale={locale} />
        </div>
      </div>
    </SectionContainer>
  );
};

export default SignUpPage;
