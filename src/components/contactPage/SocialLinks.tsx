import { Link } from "@/src/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const SocialLinks: React.FC = () => (
  <div className="flex text-[22px] items-center gap-2 text-secondary mt-10">
    <Link
      href="https://www.facebook.com/octotechco?mibextid=ZbWKwL"
      passHref
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaFacebook className="transition-all ease-linear duration-75 hover:text-accent cursor-pointer text-[28px]" />
    </Link>
    <Link
      href="https://t.me/octotechco"
      passHref
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaTelegram className="transition-all ease-linear duration-75 hover:text-accent cursor-pointer text-[28px]" />
    </Link>
    <Link
      href="https://www.instagram.com/octopu.tech"
      passHref
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaInstagram className="transition-all ease-linear duration-75 hover:text-accent cursor-pointer text-[28px]" />
    </Link>
    <Link
      href="https://www.linkedin.com/company/octotechco"
      passHref
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaLinkedin className="transition-all ease-linear duration-75 hover:text-accent cursor-pointer text-[28px]" />
    </Link>
    <Link
      href="https://www.youtube.com/@octotechco"
      passHref
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaYoutube className="transition-all ease-linear duration-75 hover:text-accent cursor-pointer text-[28px]" />
    </Link>
    <Link
      href="https://x.com/octotechco"
      passHref
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaTwitter className="transition-all ease-linear duration-75 hover:text-accent cursor-pointer text-[28px]" />
    </Link>
    <Link
      href="https://wa.me/306998548153"
      passHref
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp className="transition-all ease-linear duration-75 hover:text-accent cursor-pointer text-[28px]" />
    </Link>
  </div>
);

export default SocialLinks;
