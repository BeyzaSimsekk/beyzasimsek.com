import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logo } from "../assets"; // Senin logo importun

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  // İlerleme çubuğunu simüle eden efekt
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Rastgele artışlarla doğal yükleme hissi
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    // 2.5 saniye sonra Splash'i kapat
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Animasyon Varyantları
  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const logoVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { duration: 1.2, type: "spring", stiffness: 80 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#050816]" // Senin arkaplan rengin
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* İçerik Container */}
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-[300px]">
        {/* LOGO */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="relative w-32 h-32 mb-4"
        >
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(145,94,255,0.5)]"
          />
        </motion.div>

        {/* İSİM & ÜNVAN */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wider font-primary">
            Beyza Şimşek
          </h1>
          <p className="text-[#915eff] text-sm uppercase tracking-[0.2em] font-medium">
            Junior Web Developer
          </p>
        </motion.div>

        {/* PROGRESS BAR */}
        <motion.div
          className="w-full h-0.5 bg-[#1d1836] rounded-full mt-8 overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full bg-linear-to-r from-[#915eff] to-[#bf61ff]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
            style={{
              boxShadow: "0 0 10px #915eff",
            }}
          />
        </motion.div>

        {/* Yüzde Yazısı (Opsiyonel) */}
        <motion.p
          className="text-gray-500 text-xs mt-2 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {Math.round(progress)}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
