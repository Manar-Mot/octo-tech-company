import ContactFormSection from "@/src/components/contactPage/ContactFormSection";
import ContactHero from "@/src/components/contactPage/ContactHero";
import ContactInfo from "@/src/components/contactPage/ContactInfo";
import { getLocale } from "next-intl/server";
import { use } from "react";

const Contact = () => {
  return (
    <>
      <ContactHero />
      <ContactInfo/>
      <ContactFormSection />
    </>
  );
};

export default Contact;
