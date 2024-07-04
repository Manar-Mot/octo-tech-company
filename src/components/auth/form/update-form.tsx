"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { userUpdateValidation } from "@/src/lib/validation/auth-validation"
import { UpdateUserProfileParams } from "@/src/lib/actions/auth.actions"

interface UpdateFormProps {
  updateUserProfile: (values: UpdateUserProfileParams) => Promise<{success?: boolean}>
}

const UpdateForm = ({
  updateUserProfile
}: UpdateFormProps) => {
  const { data: session, update } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof userUpdateValidation>>({
    resolver: zodResolver(userUpdateValidation),
    defaultValues: {
      name: "",
    }
  })

  async function onSubmit(values: z.infer<typeof userUpdateValidation>) {
    setIsSubmitting(true)
    update({ name: values.name })
    const res = await updateUserProfile(values)
    
    if (res?.success) {
      alert("Update successfully.")
    }
    setIsSubmitting(false)
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <div>
            <label>Username</label>
            <input
              placeholder="new username"
              {...form.register("name")}
              className="border p-2 w-full"
            />
            {form.formState.errors.name && <p>{form.formState.errors.name.message}</p>}
          </div>
        </div>
        <button
          className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Update"}
        </button>
      </form>
      {session?.user?.provider === "credentials" && <>
        <div className="flex items-center justify-center mt-4 mb-8">
          <div className="border-b border-gray-400 w-full"></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          <Link className="text-blue-600 hover:underline" href="/change-password">
            Change Password
          </Link>
        </p>
      </>}
    </div>
  )
}

export default UpdateForm
