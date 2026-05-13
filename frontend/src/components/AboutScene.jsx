import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
const OrbitingScoops = () => {
    const groupRef = useRef(null);
    const colors = ["#FF8FAB", "#FFF3B0", "#8B5E3C", "#7DCEA0", "#FFB347"];
    useFrame((state) => {
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    });
    return (<group ref={groupRef}>
      {colors.map((color, i) => {
            const angle = (i / colors.length) * Math.PI * 2;
            const r = 1.8;
            return (<Float key={i} speed={2 + i * 0.3} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh position={[Math.cos(angle) * r, Math.sin(angle) * 0.5, Math.sin(angle) * r]}>
              <sphereGeometry args={[0.3, 24, 24]}/>
              <MeshDistortMaterial color={color} distort={0.2} speed={2} roughness={0.4}/>
            </mesh>
          </Float>);
        })}
    </group>);
};
const AboutScene = ({ className = "" }) => (<div className={`w-full ${className}`} style={{ height: "280px" }}>
    <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6}/>
      <directionalLight position={[3, 4, 5]} intensity={1.1}/>
      <pointLight position={[-3, 2, 1]} color="#FFD93D" intensity={0.6}/>
      <OrbitingScoops />
    </Canvas>
  </div>);
export default AboutScene;
