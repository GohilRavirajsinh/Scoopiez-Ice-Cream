import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
/* ── Ice Cream Scoop ── */
const Scoop = ({ position, color, speed = 1 }) => {
    const ref = useRef(null);
    useFrame((_, delta) => {
        ref.current.rotation.y += delta * 0.3 * speed;
    });
    return (<Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={ref} position={position} castShadow>
        <sphereGeometry args={[0.55, 32, 32]}/>
        <MeshDistortMaterial color={color} distort={0.25} speed={2} roughness={0.3} metalness={0.1}/>
      </mesh>
    </Float>);
};
/* ── Waffle Cone ── */
const Cone = () => {
    const ref = useRef(null);
    useFrame((_, delta) => {
        ref.current.rotation.y += delta * 0.15;
    });
    return (<mesh ref={ref} position={[0, -1.2, 0]} castShadow>
      <coneGeometry args={[0.55, 1.6, 16]}/>
      <meshStandardMaterial color="#D2A24C" roughness={0.8}/>
    </mesh>);
};
/* ── Sprinkles (tiny floating particles) ── */
const Sprinkles = () => {
    const count = 40;
    const ref = useRef(null);
    const dummy = new THREE.Object3D();
    const colors = ["#FF6B9D", "#FFD93D", "#6BCB77", "#4D96FF", "#FF922B"];
    useFrame((state) => {
        for (let i = 0; i < count; i++) {
            const t = state.clock.elapsedTime + i * 100;
            dummy.position.set(Math.sin(t * 0.3 + i) * 2.5, Math.cos(t * 0.2 + i * 0.5) * 2, Math.sin(t * 0.4 + i * 0.3) * 1.5 - 1);
            dummy.rotation.set(t * 0.5, t * 0.3, t * 0.7);
            dummy.scale.setScalar(0.06 + Math.sin(t) * 0.02);
            dummy.updateMatrix();
            ref.current.setMatrixAt(i, dummy.matrix);
        }
        ref.current.instanceMatrix.needsUpdate = true;
    });
    const colorArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const c = new THREE.Color(colors[i % colors.length]);
        colorArray.set([c.r, c.g, c.b], i * 3);
    }
    return (<instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <capsuleGeometry args={[0.03, 0.12, 4, 8]}/>
      <meshStandardMaterial vertexColors/>
      <instancedBufferAttribute attach="geometry-attributes-color" args={[colorArray, 3]}/>
    </instancedMesh>);
};
/* ── Main Scene ── */
const IceCreamScene = ({ className = "" }) => (<div className={`w-full h-full ${className}`}>
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6}/>
      <directionalLight position={[3, 5, 4]} intensity={1.2}/>
      <pointLight position={[-3, 2, 2]} color="#FF6B9D" intensity={0.8}/>
      <pointLight position={[3, -1, 2]} color="#FFD93D" intensity={0.5}/>

      {/* Triple scoop */}
      <Scoop position={[0, 0.55, 0]} color="#93C572" speed={1.2}/> {/* Pistachio */}
      <Scoop position={[-0.45, -0.05, 0.15]} color="#F3E5AB" speed={0.8}/> {/* Vanilla Bourbon */}
      <Scoop position={[0.45, -0.05, 0.15]} color="#2E1503" speed={1}/> {/* Midnight Truffle */}
      <Cone />
      <Sprinkles />
    </Canvas>
  </div>);
export default IceCreamScene;
