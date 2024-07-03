"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/src/navigation";
import axios from "axios";
import Content from "./Content";
import { confirmImage } from "@/public/assets";
import Image from "next/image";
import SectionContainer from "../../sharedComponent/SectionContainer";
import TitleSection from "../../sharedComponent/TitleSection";
import Modal from "./Modal";
import { useUser } from "@/src/hooks/useUser";

const VerifyPage = () => {
  const router = useRouter();
  const {user} =useUser()
  const [showResendLink, setShowResendLink] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModel = () => {
    setOpenModal(!openModal);
  };
  const [verificationCodes, setVerificationCodes] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const token = useSearchParams().get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      try {
        const res = await axios.post(`/api/auth/confirm`, { token });
        if (res.status === 200) {
          router.push("/auth/signIn");
        } else if (res.status === 400) {
          setShowResendLink(true);
        } else {
          console.error("Error verifying token:", res.statusText);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    verifyToken();
  }, [router]);

  const handleResendVerification = async () => {
    if (!token) return;

    try {
      const res = await axios.post(`/api/auth/resend-verification`, { token });
      if (res.status === 200) {
        console.log("تم إعادة إرسال رابط التحقق بنجاح");
      } else {
        console.error("Error resending verification link:", res.statusText);
        alert(
          "حدث خطأ أثناء إعادة إرسال رابط التحقق. الرجاء المحاولة مرة أخرى لاحقًا."
        );
      }
    } catch (error) {
      console.error("Error resending verification link:", error);
      alert(
        "حدث خطأ أثناء إعادة إرسال رابط التحقق. الرجاء المحاولة مرة أخرى لاحقًا."
      );
    }
    handleOpenModel()
  };

  const handleVerifyCode = async () => {
    try {
      const res = await axios.post(`/api/auth/verify-code`, {
        email:user?.email,
        otp: verificationCodes.join(""),
      });
      if (res.status === 200) {
        console.log("تم التحقق بنجاح");
        router.push("/auth/signIn");
      } else {
        console.error("Error verifying code:", res.statusText);
        alert(
          "الرمز غير صحيح. الرجاء التحقق من صحة الرمز المدخل والمحاولة مرة أخرى."
        );
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("حدث خطأ أثناء التحقق من الرمز. الرجاء المحاولة مرة أخرى لاحقًا.");
    }
  };

  const handleChangeVerificationCode = (index: number, value: any) => {
    const newVerificationCodes = [...verificationCodes];
    newVerificationCodes[index] = value;
    setVerificationCodes(newVerificationCodes);
  };

  return (
    <SectionContainer custom=" ">
      <div className="w-[90%] p-10 bg-white mx-auto rounded-md shadow-md ">
        <TitleSection title="تأكيد الحساب" />
        <div className="flex flex-col-reverse  lg:flex-row gap-14 items-center">
          <Content
            handleChangeVerificationCode={handleChangeVerificationCode}
            handleResendVerification={handleResendVerification}
            handleVerifyCode={handleVerifyCode}
            showResendLink={showResendLink}
            verificationCodes={verificationCodes}
            handleOpenModal={handleOpenModel}
          />
          <Image src={confirmImage} alt="confirm  " className=" w-[200px] h-auto md:w-auto transform ltr:scale-x-[-1] mt-10 lg:mt-0" />
        </div>
      </div>
      <Modal handleOpen={handleOpenModel} open={openModal}>
       <div className="flex flex-col items-center gap-10">
        <p className="text-pargraph ">
          لم تتلق أيه رسالة على بريدك الإلكتروني أو صلاحية الرابط منتهية يمكنك
          إعادة إرسال طلب تحقق من هنا
        </p>
        <button
          className="bg-accent text-white py-2 px-4 text-[16px] rounded cursor-pointer mb-2
         transition-all ease-linear duration-75 hover:bg-secondary mx-auto"
          onClick={handleResendVerification}
        >
          تأكيد إعادة إرسال رابط التحقق 
        </button>
        </div> 
      </Modal>
    </SectionContainer>
  );
};

export default VerifyPage;
