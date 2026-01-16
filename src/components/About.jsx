import { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";

import { fadeIn, textVariant } from "../utils/motion";

import { SectionWrapper } from "../hoc";
import { useTranslation } from "react-i18next";

const ServiceCard = ({ index, id, icon, isActive, onClick }) => {
  const { t } = useTranslation();

  // Her kart için farklı renk gradyanları
  const gradients = {
    web: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    mobile: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    frontend: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    uiux: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  };

  const hoverColors = {
    web: "#667eea",
    mobile: "#f5576c",
    frontend: "#00f2fe",
    uiux: "#38f9d7",
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="xs:w-[250px] w-full group cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div
        className={`relative bg-tertiary rounded-2xl p-px overflow-hidden transition-all duration-300 shadow-lg ${
          isActive ? "shadow-2xl border-white/20" : "hover:shadow-2xl"
        }`}
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
          border: isActive
            ? `1px solid ${hoverColors[id]}`
            : "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Shine effect on hover */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <div
            className={`absolute inset-0 transition-transform duration-1000 ${
              isActive
                ? "translate-x-0"
                : "-translate-x-full group-hover:translate-x-full"
            }`}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            }}
          />
        </div>

        <div className="bg-tertiary rounded-2xl py-8 px-10 min-h-[280px] flex flex-col items-center justify-center gap-6 relative overflow-hidden backdrop-blur-sm">
          {/* Background glow effect */}
          <div
            className={`absolute inset-0 blur-2xl transition-opacity duration-300 ${
              isActive ? "opacity-30" : "opacity-0 group-hover:opacity-20"
            }`}
            style={{
              background: gradients[id],
            }}
          />

          {/* Icon container with gradient border */}
          <div className="relative z-10">
            <div
              className={`w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "scale-110 rotate-6"
                  : "group-hover:scale-110 group-hover:rotate-6"
              }`}
              style={{
                background: `rgba(255, 255, 255, 0.05)`,
                border: isActive
                  ? `1px solid ${hoverColors[id]}`
                  : "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <img
                src={icon}
                alt={t(`about.${id}card`)}
                className={`w-16 h-16 object-contain transition-all duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
                style={{
                  filter: isActive ? "brightness(1.1)" : "brightness(0.9)",
                }}
              />
            </div>

            {/* Decorative corner accent */}
            <div
              className={`absolute -top-2 -right-2 w-6 h-6 rounded-full transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
              style={{
                background: hoverColors[id],
                boxShadow: `0 0 20px ${hoverColors[id]}`,
              }}
            />
          </div>

          {/* Title */}
          <h3 className="text-white text-[18px] sm:text-[20px] font-bold text-center relative z-10 group-hover:text-white transition-colors">
            {t(`about.${id}card`)}
          </h3>

          {/* Bottom accent line */}
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-500 rounded-full ${
              isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
            }`}
            style={{ background: gradients[id] }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const { t } = useTranslation();
  const [activeService, setActiveService] = useState(null);

  const handleCardClick = (id) => {
    setActiveService(activeService === id ? null : id);
  };
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("about.intro")}</p>
        <h2 className={styles.sectionHeadText}>{t("about.overview")}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        onClick={() => setActiveService(null)}
        className="mt-4 text-secondary sm:text-[17px] text-[15px] max-w-3xl leading-[30px]"
      >
        {t("about.description")}
      </motion.p>

      <div className="pt-12 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            index={index}
            id={service.id}
            icon={service.icon}
            isActive={activeService === service.id}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
