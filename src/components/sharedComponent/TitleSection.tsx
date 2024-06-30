import React from "react";
interface TitleSectionProps {
  title: string;
  wordsToColor?: string[];
}

const TitleSection: React.FC<TitleSectionProps> = ({ title, wordsToColor }) => {
  const splitTitle = title.split(
    new RegExp(`(${wordsToColor?.join("|")})`, "g")
  );
  return (
    <div className="mx-auto text-[22px] md:text-[28px] lg:text-[32px] font-semibold text-center max-w-[600px]">
      {splitTitle.map((word, index) => (
        <span
          key={index}
          className={
            wordsToColor?.includes(word) ? "text-accent" : " text-title"
          }
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default TitleSection;
