import { authImage } from "@/public/assets";
import SignInForm from "@/src/components/auth/form/signin-form";
import SectionContainer from "@/src/components/sharedComponent/SectionContainer";
import TitleSection from "@/src/components/sharedComponent/TitleSection";
import { useTranslations } from "next-intl";
import Image from "next/image";
interface SignInPageProps {
  searchParams: {
    callbackUrl: string;
  };
}
const SignInPage = ({ searchParams: { callbackUrl } }: SignInPageProps) => {
  const t = useTranslations("SignIn");
  return (
    <SectionContainer custom="bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)]">
      <div className="relative w-[80%] mx-auto rounded-md flex flex-col md:flex-row items-center h-auto md:h-[580px] bg-black">
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
          <TitleSection title={t("title")} />
          <SignInForm callbackUrl={callbackUrl || "/"} />
        </div>
      </div>
    </SectionContainer>
  );
};

export default SignInPage;
