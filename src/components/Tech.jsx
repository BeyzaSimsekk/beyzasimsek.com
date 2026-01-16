import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { useTranslation } from "react-i18next";

const Star = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#FFD700" : "#4a4a4a"}
    stroke="currentColor"
    className={`w-4 h-4 sm:w-5 sm:h-5 drop-shadow-md ${
      filled ? "filter drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" : ""
    }`}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

const Tech = () => {
  const { t } = useTranslation();
  return (
    <>
      <motion.div variants={textVariant()} className="mb-10 text-center">
        <p className={styles.sectionSubText}>{t("tech.subtitle")}</p>
        <h2 className={styles.sectionHeadText}>{t("tech.heading")}</h2>
        <p className="text-secondary text-[14px] mt-2">{t("tech.info")}</p>
      </motion.div>

      <div className="flex flex-row flex-wrap justify-center items-center gap-10">
        {technologies.map((technology) => (
          <div className="w-28 h-28" key={technology.name}></div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
