import React from "react";
import SectionContainer from "../sharedComponent/SectionContainer";
import TitleSection from "../sharedComponent/TitleSection";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  bgSectionWhite,
  credIcon,
  growthIcon,
  octoPartner,
  techIcon,
  trainingIcon,
} from "@/public/assets";

const PartnershipFeatures = () => {
  const t = useTranslations("partnershipSection.partnerHero");
  const title = "لماذا تنضم إلى برنامج الشراكة مع OCTOTECH ؟ ";
  const wordsToColor = ["OCTOTECH", "؟"];
  const splitTitle = title.split(
    new RegExp(`(${wordsToColor.join("|")})`, "g")
  );

  return (
    <SectionContainer>
      <Image
        src={bgSectionWhite}
        alt="bg-section-white"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />
      <TitleSection title={title} wordsToColor={wordsToColor} />
      <p className="mt-3 md:max-w-[80%] lg:text-[20px] md:text-[18px] text-[16px] text-pargraph text-center mx-auto ">
        نحن في OCTOTECH نؤمن بأن الشراكات القوية هي المفتاح لتحقيق النجاح
        المستدام والابتكار المستمر. لذا، قمنا بتصميم برنامج شراكة يهدف إلى تعزيز
        التعاون المثمر بيننا وبين شركائنا، بهدف تحقيق أهداف مشتركة وتقديم قيمة
        مضافة لعملائنا.
      </p>
      <div className="w-full flex flex-col items-center justify-center mt-12 ">
        <div className=" w-full flex flex-col md:flex-row gap-10  items-center justify-between  ">
        <div className="bg-white rounded-md p-6 shadow-md w-full md:w-[430px] h-[150px] md:h-[170px] lg:h-[150px]">
        <div className="flex items-center gap-2 ">
              <Image src={techIcon} alt="Advanced technologies features icon" />
              <h4 className=" text=[18px] md:text-[20px] text-title lg:text-[22px] font-bold">
                تكنولوجيا متقدمة
              </h4>
            </div>
            <p className=" text=[16px] md:text-[18px] text-title mt-2 max-w-[400px]">
              نقدم أحدث التقنيات لضمان التفوق التنافسي لشركائنا
            </p>
          </div>
          <div className="bg-white rounded-md p-6 shadow-md  w-[430px] h-[150px] md:h-[170px] lg:h-[150px]">
            <div className="flex items-center gap-2 ">
              <Image
                src={growthIcon}
                alt="Advanced technologies features icon"
              />
              <h4 className=" text=[18px] md:text-[20px] text-title lg:text-[22px] font-bold">
                نمو مشترك
              </h4>
            </div>
            <p className=" text=[16px] md:text-[18px] text-title mt-2 max-w-[400px]">
              نحن نعمل معًا لتحقيق أهداف مشتركة والنمو المستدام للطرفين{" "}
            </p>
          </div>
        </div>
        <div className="my-4 lg:my-0">
          <Image src={octoPartner} alt="partnerships features section image " />
        </div>
        <div className=" w-full flex flex-col md:flex-row gap-10  items-center justify-between mb-4  ">

          <div className="bg-white rounded-md p-6 shadow-md  w-[430px] h-[150px] md:h-[170px] lg:h-[150px]">
            <div className="flex items-center gap-2 ">
              <Image src={credIcon} alt="Advanced technologies features icon" />
              <h4 className=" text=[18px] md:text-[20px] text-title lg:text-[22px] font-bold">
                تعزيز المصداقية
              </h4>
            </div>
            <p className=" text=[16px] md:text-[18px] text-title mt-2 max-w-[400px]">
              نضمن لك مصداقية عالية من خلال عرض تفاصيل استراتيجية واضحة وفوائد
              ملموسة
            </p>
          </div>
          <div className="bg-white rounded-md p-6 shadow-md  w-[430px] h-[150px] md:h-[170px] lg:h-[150px]">
            <div className="flex items-center gap-2 ">
              <Image
                src={trainingIcon}
                alt="Advanced technologies features icon"
              />
              <h4 className=" text=[18px] md:text-[20px] text-title lg:text-[22px] font-bold">
                فرص تدريب وتطوير{" "}
              </h4>
            </div>
            <p className=" text=[16px] md:text-[18px] text-title mt-2 max-w-[400px]">
              استفد من برامجنا التدريبية المتقدمة لتطوير مهارات فريقك وزيادة
              كفاءتهم
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default PartnershipFeatures;
