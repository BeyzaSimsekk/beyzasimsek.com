import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { educations } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import PlatformCanvas from "./canvas/Platform";

const Education = () => {
  const [activeLevel, setActiveLevel] = useState("university");

  const activeData = educations.find((edu) => edu.id === activeLevel);

  return (
    <>
      <div className="mt-12 flex flex-col xl:flex-row gap-10 overflow-hidden">
        {/* --- SOL TARAFTAKİ 3D ALAN (MOBİLDE ÜSTTE) --- */}
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1)}
          className="flex-1 xl:h-[600px] h-[400px] relative w-full"
        >
          {/* 3D Canvas */}
          <PlatformCanvas currentLevel={activeLevel} />
          {/* Butonlar */}
          <div className="absolute top-10 left-5 flex flex-col gap-4 z-10">
            {/* Üniversite Butonu */}
            <button
              onClick={() => setActiveLevel("university")}
              className={`
                    px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 border-l-4
                    ${
                      activeLevel === "university"
                        ? "bg-blue-900/40 text-blue-400 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        : "bg-black/40 text-gray-400 border-gray-600 hover:bg-gray-800/50"
                    }
                `}
            >
              University
            </button>
            {/* Lise Butonu */}
            <button
              onClick={() => setActiveLevel("highschool")}
              className={`
                    px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 border-l-4
                    ${
                      activeLevel === "highschool"
                        ? "bg-purple-900/40 text-purple-400 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                        : "bg-black/40 text-gray-400 border-gray-600 hover:bg-gray-800/50"
                    }
                `}
            >
              High School
            </button>
          </div>
        </motion.div>

        {/* --- SAĞ TARAFTAKİ BİLGİ PENCERESİ (MOBİLDE ALTTA) --- */}
        <motion.div
          variants={fadeIn("left", "tween", 0.2, 1)}
          className="flex-1 flex flex-col justify-center"
        >
          <div className="bg-tertiary p-8 rounded-2xl border border-white/10 relative min-h-[450px] sm:w-[500px] w-full">
            {/* Animasyonlu İçerik Değişimi */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLevel}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-secondary text-[16px] font-semibold tracking-wider uppercase">
                  {activeData.date}
                </p>
                <h3 className="text-white font-bold text-[30px] mt-2">
                  {activeData.school_name}
                </h3>
                <p className="text-white/70 text-[18px] mt-1 italic">
                  {activeData.department}
                </p>
                <p className="mt-4 text-secondary text-[14px] bg-black/20 inline-block px-3 py-1 rounded-md">
                  {activeData.title}
                </p>

                <ul className="mt-8 list-disc ml-5 space-y-3">
                  {activeData.points.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className="text-white-100 text-[14px] pl-1 tracking-wider"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            {/* Arka plan dekoru */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <img
                src={activeData.icon}
                alt="icon"
                className="w-36 h-36 object-contain grayscale"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
