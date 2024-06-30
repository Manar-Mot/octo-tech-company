"use client";
import { AppLogo } from "@/public/assets";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ButtonComp from "../sharedComponent/ButtonComp";
import LinkList from "./LinkList";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LinkItem } from "@/src/types";
import { useRouter } from "@/src/navigation";

interface NavBarProps {
  locale: string;
}

const NavBar: React.FC<NavBarProps> = ({ locale }) => {
  const t = useTranslations("navBar");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const links: LinkItem[] = [
    {
      link: t("home-link"),
      href: "/",
    },
    {
      link: t("certificates-link"),
      href: "/certificates",
    },
    {
      link: t("partnerships-link"),
      href: "/partnerships",
    },
    {
      link: t("blog-link"),
      href: "/blog",
    },
    {
      link: t("about-us-link"),
      href: "/about-us",
    },
    {
      link: t("contact-link"),
      href: "/contact-us",
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`z-[900] w-full py-2 px-4 lg:px-8 flex items-center justify-between gap-8 transition-all ease-linear duration-75 ${
        isScrolled ? "bg-white shadow-md" : "bg-[rgba(221,224,248,0.4)]"
      }`}
    >
      <Link href="/" className="w-[70px] lg:w-[90px] h-auto">
        <div>
          <Image src={AppLogo} alt="logo" className="object-cover" />
        </div>
      </Link>
      <div
        className={`flex items-center justify-between     ${
          locale === "ar" ? " lg:w-[82%]" : "lg:w-[87%]"
        }`}
      >
        <LinkList
          isScrolled={isScrolled}
          links={links}
          btnTite={t("discover-services-btn")}
        />

        <div className="hidden lg:block">
          <ButtonComp
            content={t("discover-services-btn")}
            isPrimary={true}
            event={() => router.push("/services")}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
