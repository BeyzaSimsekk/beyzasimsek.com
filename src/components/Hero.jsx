import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import gsap from "gsap";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const comp = useRef(null);
  const titleRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1️⃣ Hi, I'm → sade fade + hafif yukarı
      // İkisini de aynı anda başlat
      tl.fromTo(
        ".hi-text",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          immediateRender: false,
        },
        0
      );

      tl.from(
        ".letter-animation",
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.035,
          ease: "back.out(1.7)",
          clearProps: "all",
          immediateRender: false,
        },
        0
      );
    }, comp);

    return () => ctx.revert();
  }, []);

  // Hover efekti: Harfin üzerine gelince zıplama efekti (daha küçük)
  const onEnter = (e, index) => {
    setHoveredIndex(index);
    gsap.to(e.target, {
      scale: 1.15,
      y: -8,
      color: "#915eff",
      duration: 0.5,
      ease: "power1.out",
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
        style={{ opacity: 0, transform: "translateY(100px)" }}
        className={`letter-animation inline-block cursor-default transition-all duration-500 ease-out ${
          isName ? "text-[#915eff]" : "text-white"
        } ${getFontWeight(index)}`}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section className="relative w-full h-screen mx-auto" ref={comp}>
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
        <div className="flex flex-col gap-3">
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
          <p className={`${styles.heroSubText} text-white-100`}>
            Versatile Full-stack Developer with a passion for frontend
            excellence. <br className="sm:block hidden" /> Crafting
            high-performance applications using React, Node.js, and React Native
            with a keen eye for UI/UX.
          </p>
        </div>
      </div>
      <ComputersCanvas />
    </section>
  );
};

export default Hero;
