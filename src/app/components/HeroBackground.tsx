"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function GlassCube() {
  const mesh = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    // Y: constant slow spin, mouse X speeds it up or slows/reverses it
    mesh.current.rotation.y += (0.25 + target.current.x * 1.2) * delta;
    // X: tilt toward mouse Y position, damp back to level when idle
    mesh.current.rotation.x +=
      (-target.current.y * 0.5 - mesh.current.rotation.x) * 0.04;
  });

  return (
    <mesh ref={mesh} position={[1.5, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <MeshTransmissionMaterial
        color="#c7d2fe"
        thickness={0.3}
        roughness={0.05}
        transmission={0.96}
        ior={1.45}
        chromaticAberration={0.04}
        backside
      />
    </mesh>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#eef2ff"]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <directionalLight position={[-3, 2, 1]} intensity={0.8} color="#a5b4fc" />
        <GlassCube />
      </Canvas>
    </div>
  );
}
