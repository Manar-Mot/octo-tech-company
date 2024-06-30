
import ErrorPage from "@/src/components/ErrorPage";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import { use } from 'react';
export default  function NotFoundPage() {
  const t  = useTranslations("NotFoundPage");
  const loca = use(getLocale());
  return <ErrorPage title={t("title")} lang={loca} />;
}
