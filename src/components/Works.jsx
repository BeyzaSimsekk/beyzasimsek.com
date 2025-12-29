import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";

import { fadeIn, textVariant } from "../utils/motion";

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          The following projects highlight my skills and experience through
          real-world examples. Each project includes a brief description with
          links to public code repositories, and some also feature live demos.
          They demonstrate my ability to tackle complex problems, work across
          diverse technologies, and manage projects effectively, while
          consistently highlighting my strengths in UI/UX and frontend
          development.
        </motion.p>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
