// import { LocaleProvider } from "../../contexts/LocaleContext";
import React from "react";
import UserProvider from "./UserProvider";

const WithProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // <LocaleProvider>
    <UserProvider>{children}</UserProvider>
    // </LocaleProvider>
  );
};

export default WithProviders;
