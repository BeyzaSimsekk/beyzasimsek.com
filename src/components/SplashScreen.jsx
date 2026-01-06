import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { logo } from "../assets";

const SplashScreen = ({ onComplete }) => {
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ekran boyutunu kontrol et
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px altı mobildir
    };

    // İlk açılışta kontrol et
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animasyon varyasyonları
  const logoAnimation = {
    initial: { scale: 1.5, x: 0, y: 0 },
    animate: isTypingDone
      ? {
          // MOBİL AYARLARI
          scale: isMobile ? 0.75 : 0.4,
          x: isMobile ? "-32vw" : "-40vw",
          y: isMobile ? "-42.4vh" : "-43.8vh",
        }
      : { scale: 1.5, x: 0, y: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-primary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        {/* LOGO ANIMASYONU */}
        <motion.img
          src={logo}
          alt="logo"
          initial={logoAnimation.initial}
          animate={logoAnimation.animate}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          onAnimationComplete={() => {
            if (isTypingDone) {
              setTimeout(() => {
                onComplete();
              }, 200); // Logo yerine oturduktan hemen sonra perdeyi kaldır
            }
          }}
          className="object-contain w-24 h-24 sm:w-32 sm:h-32"
        />

        {/* TYPEWRITER YAZISI */}
        <motion.div
          animate={
            isTypingDone
              ? { opacity: 0, y: 20 } // Yazı bittiğinde aşağı kayıp yok olsun
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.5 }}
          className="absolute mt-70 sm:mt-75 h-10"
        >
          <div className="text-[18px] sm:text-[26px] font-bold font-mono text-[#915eff] [text-shadow:0_0_10px_#915eff,0_0_20px_#915eff]">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Welcome to the portfolio of")
                  .pauseFor(500)
                  .callFunction(() => {
                    setIsTypingDone(true); // Yazma bitince logo hareketini tetikle
                  })
                  .start();
              }}
              options={{
                autoStart: true,
                delay: 50,
                cursor: "|",
                wrapperClassName: "typewriter-text",
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
