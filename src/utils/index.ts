import { getLocale } from "next-intl/server";
import { use } from "react";
import crypto from 'crypto';
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.substring(0, maxLength) + "...";
  }
};
export const  getLocaleServer=()=>{
  const locale=use(getLocale());
  return locale
}
export const generateOTP=()=> {
  return crypto.randomInt(100000, 999999).toString();
}