import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";

// Asansörün kendisi (Platform)
const Elevator = ({ currentLevel }) => {
  const meshRef = useRef();

  // Hedef Y pozisyonu: Üniversite (level 1) ise 0, Lise (level 0) ise -3 (aşağı)
  const targetY = currentLevel === "university" ? 0 : -3.5;

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Yumuşak geçiş (Lerp) - Asansör hareketi
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.05 // Hız
    );

    // Hafif süzülme efekti (Floating)
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.002;
  });

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* --- ZEMİN --- */}
      {/* Ana Platform */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.2, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.9} />
      </mesh>

      {/* Neon Halka (Zemin Kenarı) */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[2.55, 2.55, 0.1, 32]} />
        <meshStandardMaterial
          color="#915eff"
          emissive="#915eff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* --- KORKULUKLAR --- */}
      {/* Arka Panel */}
      <mesh position={[0, 1.5, -2]}>
        <boxGeometry args={[5, 3, 0.1]} />
        <meshStandardMaterial color="#2b2b2b" metalness={0.9} roughness={0.7} />
      </mesh>

      {/* Arka Panel Neon Çizgiler */}
      <mesh position={[0, 1.5, -1.94]}>
        <planeGeometry args={[0.1, 2.8]} />
        <meshStandardMaterial
          color="#00cea8"
          emissive="#00cea8"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* Yan Korkuluklar (Cam) */}
      <mesh position={[-1.7, 1.32, 0]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.1, 3, 5.5]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.5} // Cam özelliği
          opacity={0.3}
          transparent
          roughness={0}
        />
      </mesh>
      <mesh position={[1.7, 1.32, 0]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.1, 3, 5.5]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.5}
          opacity={0.3}
          transparent
          roughness={0}
        />
      </mesh>

      {/* İç Işıklandırma */}
      <spotLight
        position={[0, 4, 0]}
        intensity={20}
        color="#fff3d4"
        distance={15}
      />
    </group>
  );
};

const PlatformCanvas = ({ currentLevel }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 8], fov: 50 }} // Kamera sabit
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      <Suspense fallback={<CanvasLoader />}>
        <Elevator currentLevel={currentLevel} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default PlatformCanvas;
