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
  // signIn: (email: string, password: string) => Promise<void>;
  // signOut: () => void;
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
  const router = useRouter();

  useEffect(() => {
    const localUser = localStorage.getItem("userInfo");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  const signUp = useCallback(async (values: SignUpValues) => {
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
        alert("Failed to register user");
      }
    } catch (error) {
      setError(true);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // const signIn = useCallback(async (email: string, password: string) => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch("/api/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       setUser({ _id: data.userId, email });
  //       localStorage.setItem(
  //         "user",
  //         JSON.stringify({ _id: data.userId, email })
  //       );
  //       toast.success("User signed in successfully");
  //       router.push("/dashboard"); // تغيير المسار إلى الصفحة المناسبة بعد تسجيل الدخول
  //     } else {
  //       setError(true);
  //       toast.error(data.message || "Something went wrong");
  //     }
  //   } catch (err) {
  //     setError(true);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // const signOut = useCallback(() => {
  //   setUser(null);
  //   localStorage.removeItem("user");
  //   toast.success("User signed out successfully");
  //   router.push("/auth/signin"); // تغيير المسار إلى صفحة تسجيل الدخول
  // }, []);

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
    // signIn,
    // signOut,
    handleSetError,
    handleOffError,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null)
    throw new Error("useUser must be used within a UserContextProvider");
  return context;
};
