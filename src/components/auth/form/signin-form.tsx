"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { signIn } from "next-auth/react"

import Link from "next/link"
import { userSignInValidation } from "@/src/lib/validation/auth-validation"
import Image from "next/image"
import { GoogleIcon } from "@/public/assets"

interface SignInFormProps {
  callbackUrl: string
}

const SignInForm = ({
  callbackUrl
}: SignInFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof userSignInValidation>>({
    resolver: zodResolver(userSignInValidation),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(values: z.infer<typeof userSignInValidation>) {
    setIsSubmitting(true)
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl
    })
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-2">
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="mail@example.com"
            {...form.register("email")}
            className="border p-2 w-full"
          />
          {form.formState.errors.email && <p>{form.formState.errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="your password"
            {...form.register("password")}
            className="border p-2 w-full"
          />
          {form.formState.errors.password && <p>{form.formState.errors.password.message}</p>}
        </div>
      </div>
      <button
        className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Sign In"}
      </button>
      <div className="flex items-center justify-center my-4">
        <div className="border-b border-gray-400 w-full"></div>
        <span className="px-2 text-gray-400">or</span>
        <div className="border-b border-gray-400 w-full"></div>
      </div>
      <button
        className="w-full bg-transparent text-title py-2 px-4 rounded flex items-center gap-2"
        type="button"
        onClick={() => signIn("google", { callbackUrl })}
      >
        Sign in with Google
        <Image src={GoogleIcon} alt="google-icon" className="w-10 h-auto object-cover"/>
      </button>
      <p className="text-center text-sm text-gray-600 mt-2">
        Don&apos;t have an account?&nbsp;
        <Link className="text-blue-600 hover:underline" href="/signup">
          Sign Up
        </Link>
      </p>
    </form>
  )
}

export default SignInForm
