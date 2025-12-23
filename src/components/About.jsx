import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";

import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <section
      id="about"
      className={`${styles.padding} max-w-7xl mx-auto relative z-0 mt-20`}
    >
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a clever junior web developer passionate about frontend and
        full-stack projects, with experience in JavaScript, TypeScript, and the
        MERN stack. I also explore AI-based computer vision using Python, app
        development in Java, and systems programming in C#. With a keen eye for
        design using tools like Figma, I create user-friendly, aesthetic
        interfaces. Highly responsible and goal-oriented, I thrive on solving
        problems and bringing innovative ideas to life through code. Let's
        collaborate on your next creative venture!
      </motion.p>
    </section>
  );
};

export default About;
