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

  // Scroll Logic States
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { t } = useTranslation();
  const { lang } = useLanguage(); // Modal için dil

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Aşağı kaydırıyorsa ve belli bir miktar (100px) indiyse gizle
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        // Yukarı kaydırıyorsa göster
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Menü açıldığında body scroll'u kilitlemek için
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [toggle]);

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
        className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-40 bg-primary/80 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ease-in-out`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-100%)", // Scroll logic
        }}
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
          <div className="md:hidden flex flex-1 justify-end items-center">
            <img
              src={menu} // Sadece açma ikonu (menu). Kapatma ikonu sidebar'ın içinde olacak.
              alt="menu"
              className="w-8 h-8 object-contain cursor-pointer hover:scale-110 transition transform duration-300"
              onClick={() => setToggle(true)}
            />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {toggle && (
          <>
            {/* 1. Backdrop Overlay (Tıklayınca kapanır) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setToggle(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* 2. Sidebar Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-screen w-[75%] sm:w-[50%] bg-[#100d25] z-50 shadow-2xl flex flex-col border-l border-white/10"
            >
              {/* Sidebar Header: Close Button */}
              <div className="flex justify-end p-6 border-b border-white/10">
                <img
                  src={close}
                  alt="close"
                  className="w-8 h-8 object-contain cursor-pointer hover:rotate-90 transition duration-300"
                  onClick={() => setToggle(false)}
                />
              </div>

              {/* Sidebar Body: Links */}
              <div className="flex-1 flex flex-col items-center justify-start pt-10 gap-8 overflow-y-auto">
                <div className="scale-125 mb-4">
                  <LanguageSwitch />
                </div>

                <ul className="list-none flex flex-col gap-8 items-center">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className={`${
                        active === link.title ? "text-white" : "text-secondary"
                      } font-medium cursor-pointer text-[20px] hover:text-white transition-colors`}
                      onClick={() => {
                        setToggle(false);
                        setActive(link.title);
                      }}
                    >
                      <a href={`#${link.id}`}>{t(`nav.${link.id}`)}</a>
                    </motion.li>
                  ))}

                  {/* Mobile CV Button */}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#915eff] font-bold text-[18px] cursor-pointer flex items-center gap-2 px-4 py-2 border border-[#915eff]/30 rounded-lg hover:bg-[#915eff]/10"
                    onClick={() => {
                      setToggle(false);
                      setShowCVModal(true);
                    }}
                  >
                    <span>📄</span> {lang === "en" ? "Review CV" : "CV İncele"}
                  </motion.li>
                </ul>
              </div>

              {/* Sidebar Footer: Copyright & Github */}
              <div className="p-6 border-t border-white/10 bg-[#0c0a1f]">
                <div className="flex flex-col items-center gap-3 text-center">
                  {/* Github Link */}
                  <a
                    href="https://github.com/BeyzaSimsekk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
                  >
                    {/* Basit Github SVG ikonu */}
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-sm font-medium">BeyzaSimsekk</span>
                  </a>

                  {/* Copyright Watermark */}
                  <p className="text-[10px] text-white/40 font-light">
                    © 2026 Designed & Built by{" "}
                    <span className="text-[#915eff]">Beyza Şimşek</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
