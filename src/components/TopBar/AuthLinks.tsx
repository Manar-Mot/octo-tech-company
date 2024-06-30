
import { Link } from "@/src/navigation";
import React from "react";
import { HiOutlineArrowRightEndOnRectangle, HiOutlineUserPlus } from "react-icons/hi2";
interface AuthLinksProps{
    LinkSignUp:string;
    LinkSignIn:string;
}
const AuthLinks:React.FC<AuthLinksProps> = ({LinkSignIn,LinkSignUp}) => {
  return (
    <>
      <Link href="/signUp"   className="flex items-center gap-2 transition-all ease-linear duration-75 cursor-pointer hover:text-slate-300">
        <HiOutlineUserPlus className="text-[20px]" />
        {LinkSignUp}
      </Link>
      <Link href="/signIn" className="flex items-center gap-2 transition-all ease-linear duration-75 cursor-pointer hover:text-slate-300">
        <HiOutlineArrowRightEndOnRectangle className="text-[20px] " />
        {LinkSignIn}
      </Link>
    </>
  );
};

export default AuthLinks;
