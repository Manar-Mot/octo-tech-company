import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error) {
      switch (error) {
        case "CredentialsSignin":
          setErrorMessage("Invalid email or password!");
          break;
        case "AccountNotConfirmed":
          setErrorMessage("Your account is not confirmed. Please check your email for confirmation instructions.");
          break;
        default:
          setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  }, [error]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Error</h1>
      <p>{errorMessage}</p>
      <button onClick={() => router.push("/auth/signIn")}>Back to Sign In</button>
    </div>
  );
};

export default ErrorPage;
