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
    id: "web",
    icon: web,
  },
  {
    id: "mobile",
    icon: mobile,
  },
  {
    id: "frontend",
    icon: frontend,
  },
  {
    id: "uiux",
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
    id: "Teknofest", 
    icon: teknofest,
    iconBg: "#dfe3f2",
  },
  {
    id: "Aselsan",
    icon: aselsan,
    iconBg: "#0B2F87",
  },
  {
    id: "OUA",
    icon: oua,
    iconBg: "#ffffff",
  },
  {
    id: "Yetgen",
    icon: yetgen,
    iconBg: "#E6DEDD",
  },
  {
    id: "KOS",
    icon: kos,
    iconBg: "#FFFFFF",
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
    url: "https://www.linkedin.com/in/ummu-beyza-simsek/",
    icon: linkedin, 
  },
  {
    name: "Medium",
    url: "https://medium.com/@beyza.simsek", 
    icon: medium, 
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/@totorodiaries", 
    icon: youtube,
  },
];

export { services, technologies, experiences, projects, educations, socialLinks };