import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Preload,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const Elevator = ({ currentLevel, isMobile, isExtraSmall }) => {
  const elevator = useGLTF("./sci_fi_elevator/scene.gltf");
  const meshRef = useRef();

  const targetY = currentLevel === "university" ? 0.6 : -1;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // 1. Asansör Hareketi (Yumuşak Geçiş - Lerp)
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        0.05 //hız
      );

      // 2. Hafif Süzülme (Idle Animation)
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.005;
    }
  });

  const scale = isExtraSmall ? 0.35 : isMobile ? 0.45 : 0.4;

  return (
    <mesh ref={meshRef} position={[0, 1.1, 0]}>
      <ambientLight intensity={1.5} />
      <Environment preset="city" /> {/* Metali parlatan gizli içerik budur */}
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
      <pointLight position={[0, 2, 2]} intensity={5} color="#915eff" />
      <pointLight position={[-2, -2, 2]} intensity={3} color="#00d8ff" />
      {/* Model */}
      <primitive
        object={elevator.scene}
        scale={scale}
        rotation={[0, 3.2, 0]}
        position={[0, -1.8, 0]} // Modelin kendi merkezleme ayarı
      />
      <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
    </mesh>
  );
};

const PlatformCanvas = ({ currentLevel }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isExtraSmall, setIsExtraSmall] = useState(false);

  useEffect(() => {
    const smallQuery = window.matchMedia("(max-width: 450px)");
    const mobileQuery = window.matchMedia("(max-width: 640px)");

    setIsExtraSmall(smallQuery.matches);
    setIsMobile(mobileQuery.matches);

    const handleSmallChange = (e) => setIsExtraSmall(e.matches);
    const handleMobileChange = (e) => setIsMobile(e.matches);

    smallQuery.addEventListener("change", handleSmallChange);
    mobileQuery.addEventListener("change", handleMobileChange);

    return () => {
      smallQuery.removeEventListener("change", handleSmallChange);
      mobileQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      camera={{ position: [0, 1.5, isExtraSmall ? 10 : 9], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2.5}
          target={[0, 0, 0]}
        />
        <Elevator
          currentLevel={currentLevel}
          isMobile={isMobile}
          isExtraSmall={isExtraSmall}
        />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default PlatformCanvas;
