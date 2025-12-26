import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const meshRef = useRef();

  if (decal) {
    decal.anisotropy = 16; // Kenar yumuşatma ve netlik artırır
  }

  // Döndürme animasyonu
  // useFrame her render karesinde çalışır
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Y ekseninde (sağa sola) sınırlı salınım
    // 0.4 katsayısı dönüş açısını belirler (yaklaşık 23 derece sağa-sola)
    // 1.5 katsayısı ise salınım hızını belirler
    meshRef.current.rotation.y = Math.sin(time * 0.75) * 0.3;

    // Hafif bir yukarı-aşağı (X ekseni) salınım ekleyerek daha derinlik katabiliriz
    meshRef.current.rotation.x = Math.cos(time * 0.75) * 0.1;
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 0, 1]} intensity={1.5} />
      <pointLight position={[-1, 1, 1]} intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <mesh ref={meshRef} castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          roughness={0.5}
          metalness={0.1}
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
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.2; // Genel parlaklığı artırır
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
