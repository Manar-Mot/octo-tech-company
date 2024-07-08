import React from "react";
import PartnerHero from "./PartnerHero";
import PartnershipFeatures from "./PartnershipFeatures";
import OurParteners from "./OurParteners";
import ApplyPartnerShipSection from "./ApplyPartnerShipSection";
import { getLocale } from "next-intl/server";

const Partnership = async () => {
  const locale = await getLocale();
  return (
    <div>
      <PartnerHero />
      <PartnershipFeatures />
      <OurParteners locale={locale} />
      <ApplyPartnerShipSection />
    </div>
  );
};

export default Partnership;
