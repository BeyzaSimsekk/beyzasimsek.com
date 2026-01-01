import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { educations } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Education = () => {
  const [activeLevel, setActiveLevel] = useState("university");
  const activeData = educations.find((edu) => edu.id === activeLevel);

  return (
    <div className="flex flex-col w-full">
      {/* BAŞLIK KISMI */}
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className={styles.sectionSubText}>My Academic Career</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>

      {/* İÇERİK ALANI */}
      {/* DÜZELTME: max-w-5xl ve mx-auto kaldırıldı. Artık tam genişlikte ve sola hizalı. */}
      <div className="mt-10 flex flex-col w-full">
        {/* 1. BUTONLAR (Tab Menu) */}
        <div className="flex flex-row gap-4 mb-4 w-full justify-center md:justify-start z-10">
          <button
            onClick={() => setActiveLevel("university")}
            className={`px-6 py-3 rounded-t-lg font-bold text-[16px] transition-all duration-300 border-b-2
              ${
                activeLevel === "university"
                  ? "bg-tertiary text-blue-400 border-blue-400 shadow-[0_-5px_15px_-5px_rgba(59,130,246,0.3)] translate-y-1"
                  : "bg-tertiary/50 text-gray-400 border-transparent hover:bg-tertiary hover:text-white"
              }`}
          >
            University
          </button>

          <button
            onClick={() => setActiveLevel("highschool")}
            className={`px-6 py-3 rounded-t-lg font-bold text-[16px] transition-all duration-300 border-b-2
              ${
                activeLevel === "highschool"
                  ? "bg-tertiary text-purple-400 border-purple-400 shadow-[0_-5px_15px_-5px_rgba(168,85,247,0.3)] translate-y-1"
                  : "bg-tertiary/50 text-gray-400 border-transparent hover:bg-tertiary hover:text-white"
              }`}
          >
            High School
          </button>
        </div>

        {/* 2. BİLGİ PENCERESİ (Card) */}
        <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="w-full">
          {/* DÜZELTME: min-h-[500px] ekledik. İçerik değişse de boyutu sabit kalır, zıplamaz. */}
          {/* h-auto md:min-h-[500px] -> Mobilde otomatik, Masaüstünde en az 500px */}
          <div className="bg-tertiary p-6 sm:p-10 rounded-2xl rounded-tl-none border border-white/10 relative w-full h-auto md:min-h-[350px] flex flex-col shadow-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLevel}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex-1" // İçeriğin alanı doldurması için
              >
                {/* Tarih */}
                <p className="text-secondary text-[14px] sm:text-[16px] font-semibold tracking-wider uppercase">
                  {activeData.date}
                </p>

                {/* Okul Adı */}
                <h3 className="text-white font-bold text-[24px] sm:text-[32px] mt-2">
                  {activeData.school_name}
                </h3>

                {/* Bölüm */}
                <p className="text-white/70 text-[16px] sm:text-[18px] mt-1 italic">
                  {activeData.department}
                </p>

                {/* Derece Etiketi */}
                <span
                  className={`mt-4 inline-block px-4 py-1 rounded-md text-[14px] font-bold border
                  ${
                    activeLevel === "university"
                      ? "text-blue-400 border-blue-400/50 bg-blue-900/20"
                      : "text-purple-400 border-purple-400/50 bg-purple-900/20"
                  }`}
                >
                  {activeData.title}
                </span>

                {/* Maddeler */}
                <ul className="mt-6 list-disc ml-5 space-y-3">
                  {activeData.points.map((point, index) => (
                    <li
                      key={index}
                      className="text-white-100 text-[14px] sm:text-[15px] pl-1 tracking-wider leading-relaxed"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Arkaplan İkonu */}
            <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
              <img
                src={activeData.icon}
                alt="icon"
                className="w-32 h-32 sm:w-48 sm:h-48 object-contain grayscale"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Education, "education");
