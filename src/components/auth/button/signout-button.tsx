"use client"


import { signOut } from "next-auth/react"

const SignOutButton = () => {
  const signout = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/signin`
    })
  }

  return (
    <button onClick={signout} >
      Sign Out
    </button>
  )
}

export default SignOutButton