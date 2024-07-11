
"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn, getSession } from "next-auth/react";
import Link from "next/link";
import { userSignInValidation } from "@/src/lib/validation/auth-validation";
import { useTranslations } from "next-intl";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getUserSession } from "@/src/lib/actions/auth.actions";
import { useRouter } from "@/src/navigation";

interface SignInFormProps {
  callbackUrl: string;
}

const SignInForm = ({ callbackUrl }: SignInFormProps) => {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof userSignInValidation>>({
    resolver: zodResolver(userSignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userSignInValidation>) {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
    } else {
      const session = await getUserSession();
      const role = session?.user?.role;

      if (role === "Admin") {
        router.push("/admin");
      } else {
        router.push(callbackUrl || "/");
      }
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-8">
      <div className="space-y-2">
        <div>
          <label>{t("SignIn.emailLabel")}</label>
          <input
            type="email"
            placeholder={t("SignIn.emailPlaceholder")}
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
          <label>{t("SignIn.passwordLabel")}</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("SignIn.passwordPlaceholder")}
              {...form.register("password")}
              className="border p-2 w-full pr-10"
            />
            <div
              className="absolute inset-y-0 ltr:right-4 rtl:left-4 pr-3 text-slate-500 flex items-center cursor-pointer"
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
      </div>
      <button
        className="w-full mt-6 bg-accent text-white py-2 px-4 rounded"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? t("SignIn.submitting") : t("SignIn.submitButton")}
      </button>
      {/* <div className="flex items-center justify-center my-4">
        <div className="border-b border-gray-400 w-full"></div>
        <span className="px-2 text-gray-400">{t("SignIn.or")}</span>
        <div className="border-b border-gray-400 w-full"></div>
      </div> */}
 
      {/* <p className="text-center text-sm text-gray-600 mt-2">
        {t("SignIn.noAccount")} &nbsp;
        <Link className="text-blue-600 hover:underline" href="/auth/signUp">
          {t("SignIn.signUp")}
        </Link>
      </p> */}
    </form>
  );
};

export default SignInForm;
