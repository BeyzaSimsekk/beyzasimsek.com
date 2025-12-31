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
      {/* TITLE */}
      <div className="max-w-7xl mx-auto w-full px-0 sm:px-0 xl:px-2">
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className={styles.sectionSubText}>My School</p>
          <h2 className={styles.sectionHeadText}>Education.</h2>
        </motion.div>
      </div>
      {/* Ana Container */}
      <div className="sm:mt-8 mt-0 flex flex-col xl:flex-row items-start justify-center gap-8 w-full">
        {/* SOL: Asansör ve Buton Grubu */}
        <div className="flex flex-col md:flex-row items-start flex-[1.2] w-full relative">
          {/* 3D Canvas */}
          <div className="w-full h-[350px] sm:h-[450px] xl:h-[550px]">
            <PlatformCanvas currentLevel={activeLevel} />
          </div>

          {/* Butonlar */}
          <div className="flex flex-col xs:flex-row sm:flex-col xl:flex-col gap-4 z-10 w-full md:w-auto justify-center md:justify-start md:ml-[-60px] md:mt-10 px-4 md:px-0">
            <button
              onClick={() => setActiveLevel("university")}
              className={`flex-1 md:flex-none px-6 py-3 rounded-lg font-bold text-[14px] sm:text-lg transition-all duration-300 border-l-4 whitespace-nowrap
                ${
                  activeLevel === "university"
                    ? "bg-blue-900/40 text-blue-400 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105"
                    : "bg-black/40 text-gray-400 border-gray-600 hover:bg-gray-800/50"
                }`}
            >
              University
            </button>
            <button
              onClick={() => setActiveLevel("highschool")}
              className={`flex-1 md:flex-none px-6 py-3 rounded-lg font-bold text-[14px] sm:text-lg transition-all duration-300 border-l-4 whitespace-nowrap
                ${
                  activeLevel === "highschool"
                    ? "bg-purple-900/40 text-purple-400 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-105"
                    : "bg-black/40 text-gray-400 border-gray-600 hover:bg-gray-800/50"
                }`}
            >
              High School
            </button>
          </div>
        </div>

        {/* SAĞ: Bilgi Penceresi */}
        <motion.div
          variants={fadeIn("left", "tween", 0.2, 1)}
          className="flex-1 w-full px-4 md:px-0 md:mt-10"
        >
          <div className="bg-tertiary p-6 sm:p-8 rounded-2xl border border-white/10 relative min-h-[470px] w-full max-w-[500px] mx-auto xl:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLevel}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-secondary text-[14px] sm:text-[16px] font-semibold tracking-wider uppercase">
                  {activeData.date}
                </p>
                <h3 className="text-white font-bold text-[24px] sm:text-[30px] mt-2">
                  {activeData.school_name}
                </h3>
                {/* Devamı aynı kalabilir... */}
                <p className="text-white/70 text-[16px] sm:text-[18px] mt-1 italic">
                  {activeData.department}
                </p>
                <p
                  className={`mt-4 inline-block px-4 py-1 rounded-md text-[14px] font-bold border
                  ${
                    activeLevel === "university"
                      ? "text-blue-400 border-blue-400/50 bg-blue-900/20"
                      : "text-purple-400 border-purple-400/50 bg-purple-900/20"
                  }`}
                >
                  {activeData.title}
                </p>

                <ul className="mt-6 list-disc ml-5 space-y-2 sm:space-y-3">
                  {activeData.points.map((point, index) => (
                    <li
                      key={index}
                      className="text-white-100 text-[13px] sm:text-[14px] pl-1 tracking-wider leading-relaxed"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-0 right-0 p-4 opacity-10">
              <img
                src={activeData.icon}
                alt="icon"
                className="w-24 h-24 sm:w-36 sm:h-36 object-contain grayscale"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
