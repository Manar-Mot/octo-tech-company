"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { userSignUpValidation } from "@/src/lib/validation/auth-validation";
import { useRouter } from "@/src/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useUser } from "@/src/hooks/useUser";
type SignUpFormValues = z.infer<typeof userSignUpValidation>;

const SignUpForm = ({ locale }: { locale: string }) => {
  const router = useRouter();
  const t = useTranslations("signUpPage");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, loading } = useUser();
// const loading =false;
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(userSignUpValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    await signUp(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-8">
      <div className="space-y-2">
        <div>
          <label>{t("firstName")}</label>
          <input
            placeholder={t("placeholderFirstName")}
            {...form.register("firstName")}
            className="border p-2 w-full"
          />
          {form.formState.errors.firstName && (
            <p className="text-red-600 text-[14px]">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label>{t("lastName")}</label>
          <input
            placeholder={t("placeholderLastName")}
            {...form.register("lastName")}
            className="border p-2 w-full"
          />
          {form.formState.errors.lastName && (
            <p className="text-red-600 text-[14px]">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <label>{t("email")}</label>
          <input
            type="email"
            placeholder={t("placeholderEmail")}
            {...form.register("email")}
            className="border p-2 w-full"
          />
          {form.formState.errors.email && (
            <p className="text-red-600 text-[14px]">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label>{t("password")}</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("placeholderPassword")}
              {...form.register("password")}
              className="border p-2 w-full ltr:pr-10 rtl:pl-10"
            />
            <div
              className="absolute inset-y-0 ltr:right-4 rtl:left-4 pr-3 flex items-center cursor-pointer text-slate-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </div>
          {form.formState.errors.password && (
            <p className="text-red-600 text-[14px]">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label>{t("confirmPassword")}</label>
          <input
            type="password"
            placeholder={t("placeholderConfirmPassword")}
            {...form.register("confirmPassword")}
            className="border p-2 w-full"
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-red-600 text-[14px]">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <button
        className="w-full mt-4 bg-accent text-white rounded-md transition-all ease-linear duration-75 border-none hover:bg-secondary hover:bg-opacity-80 py-2 px-4"
        type="submit"
        disabled={loading}
      >
        {loading ? t("submitting") : t("signUp")}
      </button>
      <div className="flex items-center justify-center my-4">
        <div className="border-b border-gray-400 w-full"></div>
        <span className="px-2 text-gray-400">{t("or")}</span>
        <div className="border-b border-gray-400 w-full"></div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        {t("alreadyHaveAccount")}&nbsp;
        <Link className="text-accent hover:underline" href="/auth/signIn">
          {t("signIn")}
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
