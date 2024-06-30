"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { ChangeUserPasswordParams } from "@/src/lib/actions/auth.actions"
import { changePasswordValidation } from "@/src/lib/validation/auth-validation"

interface ChangePasswordProps {
  changeUserPassword: (values: ChangeUserPasswordParams) => Promise<{ success?: boolean }>
}

const ChangePasswordForm = ({
  changeUserPassword
}: ChangePasswordProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const form = useForm<z.infer<typeof changePasswordValidation>>({
    resolver: zodResolver(changePasswordValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  })

  async function onSubmit(values: z.infer<typeof changePasswordValidation>) {
    setIsSubmitting(true)
    const res = await changeUserPassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    })
    
    if (res?.success) {
      alert("Change password successfully. You are being signed out...")
      setIsLoggingOut(true)
      setTimeout(() => {
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/signin`
        })
      }, 5000)
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-2">
        <div>
          <label>Old Password</label>
          <input
            type="password"
            placeholder="your old password"
            {...form.register("oldPassword")}
            className="border p-2 w-full"
          />
          {form.formState.errors.oldPassword && <p>{form.formState.errors.oldPassword.message}</p>}
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            placeholder="your new password"
            {...form.register("newPassword")}
            className="border p-2 w-full"
          />
          {form.formState.errors.newPassword && <p>{form.formState.errors.newPassword.message}</p>}
        </div>
        <div>
          <label>Confirm your new password</label>
          <input
            type="password"
            placeholder="Confirm your new password"
            {...form.register("confirmPassword")}
            className="border p-2 w-full"
          />
          {form.formState.errors.confirmPassword && <p>{form.formState.errors.confirmPassword.message}</p>}
        </div>
      </div>
      <button
        className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded"
        type="submit"
        disabled={isSubmitting || isLoggingOut}
      >
        {isSubmitting ? "Submitting..." : "Change"}
      </button>
      <button
        onClick={() => router.back()}
        className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded"
        disabled={isSubmitting || isLoggingOut}
      >
        Cancel
      </button>
    </form>
  )
}

export default ChangePasswordForm
