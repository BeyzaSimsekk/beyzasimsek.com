import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const comp = useRef(null);
  const titleRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sliderRef = useRef(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hi-text, .letter-animation",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          stagger: 0.02,
        }
      );

      //GSAP İLE KAYAN YAZI
      gsap.to(sliderRef.current, {
        xPercent: -50, // Metnin yarısı kadar kaydır
        repeat: -1, // Sonsuz döngü
        duration: 60, // Metnin hızı
        ease: "none", // Takılmasız lineer akış
      });
    }, comp);

    return () => ctx.revert();
  }, []);

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
    <section className="relative w-full h-screen mx-auto" ref={comp}>
      {/* GSAP Slider Container */}
      <div className="block absolute top-[65%] left-0 w-full z-0 pointer-events-none select-none opacity-[0.05] overflow-hidden">
        <div
          ref={sliderRef}
          className="flex flex-row whitespace-nowrap w-max" // w-max: Metnin genişliği neyse o kadar yer kapla (kısıtlama)
        >
          {/* Metni yan yana 2 kez koyuyoruz */}
          <div className="flex flex-row items-center gap-10 sm:gap-20 text-white text-[120px] sm:text-[180px] font-black uppercase">
            <span>Junior Web Developer • Frontend • Backend • UI/UX •</span>
            <span>Junior Web Developer • Frontend • Backend • UI/UX •</span>
          </div>
        </div>
      </div>
      {/* Hero Container */}
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
        <div className="flex sm:flex-row flex-col sm:gap-10 gap-2 items-center align-middle ">
          <div className="flex flex-col gap-5 z-10">
            <h1
              ref={titleRef}
              className={`${styles.heroHeadText} flex flex-wrap whitespace-nowrap overflow-hidden cursor-default`}
            >
              <div className="flex items-baseline">
                {/* SADE GİRİŞ */}
                <span className="hi-text opacity-0">{t("hero.title")}</span>
                &nbsp;
                {/* HARF ANİMASYONU */}
                <span className="ml-1 sm:ml-2 text-[#915eff]">
                  {splitText("Beyza", true)}
                </span>
              </div>
            </h1>

            <p className={`${styles.heroSubText} text-white-100 mb-10`}>
              {t("hero.sub_before")}{" "}
              <span className="text-[#b192ff] transition-all duration-300 [text-shadow:0_0_10px_#915eff,0_0_20px_#915eff,0_0_30px_#915eff]">
                {" "}
                {t("hero.sub_highlight")}{" "}
              </span>{" "}
              {t("hero.sub_after_line1")} <br className="sm:block hidden" />{" "}
              {t("hero.sub_after_line2")}
            </p>
          </div>
          <motion.div
            initial={{ y: -5 }}
            animate={{ y: [-10, 5, -10] }} // Yukarı aşağı süzülme hareketi
            transition={{
              duration: 4, // 4 saniyede bir tur
              repeat: Infinity, // Sonsuz döngü
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="relative z-10" // Z-index ile öne çıkardık
          >
            <img
              src="/hero_logo.png"
              alt="Hero Logo"
              draggable="false"
              className="sm:w-80 w-60 sm:mt-7 mt-2 mr-9 sm:mr-0 select-none object-contain filter drop-shadow-[0_0_20px_rgba(145,94,255,0.4)] hover:drop-shadow-[0_0_35px_rgba(145,94,255,0.8)] transition-all duration-300 ease-in-out"
            />

            {/* Neon Glow Efekti */}
            <div className="absolute inset-0 bg-[#915eff] opacity-20 blur-[60px] rounded-full -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-8 right-8 sm:bottom-4 sm:right-10 md:bottom-4 md:right-12 lg:bottom-2 lg:right-1/2 lg:translate-x-1/2 z-15">
        <a href="#about">
          <div className="w-[35px] h-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2 transition-all duration-300 hover:border-white hover:[box-shadow:0_0_10px_#fff,0_0_10px_#d8b4fe,0_0_10px_#915eff]">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1 "
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
