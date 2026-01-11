import React from "react";

const Footer = () => {
  return (
    <div className="p-6 border-t border-white/10 bg-[#0c0a1f]">
      <div className="flex flex-col items-center gap-3 text-center">
        {/* Copyright Watermark */}
        <p className="text-[15px] text-white/40 font-light cursor-default">
          © 2026 Designed & Built by{" "}
          <a
            href="https://github.com/BeyzaSimsekk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#915eff] font-semibold hover:text-white hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(145,94,255,0.8)] cursor-pointer transition transform duration-300"
          >
            Beyza Şimşek
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
