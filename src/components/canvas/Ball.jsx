import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    // Boyutu burada zorunlu kılıyoruz ki Canvas küçülmesin
    <div className="w-28 h-28 relative flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!showCanvas ? (
          <motion.div
            key="icon"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setShowCanvas(true)}
            className="w-full h-full bg-fourth rounded-full flex items-center justify-center border-2 border-[#915eff]/20 shadow-card cursor-pointer"
          >
            <img
              src={icon}
              alt="tech"
              className="w-16 h-16 object-contain select-none p-2"
            />
          </motion.div>
        ) : (
          <motion.div
            key="canvas"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="w-full h-full relative"
          >
            {/* Kapatma Butonu - Artık sağ üstte sabit ve şık */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCanvas(false);
              }}
              className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center z-100 shadow-lg transition-colors border-2 border-primary"
            >
              <span className="text-[12px] font-bold">✕</span>
            </button>

            <Canvas
              gl={{ preserveDrawingBuffer: true, powerPreference: "low-power" }}
              dpr={[1, 2]}
              // Canvas'ın konteyneri tam doldurması için
              className="w-full h-full"
            >
              <Suspense fallback={<CanvasLoader />}>
                <OrbitControls enableZoom={false} />
                <Ball imgUrl={icon} />
              </Suspense>
              <Preload all />
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BallCanvas;
