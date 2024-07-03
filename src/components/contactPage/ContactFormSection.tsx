"use client";
import React, { useState } from "react";
import ContactForm from "../auth/form/ContactForm";
import SocialLinks from "./SocialLinks";
import MapComponent from "./Map";
import SectionContainer from "../sharedComponent/SectionContainer";

const ContactFormSection = ({locale}:{locale:string}) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <SectionContainer custom="relative flex-1 w-full flex flex-col lg:flex-row-reverse items-center">
      <div className="w-full lg:w-[60%] flex flex-col items-center px-10 py-10 lg:px-10 lg:py-20 bg-white shadow-md rounded-md ltr:lg:pl-28 rtl:lg:pr-28">
        <ContactForm onSuccess={setSuccess} onError={setError} />
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-4 text-sm text-green-600">{success}</p>}
        <SocialLinks />
      </div>

      <div className="w-full lg:w-[40%] mt-10 lg:mt-0 relative flex justify-center lg:absolute lg:ltr:left-24 lg:rtl:right-24">
        <div className="w-full h-80 lg:w-[90%] lg:h-full bg-secondary opacity-30 absolute rounded-md backdrop-blur-lg -bottom-3 lg:rtl:-right-3 lg:ltr:-left-3"></div>
        <MapComponent />
      </div>
    </SectionContainer>
  );
};

export default ContactFormSection;
