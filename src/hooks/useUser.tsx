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
  isAccountConfirmed: boolean; // حالة التأكيد على الحساب
  handleSetError: () => void;
  handleOffError: () => void;
}

interface Props {
  [propsName: string]: any;
}

export const UserContext = createContext<UserContextProps | null>(null);

export const UserContextProvider = (props: Props) => {
  const t = useTranslations("signUpPage");
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isAccountConfirmed, setIsAccountConfirmed] = useState(false); // حالة التأكيد على الحساب
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
          toast.success(t("signUpSuccess"));
          router.push(`/auth/request-verification`);
        } else {
          setError(true);
          toast.error(response.data.message || "Something went wrong");
        }
      } catch (error) {
        setError(true);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [router, t]
  );

  const verifyToken = useCallback(
    async (token: string) => {
      if (!token) return;
      try {
        const res = await axios.post(`/api/auth/confirm`, { token });
        if (res.status === 200) {
          setUser(res.data.user);
          localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          setIsAccountConfirmed(true); // تعيين حالة التأكيد على الحساب إلى true
          toast.success("Account verified successfully");
          router.push("/auth/signIn");
        } else if (res.status === 400) {
          setError(true);
          toast.error("Invalid token");
        } else {
          setError(true);
          toast.error("Error verifying token");
        }
      } catch (error) {
        setError(true);
        toast.error("Error verifying token");
      }
    },
    [router]
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
    isAccountConfirmed, // تمرير حالة التأكيد على الحساب كجزء من قيمة السياق
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
