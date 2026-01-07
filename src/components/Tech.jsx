import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { useTranslation } from "react-i18next";

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
          <div className="w-28 h-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
