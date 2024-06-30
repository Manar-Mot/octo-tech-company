import { signIn } from 'next-auth/react'


interface GoogleSignInButtonProps {
  children: React.ReactNode
  callbackUrl: string
}
const GoogleSignInButton = ({
  children,
  callbackUrl
}: GoogleSignInButtonProps) => {

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl })
  }

  return (
    <button onClick={loginWithGoogle} className="w-full">
      {children}
    </button>
  )
}

export default GoogleSignInButton