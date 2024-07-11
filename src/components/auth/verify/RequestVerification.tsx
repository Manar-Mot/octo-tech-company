"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SectionContainer from "@/src/components/sharedComponent/SectionContainer";
import Modal from "./Modal";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useUser } from "@/src/hooks/useUser";
import axios from "axios";

const RequestVerification = () => {
  const router = useRouter();
  const tMessage = useTranslations("messages");
  const [showResendLink, setShowResendLink] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const hasVerified = useRef(false); 
  const { verifyToken ,user} = useUser();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token && !hasVerified.current) {
      hasVerified.current = true; 
      verifyToken(token);
    }
  }, [token, verifyToken]);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleResendVerification = async () => {
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
  };

  return (
    <SectionContainer custom=" ">
      <div>جاري التحقق...</div>
      <Modal handleOpen={handleOpenModal} open={openModal}>
        <div className="flex flex-col items-center gap-10">
          <p className="text-paragraph ">
            هل تريد إعادة إرسال رابط التحقق؟
          </p>
          <button
            className="bg-accent text-white py-2 px-4 text-[16px] rounded cursor-pointer mb-2
         transition-all ease-linear duration-75 hover:bg-secondary mx-auto"
            onClick={handleResendVerification}
          >
            إعادة إرسال رابط التحقق
          </button>
        </div>
      </Modal>
    </SectionContainer>
  );
};

export default RequestVerification;
