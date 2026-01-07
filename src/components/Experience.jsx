import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useTranslation } from "react-i18next";

const ExperienceCard = ({ experience }) => {
  const { t } = useTranslation();

  // translations.js yapına göre anahtarları oluşturuyoruz
  const titleKey = `experience.${experience.id}_title`;
  const nameKey = `experience.${experience.id}_name`;
  const dateKey = `experience.${experience.id}_date`;
  const pointsKey = `experience.${experience.id}_points`;

  // returnObjects: true -> Bize string değil, array (dizi) dönmesini sağlar
  const points = t(pointsKey, { returnObjects: true });

  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={t(dateKey)}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={t(nameKey)}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{t(titleKey)}</h3>
        <p
          className="text-secondary font-semibold"
          style={{ marginTop: 3, margin: 0 }}
        >
          {t(nameKey)}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {Array.isArray(points) ? (
          points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))
        ) : (
          <li className="text-red-500">Translation missing for {pointsKey}</li>
        )}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { t } = useTranslation();
  return (
    <>
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className={styles.sectionSubText}>{t("experience.intro")}</p>
        <h2 className={styles.sectionHeadText}>{t("experience.overview")}</h2>
      </motion.div>
      <div className="mt-10 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
