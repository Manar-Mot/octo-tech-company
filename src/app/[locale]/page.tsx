import ServicesSection from "@/src/components/homepage/ServicesSection/ServicesSection";
import FeaturesSection from "@/src/components/homepage/featuresSection/FeaturesSection";
import Hero from "@/src/components/homepage/hero/Hero";
import Testimonials from "@/src/components/homepage/testimonials/Testimonials";
import React from "react";
import Template from "../template";
import PartnershipsSection from "@/src/components/homepage/partnershipsSection/PartnershipsSection";
import RecentArticles from "@/src/components/homepage/recentArticles/RecentArticles";
import { getLocale } from "next-intl/server";

const Home = async () => {
  const locale = await getLocale();
  return (
    <Template>
      <Hero />
      <FeaturesSection />
      <ServicesSection />
      <Testimonials />
      <PartnershipsSection locale={locale} />
      <RecentArticles />
    </Template>
  );
};

export default Home;
