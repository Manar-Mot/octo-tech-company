"use client";

import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import { userSignUpValidation } from "@/src/lib/validation/auth-validation";
import { getLocale } from "next-intl/server";

type SignUpFormValues = z.infer<typeof userSignUpValidation>;

const SignUpForm = ({locale}:{locale:string}) => {
  const router = useRouter();
  const t = useTranslations("signUpPage");
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(userSignUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/auth/signUp", {
        ...values,
        locale: locale,
      });

      if (response.status === 200) {
        const { email } = values;
        const { createdAt } = response.data;
        alert(t("signUpSuccess"));
        router.push(
          `/request-verification?email=${email}&createdAt=${createdAt}`
        );
      } else {
        alert("Failed to register user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred. Please try again.");
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
      <div className="space-y-2">
        <div>
          <label>{t("username")}</label>
          <input
            placeholder={t("placeholderUsername")}
            {...form.register("name")}
            className="border p-2 w-full"
          />
          {form.formState.errors.name && (
            <p>{form.formState.errors.name.message}</p>
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
            <p>{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <label>{t("password")}</label>
          <input
            type="password"
            placeholder={t("placeholderPassword")}
            {...form.register("password")}
            className="border p-2 w-full"
          />
          {form.formState.errors.password && (
            <p>{form.formState.errors.password.message}</p>
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
            <p>{form.formState.errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <button
        className="w-full mt-4 bg-accent text-white rounded-md transition-all ease-linear duration-75 border-none hover:bg-secondary hover:bg-opacity-80 py-2 px-4"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? t("submitting") : t("signUp")}
      </button>
      <div className="flex items-center justify-center my-4">
        <div className="border-b border-gray-400 w-full"></div>
        <span className="px-2 text-gray-400">{t("or")}</span>
        <div className="border-b border-gray-400 w-full"></div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        {t("alreadyHaveAccount")}&nbsp;
        <Link className="text-accent hover:underline" href="/signIn">
          {t("signIn")}
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
