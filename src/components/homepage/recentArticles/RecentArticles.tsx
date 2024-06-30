import { useTranslations } from "next-intl";
import React from "react";
import SectionContainer from "../../sharedComponent/SectionContainer";
import TitleSection from "../../sharedComponent/TitleSection";
import Image from "next/image";
import { article1, article2, article3, bgSectionWhite } from "@/public/assets";
import ArticleCard from "./ArticleCard";
import Link from "next/link";

const RecentArticles = () => {
  const t = useTranslations("recentArticles");
  const articles = t.raw("Articles");
  const articlesList = [
    {
      title: articles[0].title,
      description: articles[0].description,
      imgUrl: article1,
    },
    {
      title: articles[1].title,
      description: articles[1].description,
      imgUrl: article2,
    },
    {
      title: articles[2].title,
      description: articles[2].description,
      imgUrl: article3,
    },
  ];
  return (
    <SectionContainer>
      <Image
        src={bgSectionWhite}
        alt="bg-section-white"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />
      <TitleSection title={t("title")} />
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center   gap-2  my-10">

      {articlesList.map((article, index) => (
        <ArticleCard
     key={index}
          title={article.title}
          description={article.description}
          imgUrl={article.imgUrl}
          index={index}
          btnContent={t('btnTitle')}
        />
      ))}
      </div>
      <Link href="/" className="text-secondary underline">
        {t("link")}
      </Link>
    </SectionContainer>
  );
};

export default RecentArticles;
