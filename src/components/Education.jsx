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
          <div className="absolute top-10 left-5 flex flex-col gap-4 z-10"></div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
