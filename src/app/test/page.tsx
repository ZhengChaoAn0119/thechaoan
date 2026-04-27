// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import { MeshTransmissionMaterial } from "@react-three/drei";
// import { useRef } from "react";
// import * as THREE from "three";

// function GlassCube() {
//     const mesh = useRef<THREE.Mesh>(null);
//     const target = useRef({ x: 0, y: 0 });

//     // 監聽滑鼠
//     if (typeof window !== "undefined") {
//         window.onmousemove = (e) => {
//             target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
//             target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
//         };
//     }

//     useFrame(() => {
//         if (!mesh.current) return;

//         // 慣性移動（關鍵）
//         mesh.current.rotation.y +=
//             (target.current.x * 0.8 - mesh.current.rotation.y) * 0.05;
//         mesh.current.rotation.x +=
//             (target.current.y * 0.8 - mesh.current.rotation.x) * 0.05;
//     });

//     return (
//         <mesh ref={mesh}>
//             <boxGeometry args={[2, 2, 2]} />

//             {/* 玻璃材質 */}
//             <MeshTransmissionMaterial
//                 thickness={1}
//                 roughness={0}
//                 transmission={1}
//                 ior={1.5}
//                 chromaticAberration={0.02}
//             />
//         </mesh>
//     );
// }

// export default function Hero() {
//     return (
//         <div className="h-screen w-full">
//             <Canvas camera={{ position: [0, 0, 5] }}>
//                 {/* 光 */}
//                 <ambientLight intensity={0.5} />
//                 <directionalLight position={[5, 5, 5]} intensity={1} />

//                 {/* 玻璃方球 */}
//                 <GlassCube />
//             </Canvas>

//             {/* UI 疊在上面 */}
//             <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
//                 <h1 className="text-white text-5xl font-bold">
//                     Zheng.dev
//                 </h1>
//             </div>
//         </div>
//     );
// }



export default function Test() {
    return (
        <p>text</p>
    );
}