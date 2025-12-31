import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";

import { fadeIn, textVariant } from "../utils/motion";

const tagStyles = {
  "blue-text-gradient": "text-blue-400 border-blue-400 bg-blue-500/10",
  "green-text-gradient": "text-green-400 border-green-400 bg-green-500/10",
  "pink-text-gradient": "text-pink-400 border-pink-400 bg-pink-500/10",
  "purple-text-gradient": "text-purple-400 border-purple-400 bg-purple-500/10",
  "orange-text-gradient": "text-orange-400 border-orange-400 bg-orange-500/10",
};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[350px] w-full"
      >
        {/* Project Image */}
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-108 transition-transform duration-300"
            >
              <img
                src={github}
                alt="github"
                className="w-7 h-7 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="mt-5 cursor-default">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        {/* Project Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={tag.name}
              className={`text-[12px] font-medium border px-3 py-1 rounded-full cursor-default ${
                tagStyles[tag.color] || "text-white border-white bg-white/10"
              }`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto w-full px-0 xl:px-4">
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className={styles.sectionSubText}>My Work</p>
          <h2 className={styles.sectionHeadText}>Projects.</h2>
        </motion.div>
      </div>

      <div className="w-full flex px-0 xl:px-4">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
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

      <div className="mt-16 flex flex-wrap gap-7 px-0 xl:px-4">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "project");
