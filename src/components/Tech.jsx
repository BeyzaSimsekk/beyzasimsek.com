import { useState } from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
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

const TechCard = ({ index, name, icon, rating = 5, isActive, onClick }) => {
  // Yıldızların yay şeklinde dizilmesi için hesaplama (Toplam 5 yıldız, -60 dereceden +60 dereceye kadar yayılır.)
  const stars = Array.from({ length: 5 }, (_, i) => {
    const angle = -50 + i * 25;
    const radius = 75; // Yarıçap

    // Dereceyi radyana çevirme
    const radian = (angle * Math.PI) / 250;

    // Merkez hizalaması
    const x = radius * Math.sin(radian);
    const y = -radius * Math.cos(radian);

    return { x, y, filled: i < rating };
  });

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="w-28 h-28 flex relative justify-center items-center group cursor-pointer mt-8 sm:mt-0"
      onClick={() => onClick(name)}
    >
      {/* Background Circle (glass) */}
      <div
        className={`w-full h-full bg-tertiary rounded-full flex justify-center items-center border  shadow-card transition-all duration-300
        ${
          isActive
            ? "border-[#915eff]"
            : "border-white/10 sm:group-hover:border-[#915eff]"
        }
      `}
      >
        <img
          src={icon}
          alt={name}
          className={`w-16 h-16 object-contain p-1 transition-all duration-300 filter
                      ${
                        isActive
                          ? "grayscale-0"
                          : "grayscale sm:group-hover:grayscale-0"
                      }
          `}
        />
      </div>

      {/* Name (hover) */}
      <div
        className={`absolute -bottom-8 transition-opacity duration-300
                    ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 sm:group-hover:opacity-100"
                    }
        `}
      >
        <p className="text-[#915eff] text-[13px] font-bold tracking-wider">
          {name}
        </p>
      </div>

      {/* Stars */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className={`absolute flex justify-center items-center transition-all duration-500
                        ${
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100"
                        }
            `}
            style={{
              transform: `translate(${star.x}px, ${star.y}px) translate(-50%, 50%)`,
            }}
          >
            <Star filled={star.filled} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Tech = () => {
  const { t } = useTranslation();

  // Hangi teknolojinin aktif olduğunu tutan state
  const [activeTech, setActiveTech] = useState(null);

  // Tıklama fonksiyonu
  const handleTechClick = (techName) => {
    // Eğer zaten aktif olana tıkladıysa kapat (null yap), değilse yenisini aç
    setActiveTech(activeTech === techName ? null : techName);
  };
  return (
    <>
      <motion.div variants={textVariant()} className="mb-10 text-center">
        <p className={styles.sectionSubText}>{t("tech.subtitle")}</p>
        <h2 className={styles.sectionHeadText}>{t("tech.heading")}</h2>
        <p className="text-secondary text-[14px] mt-2">{t("tech.info")}</p>
      </motion.div>

      <div className="flex flex-row flex-wrap justify-center items-center gap-10">
        {technologies.map((technology, index) => (
          <TechCard
            key={technology.name}
            index={index}
            {...technology}
            isActive={activeTech === technology.name}
            onClick={handleTechClick}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
