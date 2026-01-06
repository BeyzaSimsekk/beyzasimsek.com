import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitch = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-black/40 p-1 rounded-full border border-white/10">
      {["en", "tr"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 text-sm rounded-full transition-all
            ${
              lang === l
                ? "bg-[#915eff] shadow-[0_0_5px_#915eff,0_0_5px_#915eff,0_0_5px_#915eff] text-white"
                : "text-secondary"
            }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary/60 backdrop-blur-md border-b border-white/10 rounded-b-xl`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="flex flex-row justify-center items-center gap-1 sm:gap-4 hover:scale-105 transition transform duration-500">
            <img
              src={logo}
              alt="logo"
              className="w-18 h-18  object-contain  sm:w-13 sm:h-13"
            />
            <p className="text-white text-[18px] font-bold cursor-pointer flex">
              <span className="text-white transition-all duration-300 [text-shadow:0_0_7px_#915eff,0_0_15px_#915eff] hover:[text-shadow:0_0_10px_#915eff,0_0_20px_#915eff,0_0_30px_#915eff] mr-4">
                Beyza Simsek{" "}
              </span>
            </p>
          </div>
        </Link>
        {/* Desktop Menu */}
        <ul className="list-none hidden md:flex flex-row gap-10 justify-center items-center">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white hover:scale-105 transition transform ease-in-out text-[17px] lg:text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          <div className="hidden sm:block">
            <LanguageSwitch />
          </div>
        </ul>
        {/* Mobile Menu */}
        <div className="md:hidden flex flex-1 justify-end items-center p-5">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition transform duration-300"
            onClick={() => setToggle(!toggle)}
          />

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute top-20 right-4 w-[220px] rounded-2xl
                 bg-tertiary/90 backdrop-blur-xl
                 border border-white/10 shadow-2xl z-50 p-5"
              >
                <div className="mb-4 border-b border-white/10 pb-4 flex justify-center">
                  <LanguageSwitch />
                </div>
                <ul className="flex flex-col gap-4">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="text-secondary hover:text-white text-[16px]"
                      onClick={() => {
                        setToggle(false);
                        setActive(link.title);
                      }}
                    >
                      <a href={`#${link.id}`}>{link.title}</a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
