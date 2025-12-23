import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import gsap from "gsap";
import { ComputersCanvas } from "./canvas";
import { logo } from "../assets";

// SPLASH SCREEN BİLEŞENİ
const SplashScreen = () => (
  <div className="fixed inset-0 z-100 flex items-center justify-center bg-primary">
    <div className="flex flex-col items-center">
      <img src={logo} alt="logo" />
      <div className="w-20 h-20 border-4 border-[#915eff] border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-white font-medium animate-pulse">
        Loading Experience...
      </p>
    </div>
  </div>
);

const Hero = () => {
  const [loading, setLoading] = useState(true); // Splash ekran kontrolü
  const comp = useRef(null);
  const titleRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Splash ekranı kapatma (Örn: 2 saniye sonra veya Canvas hazır olduğunda)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 saniye ideal bir süredir
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (!loading) {
      let ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo(
          ".hi-text, .letter-animation",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.02,
          }
        );
      }, comp);
      return () => ctx.revert();
    }
  }, [loading]); // Sadece loading bittiğinde animasyon başlar

  // Hover efekti: Harfin üzerine gelince zıplama efekti
  const onEnter = (e, index) => {
    setHoveredIndex(index);
    gsap.to(e.target, {
      scale: 1.15,
      y: -8,
      color: "#915eff",
      duration: 0.5,
      ease: "power1.out",
      overwrite: "auto", // Eğer önceki animasyon bitmediyse onu ezer, titremeyi önler
    });
  };

  // Hover'dan çıkınca eski haline dönme
  const onLeave = (e) => {
    setHoveredIndex(null);
    gsap.to(e.target, {
      scale: 1,
      y: 0,
      color: "inherit",
      duration: 0.5,
      ease: "power1.inOut",
      overwrite: "auto",
    });
  };

  // Komşu harflere göre font weight belirleme
  const getFontWeight = (index) => {
    if (hoveredIndex === null) return "font-bold";

    const distance = Math.abs(index - hoveredIndex);

    if (distance === 0) return "font-black"; // Hover edilen harf
    if (distance === 1) return "font-extrabold"; // Yan komşular
    return "font-bold"; // Diğerleri
  };

  const splitText = (text, isName = false) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        onMouseEnter={(e) => onEnter(e, index)}
        onMouseLeave={onLeave}
        // Başlangıç stilini temiz tutuyoruz, GSAP zaten fromTo ile yönetecek
        className={`letter-animation inline-block cursor-default transition-colors duration-300 ${
          isName ? "text-[#915eff]" : "text-white"
        } ${getFontWeight(index)}`}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      {/* Splash Ekranı */}
      {loading && <SplashScreen />}
      <section
        className={`flex flex-col gap-5 relative w-full h-screen mx-auto ${
          loading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"
        }`}
        ref={comp}
      >
        <div
          className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
        >
          <div className="flex flex-col justify-center items-center mt-5">
            {/* Rounded ball */}
            <div className="w-5 h-5 rounded-full bg-[#915eff]" />
            {/* Vertical line */}
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>

          {/* Hero Title Container */}
          <div className="flex flex-col gap-3 z-10">
            <h1
              ref={titleRef}
              className={`${styles.heroHeadText} flex flex-wrap whitespace-nowrap overflow-hidden cursor-default`}
            >
              <div className="flex items-baseline">
                {/* SADE GİRİŞ */}
                <span className="hi-text opacity-0">Hi, I'm</span>
                &nbsp;
                {/* HARF ANİMASYONU */}
                <span className="ml-2 sm:ml-4 text-[#915eff]">
                  {splitText("Beyza", true)}
                </span>
              </div>
            </h1>
            <p className={`${styles.heroSubText} text-white-100 mb-10`}>
              Versatile Full-stack Developer with a passion for frontend
              excellence, <br className="sm:block hidden" /> specializing in
              developing high-performance web and mobile applications.
            </p>
          </div>
        </div>
        <ComputersCanvas />

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-3 xs:right-15 right-39 z-20">
          <a href="#about">
            <div className="w-[35px] h-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2 hover:border-white transition-colors">
              <motion.div
                animate={{ y: [0, 24, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-secondary mb-1"
              />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
