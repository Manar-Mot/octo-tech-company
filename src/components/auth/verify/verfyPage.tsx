"use client"
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import SectionContainer from "../../sharedComponent/SectionContainer";
import TitleSection from "../../sharedComponent/TitleSection";
import Modal from "./Modal";
import { useUser } from "@/src/hooks/useUser";
import { confirmImage } from "@/public/assets";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import Content from "./Content";
import { useRouter } from "@/src/navigation";

const VerifyPage = () => {
  const router = useRouter();
  const tMessage = useTranslations("messages");
  const t = useTranslations("verifyPage");
  const { user, handleVerifyCode, verifyToken, isAccountConfirmed } = useUser();
  const [showResendLink, setShowResendLink] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [verificationCodes, setVerificationCodes] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  useEffect(() => {
    if (user?.confirmed) {
      router.push("/auth/signIn");
    }
  }, [user?.confirmed, router]);

  useEffect(() => {
    if (isAccountConfirmed) {
      router.push("/auth/signIn");
    }
  }, [router, isAccountConfirmed]);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleResendVerification = useCallback(async () => {
    try {
      const res = await axios.post("/api/auth/resend-verification", {
        email: user?.email,
        locale: "ar",
      });
      if (res.status === 200) {
        toast.success(tMessage(res.data.messageKey));
        setShowResendLink(false);
        setTimeout(() => setShowResendLink(true), 600000);
      } else {
        toast.error(res.data.messageKey || tMessage("ResendVerificationError"));
      }
    } catch (error) {
      console.error("Error resending verification link:", error);
      toast.error(tMessage("ResendVerificationError"));
    } finally {
      handleOpenModal();
    }
  }, [handleOpenModal, setShowResendLink, toast, tMessage, user?.email]);

  const handleChangeVerificationCode = (index: number, value: string) => {
    const newVerificationCodes = [...verificationCodes];
    newVerificationCodes[index] = value;
    setVerificationCodes(newVerificationCodes);
  };

  return (
    <SectionContainer custom=" ">
      <div className="w-full lg:w-[90%] p-10 bg-white mx-auto rounded-md shadow-md ">
        <TitleSection title={t("ConfirmAccountTitle")} />
        <div className="flex flex-col-reverse lg:flex-row gap-14 items-center">
          <Content
            handleChangeVerificationCode={handleChangeVerificationCode}
            handleVerifyCode={handleVerifyCode}
            showResendLink={showResendLink}
            verificationCodes={verificationCodes}
            handleOpenModal={handleOpenModal}
          />
          <Image
            src={confirmImage}
            alt="confirm "
            className="w-[200px] h-auto md:w-auto transform ltr:scale-x-[-1] mt-10 lg:mt-0"
          />
        </div>
      </div>
      <Modal handleOpen={handleOpenModal} open={openModal}>
        <div className="flex flex-col items-center gap-10">
          <p className="text-pargraph ">{t("ResendVerificationPrompt")}</p>
          <button
            className="bg-accent text-white py-2 px-4 text-[16px] rounded cursor-pointer mb-2
         transition-all ease-linear duration-75 hover:bg-secondary mx-auto"
            onClick={handleResendVerification}
          >
            {t("ResendVerificationButton")}
          </button>
        </div>
      </Modal>
    </SectionContainer>
  );
};

export default VerifyPage;
