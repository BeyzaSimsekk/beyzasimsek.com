import {
  mobile,
  frontend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  github_t,
  expressjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  github,
  expo,
  python,
  kos,
  yetgen,
  oua,
  aselsan,
  teknofest,
  KFAU_Academy,
  SHOPIX,
  Resumai,
  BYZAI,
  Molix,
  Foodix,
  kfau,
  mal,
  linkedin,
  medium,
  youtube,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "project",
    title: "Project",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Frontend Developer",
    icon: frontend,
  },
  {
    title: "UI/UX Designer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Github",
    icon: github_t,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Expo",
    icon: expo,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Express JS",
    icon: expressjs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
];

const projects = [
  {
    name: "KFAU Academy",
    description:
      "A collaborative learning platform that centralizes lecture notes, videos, and announcements, enabling university students to share resources easily and enhance academic engagement.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "expressjs",
        color: "pink-text-gradient",
      },
      {
        name: "nodejs",
        color: "purple-text-gradient",
      },
    ],
    image: KFAU_Academy,
    source_code_link: "https://github.com/KFAU-Academy/KFAUAcademy_GraduationProject",
  },
  {
    name: "SHOPIX",
    description:
      "A fully functional E-Commerce Platform built with React, Node.js (Express), and MongoDB — featuring Stripe payments, an Admin Dashboard, and a modern responsive UI.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "nodejs",
        color: "purple-text-gradient",
      },
      {
        name: "stripe",
        color: "orange-text-gradient",
      },
    ],
    image: SHOPIX,
    source_code_link: "https://github.com/BeyzaSimsekk/SHOPIX_E-Commerce_App",
  },
  {
    name: "RESUMAI",
    description:
      "An AI-driven Resume Analyzer built with React Router, TailwindCSS, and Puter AI API. Upload your resume, and let the system automatically analyze it for strengths, weaknesses, and job-fit score.",
    tags: [
      {
        name: "react 19",
        color: "blue-text-gradient",
      },
      {
        name: "puter.ai",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "zustand",
        color: "purple-text-gradient",
      },
    ],
    image: Resumai,
    source_code_link: "https://github.com/BeyzaSimsekk/RESUMAI_AI_Resume_Analyzer",
  },
  {
    name: "BYZAI",
    description:
      "A ChatGPT-style AI chat application built with React, Vite, and MongoDB, featuring user authentication, persistent chat history, and Google Gemini integration for dynamic AI-driven conversations.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "imagekit",
        color: "pink-text-gradient",
      },
      {
        name: "geminiAPI",
        color: "purple-text-gradient",
      },
    ],
    image: BYZAI,
    source_code_link: "https://github.com/BeyzaSimsekk/BYZAI_chatgpt_clone",
  },
  {
    name: "Molix",
    description:
      "A React Native movie discovery app that fetches real-time data from TMDB, featuring latest and trending movies, secure authentication, a personal watchlist, searchable content, and Appwrite-powered metrics to improve recommendations.",
    tags: [
      {
        name: "react native",
        color: "blue-text-gradient",
      },
      {
        name: "expo",
        color: "green-text-gradient",
      },
      {
        name: "appwrite",
        color: "pink-text-gradient",
      },
    ],
    image: Molix,
    source_code_link: "https://github.com/BeyzaSimsekk/mobile_movie_app",
  },
  {
    name: "Foodix",
    description:
      "A React Native food ordering app that pulls real-time menu data from Appwrite, featuring product browsing, filtering and search, secure authentication, a full cart system with price calculation, and a polished, user-friendly UI design.",
    tags: [
      {
        name: "react native",
        color: "blue-text-gradient",
      },
      {
        name: "expo",
        color: "green-text-gradient",
      },
      {
        name: "appwrite",
        color: "pink-text-gradient",
      },
    ],
    image: Foodix,
    source_code_link: "https://github.com/BeyzaSimsekk/Food_Ordering_App",
  },
];

const experiences = [
  {
    title: "Finalist | UI/UX Designer",
    company_name: "Teknofest",
    icon: teknofest,
    iconBg: "#dfe3f2",
    date: "January 2024 - September 2024",
    points: [
        "Conducted comprehensive user research, competitive analysis, and requirement gathering to define core product needs.",
        "Designed end-to-end user flows, wireframes, and high-fidelity UI screens aligned with usability principles and brand identity.",
        "Developed interactive prototypes using industry-standard tools to validate concepts and refine user experience.",
        "Collaborated closely with software developers, mentors, and teammates to iterate on design decisions and improve product functionality.",
        "Tested and evaluated user interactions to enhance accessibility, clarity, and overall user satisfaction.",
        "Presented design rationale, research findings, and final prototypes to the Teknofest jury as part of the finalist evaluation process.",
    ],
  },
  {
    title: "Intern",
    company_name: "Aselsan",
    icon: aselsan,
    iconBg: "#0B2F87",
    date: "July 2024 - August 2024",
    points: [
        "Worked on computer vision pipelines involving YOLO models, post-training quantization workflows, and ONNX-based inference processes.",
        "Contributed to data preprocessing, calibration dataset preparation, and model validation activities to ensure reliable performance.",
        "Participated in the integration of optimized AI models into existing software systems, improving efficiency and runtime performance.",
        "Collaborated with domain experts and engineers within the a-Gelecek Program to analyze requirements, troubleshoot issues, and produce high-quality deliverables.",
    ],
  },
  {
    title: "Participant",
    company_name: "Google Game & App Academy",
    icon: oua,
    iconBg: "#ffffff",
    date: "November 2023 - May 2023",
    points: [
        "Completed structured training in 2D and 3D game development using Unity, covering gameplay mechanics, asset management, and basic C# scripting.",
        "Improved project planning and coordination capabilities through Google’s Project Management curriculum, applying agile principles to software development tasks.",
        "Strengthened entrepreneurial mindset by learning product-market fit, business modeling, and pitching fundamentals tailored to game and app development.",
        "Collaborated with mentors and peers to design, iterate, and present game concepts, gaining practical experience in both creative and technical workflows.",
    ],
  },
  {
    title: "Participant",
    company_name: "Yetkin Gençler",
    icon: yetgen,
    iconBg: "#E6DEDD",
    date: "August 2023 - November 2023",
    points: [
        "Completed the 21st Century Awareness Training covering effective presentation techniques, teamwork, Excel-based modeling, and multiple domain literacies including information, media, finance, and health.",
        "Enhanced problem-solving and critical-thinking capabilities through modules on social innovation and entrepreneurship, including the GirişGen (Idea Marathon) program.",
        "Strengthened communication and collaboration skills by actively participating in group tasks, workshops, and peer-learning activities.",
        "Integrated the acquired competencies into academic, professional, and personal workflows, improving adaptability and overall performance.",
        "Contributed as a writer for YetGen’s Medium publication (Yetkin Yayın) between September 2023 and July 2024, producing content that supports community learning and visibility.",
    ],
  },
  {
    title: "Intern Web Developer",
    company_name: "Konya Organized Industrial Zone",
    icon: kos,
    iconBg: "#FFFFFF",
    date: "July 2023 - August 2023",
    points: [
        "Developed four web-based mini projects as part of a 20-day internship within the Network and Systems Unit.",
        "Worked with core web technologies including HTML, CSS, and JavaScript, and implemented simple backend structures to support project functionality.",
        "Contributed to end-to-end web development workflows such as UI design, styling, data handling, and basic deployment procedures.",
        "Collaborated with supervising engineers to refine code quality, understand best practices, and strengthen overall web development competencies.",
    ],
  },
];

const educations = [
  {
    id: "university",
    title: "Bachelor's Degree",
    school_name: "Konya Food & Agriculture University",
    department: "Computer Engineering",
    date: "Sep 2021 - July 2025",
    icon: kfau,
    points: [
      "Graduated with a GPA of 3.77/4.00, ranking second in the faculty.",
      "Developed 'KFAU Academy' as a senior graduation project.",
      "Specialized in Web Technologies, Mobile App Development, and UI/UX Design.",
    ],
  },
  {
    id: "highschool",
    title: "High School Diploma",
    school_name: "Meram Anatolian High School",
    department: "Graduated (Science Track)",
    date: "Sep 2017 - Jun 2021",
    icon: mal,
    points: [
      "Graduated with a GPA of 98.17/100.", 
      "Member of the Book Interpretation Community.", 
      "Participated in the English Knowledge Competition.",
    ],
  },
];

const socialLinks = [
  {
    name: "Github",
    url: "https://github.com/BeyzaSimsekk",
    icon: github,
  },
  {
    name: "Linkedin",
    url: "https://linkedin.com/in/beyzasimsek",
    icon: linkedin, 
  },
  {
    name: "Medium",
    url: "https://medium.com/@beyzasimsek", 
    icon: medium, 
  },
  {
    name: "Youtube",
    url: "https://youtube.com/@kanaladin", 
    icon: youtube,
  },
];

export { services, technologies, experiences, projects, educations, socialLinks };