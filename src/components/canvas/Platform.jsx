import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";

const Elevator = ({ currentLevel }) => {};

const PlatformCanvas = ({ currentLevel }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 8], fov: 50 }} // Kamera sabit
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Elevator currentLevel={currentLevel} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default PlatformCanvas;
