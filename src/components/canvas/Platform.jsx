import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Preload,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

// --- 1. KAMERA KONTROL BİLEŞENİ (YENİ) ---
// Bu bileşen Canvas'ın içinde durur ve ekran boyutu değişince kamerayı hareket ettirir.
const CameraRig = ({ isMobile, isExtraSmall }) => {
  const { camera } = useThree();

  // Hedef Z pozisyonunu belirle
  const targetZ = isExtraSmall ? 11 : isMobile ? 10 : 9;

  useFrame((state, delta) => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
  });

  return null; // Görünür bir şey render etmez
};

const Elevator = ({ currentLevel, isMobile, isExtraSmall }) => {
  const elevator = useGLTF("./sci_fi_elevator/scene.gltf");
  const meshRef = useRef();

  let targetY = 0;

  if (currentLevel === "university") {
    // Üniversite katı: Mobilde biraz daha aşağıda dursun ki yazıya yer kalsın
    targetY = isMobile ? 0.3 : 0.8;
  } else {
    // Lise katı: Mobilde ve Desktopta aşağı iniş mesafesi
    targetY = isMobile ? -1.0 : -1.5;
  }

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

  // Ölçeklendirme ayarı
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
  // Başlangıç değerlerini güvenli belirleyelim
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isExtraSmall: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isExtraSmall: width < 450,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      camera={{ position: [0, 1.5, 9], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2.5}
          target={[0, 0, 0]}
        />

        {/* Kamerayı yöneten görünmez bileşen */}
        <CameraRig
          isMobile={screenSize.isMobile}
          isExtraSmall={screenSize.isExtraSmall}
        />

        <Elevator
          currentLevel={currentLevel}
          isMobile={screenSize.isMobile}
          isExtraSmall={screenSize.isExtraSmall}
        />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default PlatformCanvas;
