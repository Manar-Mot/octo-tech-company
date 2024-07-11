"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";
import { useRouter } from "../navigation";
import axios from "axios";
import { IUser, SignUpValues } from "../types/user";
import { useTranslations } from "next-intl";

interface UserContextProps {
  user: IUser | null;
  loading: boolean;
  error: boolean;
  signUp: (values: SignUpValues) => Promise<void>;
  verifyToken: (token: string) => Promise<void>;
  handleVerifyCode: (verificationCodes: string[]) => Promise<void>;
  isAccountConfirmed: boolean;
  handleSetError: () => void;
  handleOffError: () => void;
}

interface Props {
  [propsName: string]: any;
}

export const UserContext = createContext<UserContextProps | null>(null);

export const UserContextProvider = (props: Props) => {
  const t = useTranslations("messages");
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isAccountConfirmed, setIsAccountConfirmed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const localUser = localStorage.getItem("userInfo");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  const signUp = useCallback(
    async (values: SignUpValues) => {
      setLoading(true);
      try {
        const response = await axios.post("/api/auth/signUp", {
          ...values,
          locale: "ar",
        });

        if (response.status === 200) {
          setUser(response.data.user);
          localStorage.setItem("userInfo", JSON.stringify(response.data.user));
          toast.success(t(response.data.messageKey));
          router.push(`/auth/verify`);
        } else {
          setError(true);
          toast.error(t(response.data.messageKey) || t("SomethingWentWrong"));
        }
      } catch (error:any) {
        setError(true);
        toast.error(t(error.response.data.messageKey)||t("InternalServerError"));

      } finally {
        setLoading(false);
      }
    },
    [router, t]
  );

  const verifyToken = useCallback(
    async (token: string) => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await axios.post(`/api/auth/confirm`, { token });
        console.log("========")
        console.log(res)
        if (res.status === 200) {
          setUser(res.data.user);
          localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          setIsAccountConfirmed(true);
          toast.success(t(res.data.messageKey));
          router.push("/auth/signIn");
        } else if(res.status===400) {
          console.log(res.data.messageKey)
          setError(true);
          toast.error(t(res.data.messageKey) || t("SomethingWentWrong"));
        }
      } catch (error:any) {
        console.log(error)
        setError(true);
        toast.error(t(error.response.data.messageKey)||t("InternalServerError"));
      } finally {
        setLoading(false);
      }
    },
    [router]
  );
  const handleVerifyCode = useCallback(
    async (verificationCodes: string[]) => {
      try {
        const res = await axios.post(`/api/auth/verify-code`, {
          email: user?.email,
          otp: verificationCodes.join(""),
        });

        if (res.status === 200 && res.data.success) {
          toast.success(t(res.data.messageKey));
          router.push("/auth/signIn");
        } else {
          const errorMessage = res.data.messageKey
            ? t(res.data.messageKey)
            : t("VerifyCodeError");
          toast.error(errorMessage);
        }
      } catch (error:any) {
        console.error("Error verifying code:", error);
        toast.error(t(error.response.data.messageKey)||t("VerifyCodeError"));

      }
    },
    [router, user?.email, t]
  );

  const handleSetError = useCallback(() => {
    setError(true);
  }, []);

  const handleOffError = useCallback(() => {
    setError(false);
  }, []);

  const value = {
    user,
    loading,
    error,
    signUp,
    verifyToken,
    handleVerifyCode,
    isAccountConfirmed,
    handleSetError,
    handleOffError,
  };

  return <UserContext.Provider value={value} {...props} />;
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
