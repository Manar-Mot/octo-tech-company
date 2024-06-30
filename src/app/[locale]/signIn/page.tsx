import SignInForm from "@/src/components/auth/form/signin-form";
import SectionContainer from "@/src/components/sharedComponent/SectionContainer";
import TitleSection from "@/src/components/sharedComponent/TitleSection";

interface SignInPageProps {
  searchParams: {
    callbackUrl: string;
  };
}
const SignInPage = ({ searchParams: { callbackUrl } }: SignInPageProps) => {
  // console.log(callbackUrl)
  return (
    <SectionContainer custom=" bg-gradient-to-b backdrop-blur-3xl from-[rgba(221,224,248,0.4)] to-[rgba(138,150,238,0.4)]">
      <div className="w-full md:w-[400px] mx-auto bg-white p-8 my-4 rounded-md shadow-md">
      <TitleSection title="sign in" />
        <SignInForm callbackUrl={callbackUrl || "/"} />
      </div>
    </SectionContainer>
  );
};

export default SignInPage;
