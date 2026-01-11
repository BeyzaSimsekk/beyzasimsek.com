import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

// --- CV MODAL COMPONENT ---
const CVModal = ({ onClose, currentLang }) => {
  // Modal animasyonları
  const dropIn = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: { y: "100vh", opacity: 0 },
  };
  const cvFile = currentLang === "tr" ? "/cv_tr.pdf" : "/cv_en.pdf";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Arka plana tıklayınca kapanır
    >
      <motion.div
        onClick={(e) => e.stopPropagation()} // İçeriğe tıklayınca kapanmasın
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-[#1d1836] border border-[#915eff] p-6 rounded-2xl w-full max-w-4xl flex flex-col items-center shadow-[0_0_30px_rgba(145,94,255,0.4)] relative"
      >
        {/* Header: Başlık ve Kapat Butonu */}
        <div className="w-full flex justify-between items-center mb-4 border-b border-white/10 pb-2">
          <h3 className="text-white text-[20px] font-bold">
            {currentLang === "en" ? "Resume Preview" : "Özgeçmiş Önizleme"}
          </h3>
          <button
            onClick={onClose}
            className="text-secondary hover:text-white transition text-3xl cursor-pointer "
          >
            &times;
          </button>
        </div>

        {/* PDF PREVIEW ALANI (IFRAME) */}
        <div className="w-full h-[60vh] bg-white/5 rounded-lg overflow-hidden border border-white/10 mb-6">
          <iframe
            src={`${cvFile}#toolbar=0&navpanes=0&scrollbar=0`} // Araç çubuklarını gizlemeye çalışır
            title="CV Preview"
            className="w-full h-full object-cover"
            style={{ border: "none" }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href={cvFile}
            download
            className="bg-[#915eff] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-white hover:text-[#915eff] transition-all duration-300 flex items-center gap-2"
          >
            {/* İndirme İkonu (SVG) */}
            <svg
              className="w-5 h-5 fill-white group-hover:animate-bounce"
              viewBox="0 0 24 24"
            >
              <path d="M12 16L7 11H10V4H14V11H17L12 16ZM12 18C16.4183 18 20 18 20 18V20H4V18C4 18 7.58172 18 12 18Z" />
            </svg>
            {currentLang === "en" ? "Download PDF" : "PDF Olarak İndir"}
          </a>
          <button
            onClick={onClose}
            className="text-secondary hover:text-white text-sm mt-2 underline decoration-secondary hover:decoration-white transition-all"
          >
            {currentLang === "en" ? "Close" : "Kapat"}
          </button>
        </div>
        {/* Köşe Süsü */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-[#915eff]/20 to-transparent rounded-tr-2xl pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

// --- LANGUAGE SWITCH COMPONENT ---
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
  const [showCVModal, setShowCVModal] = useState(false);
  const { t } = useTranslation();
  const { lang } = useLanguage(); // Modal için dil

  const handleLogoClick = () => {
    setActive("");
    window.scrollTo(0, 0);

    // Mobil kontrolü: Ekran genişliği 768px'den büyükse modalı aç
    if (window.innerWidth > 768) {
      setShowCVModal(true);
    }
    // Değilse (mobildeyse) sadece yukarıdaki scroll ve active sıfırlama çalışır, modal açılmaz.
  };

  return (
    <>
      <nav
        className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary/60 backdrop-blur-md border-b border-white/10 rounded-b-xl`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 group cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="flex flex-row justify-center items-center gap-1 sm:gap-4 hover:scale-105 transition transform duration-500">
              <img
                src={logo}
                alt="logo"
                className="w-18 h-18  object-contain  sm:w-13 sm:h-13"
              />
              <p className="text-white text-[18px] font-bold cursor-pointer flex">
                <span className="text-white transition-all duration-300 [text-shadow:0_0_7px_#915eff,0_0_15px_#915eff] hover:[text-shadow:0_0_10px_#915eff,0_0_20px_#915eff,0_0_30px_#915eff] mr-4">
                  Beyza Şimşek{" "}
                </span>
              </p>
              {/* Desktop için Hover İpucu */}
              <div className="hidden sm:block overflow-hidden h-4">
                <span className="text-[10px] text-[#915eff] font-bold tracking-wider uppercase block -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {lang === "en" ? "Click for CV" : "CV için Tıkla"}
                </span>
              </div>
            </div>
          </Link>
          {/* Desktop Menu */}
          <ul className="list-none hidden md:flex flex-row gap-10 justify-center items-center">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.id ? "text-white" : "text-secondary"
                } hover:text-white transition text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.id)}
              >
                <a href={`#${link.id}`}>{t(`nav.${link.id}`)}</a>
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
                        <a href={`#${link.id}`}>{t(`nav.${link.id}`)}</a>
                      </motion.li>
                    ))}

                    {/* MOBİL İÇİN CV İNDİR BUTONU (MENU İÇİNDE) */}
                    <motion.li
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-[#915eff] font-bold mt-2 cursor-pointer border-t border-white/10 pt-2 flex items-center gap-2"
                      onClick={() => {
                        setToggle(false);
                        setShowCVModal(true);
                      }}
                    >
                      <span>📄</span>{" "}
                      {lang === "en" ? "Review CV" : "CV İncele"}
                    </motion.li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* CV Modal - Navbar dışında render edilir */}
      <AnimatePresence>
        {showCVModal && (
          <CVModal onClose={() => setShowCVModal(false)} currentLang={lang} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
