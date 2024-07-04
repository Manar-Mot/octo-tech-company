import React, { useRef, useEffect, useState } from "react";

interface ContentProps {
  showResendLink: boolean;
  handleResendVerification: () => void;
  handleChangeVerificationCode: (index: number, value: string) => void;
  verificationCodes: string[];
  handleVerifyCode: () => void;
  handleOpenModal: () => void;
}

const Content: React.FC<ContentProps> = ({
  handleChangeVerificationCode,
  handleResendVerification,
  showResendLink,
  handleOpenModal,
  verificationCodes,
  handleVerifyCode,
}) => {
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const setInputRef = (index: number) => (element: HTMLInputElement | null) => {
    inputRefs.current[index] = element;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent entering more than one character
    if (!/^\d*$/.test(value)) {
      setError("يرجى إدخال أرقام صحيحة فقط."); // Show error when input is invalid
      return;
    }
    handleChangeVerificationCode(index, value);
    setError(null); // Clear error when input is valid

    if (value && index < verificationCodes.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      handleChangeVerificationCode(index, '');
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    if (verificationCodes.some(code => code === '')) {
      setError("يرجى إدخال جميع أرقام التحقق.");
      return;
    }
    if (!verificationCodes.every(code => /^\d$/.test(code))) {
      setError("يرجى إدخال أرقام صحيحة فقط.");
      return;
    }
    handleVerifyCode();
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="text-center  lg:text-start w-full lg:w-[60%] px-0 lg:px-12 md:pt-10 flex flex-col justify-center gap-4">
      <p className="text-[18px] md:text-[20px] text-title font-bold">
        لقد أرسلنا لك رابط تأكيد ورقم تحقق عبر بريدك الإلكتروني
      </p>

      <p className="text-[16px] md:text-[18px] text-paragraph">
        الرجاء فتح بريدك الإلكتروني والضغط على رابط التأكيد لإكمال عملية التحقق
        من حسابك أو إدخال رمز التحقق المكون من 6 أرقام في الحقول
      </p>

      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center">
          {verificationCodes.map((code, index) => (
            <input
              key={index}
              type="text"
              value={code}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              ref={setInputRef(index)}
              className=" w-8 h-8 md:w-10 md:h-10 mx-1 text-center text-[16px] border border-gray-300 rounded"
            />
          ))}
        </div>
        <button
          className="bg-accent text-white py-1 md:py-2 px-2 md:px-4 text-[16px] rounded cursor-pointer ml-2"
          onClick={handleVerify}
        >
          تحقق
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-[14px] mx-auto mt-2">
          {error}
        </p>
      )}

      <p className="text-[16px] md:text-[18px] text-paragraph mt-4">
        لم تتلق أيه رسالة على بريدك الإلكتروني أو صلاحية الرابط منتهية يمكنك
        إعادة إرسال طلب تحقق من هنا
      </p>

      {/* {showResendLink && ( */}
        <button
          className="bg-accent text-white py-2 px-4 text-[16px] rounded cursor-pointer mb-2 transition-all ease-linear duration-75 hover:bg-secondary"
          onClick={handleOpenModal}
        >
            حدث مشكلة أو لم تتلق رمز التحقق؟ 
        </button>
      {/* )} */}
    </div>
  );
};

export default Content;
