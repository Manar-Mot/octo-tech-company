import Image from "next/image";
import React from "react";
import ButtonComp from "../../sharedComponent/ButtonComp";
import { truncateString } from "@/src/utils";
interface ArticleCardProps {
  title: string;
  description: string;
  imgUrl: string;
  index: number;
  btnContent: string;
}
const ArticleCard: React.FC<ArticleCardProps> = ({
  description,
  title,
  imgUrl,
  index,
  btnContent,
}) => {
  return (
    <div key={index} className=" mb-6 lg:mb-0 w-[90%] border border-slate-300 pb-4 rounded-[10px] mx-auto " >
      <Image
        src={imgUrl}
        alt={`article ${index + 1}`}
        className=" w-full h-auto object-cover"
      />
      <h5 className="text-title font-semibold text-[16px] md:text-[18px] px-4 pt-4 pb-2">
        {truncateString(title,60) }
      </h5>
      <p className="text-pargraph text-[16px] w-full px-4">{truncateString(description,70)}</p>
      <div className="w-fit mt-2 px-4">

      <ButtonComp isPrimary={false} content={btnContent} path="/" event={console.log("")} />
      </div>
    </div>
  );
};

export default ArticleCard;
