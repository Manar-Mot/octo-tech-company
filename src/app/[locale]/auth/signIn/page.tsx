import { authImage, authRes } from "@/public/assets";
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
    <SectionContainer custom="min-h-screen ">
      <div className="relative w-full mx-auto rounded-md flex flex-col lg:flex-row items-center h-auto md:h-[750px] bg-black">
        <div className="relative w-full  lg:h-full flex-1">
          <Image
            src={authImage}
            alt="authImage"
            layout="fill"
            objectFit="cover"
            className="rtl:rounded-r-md ltr:rounded-l-md hidden lg:block"
          />
          <Image
            src={authRes}
            alt="authRes"
            className="rtl:rounded-r-md ltr:rounded-l-md block lg:hidden w-full"
          />
        </div>
        <div className="w-full h-auto md:h-full lg:w-[50%] bg-white p-8  rounded-b-md lg:rounded-none ltr:lg:rounded-r-md rtl:lg:rounded-l-md  shadow-md z-20 flex flex-col items-center justify-center">
          <TitleSection title={t("title")} />
          <SignInForm callbackUrl={callbackUrl || "/"} />
        </div>
      </div>
    </SectionContainer>
  );
};

export default SignInPage;
