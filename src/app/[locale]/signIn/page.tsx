import SignInForm from "@/src/components/auth/form/signin-form";
import SectionContainer from "@/src/components/sharedComponent/SectionContainer";
import TitleSection from "@/src/components/sharedComponent/TitleSection";
import { useTranslations } from "next-intl";

interface SignInPageProps {
  searchParams: {
    callbackUrl: string;
  };
}
const SignInPage = ({ searchParams: { callbackUrl } }: SignInPageProps) => {
 
  const t = useTranslations("SignIn");
  return (
    <SectionContainer custom=" bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)]">
      <div className="w-full md:w-[400px] mx-auto bg-white p-8 my-4 rounded-md shadow-md flex flex-col items-center gap-10">
        <TitleSection title={t("title")} />
        <SignInForm callbackUrl={callbackUrl || "/"} />
      </div>
    </SectionContainer>
  );
};

export default SignInPage;
