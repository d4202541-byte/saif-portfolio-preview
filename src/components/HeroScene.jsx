import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
function GrowthOrbit() {
  const group = useRef();
  useFrame(({ pointer, clock }, delta) => {
    if (!group.current) return;
    const target = pointer.x * 0.22 + clock.elapsedTime * 0.055;
    group.current.rotation.y +=
      (target - group.current.rotation.y) * Math.min(delta * 2, 1);
    group.current.rotation.x +=
      (-0.26 + pointer.y * 0.13 - group.current.rotation.x) *
      Math.min(delta * 2, 1);
  });
  return (
    <group ref={group} rotation={[-0.26, 0, 0.3]}>
      <mesh rotation={[1.1, 0.1, -0.1]}>
        <torusGeometry args={[1.65, 0.23, 24, 128]} />
        <meshStandardMaterial
          color="#b8ec5c"
          metalness={0.72}
          roughness={0.3}
        />
      </mesh>
      <mesh rotation={[-0.6, 0.8, 0.4]}>
        <torusGeometry args={[1.7, 0.075, 16, 128]} />
        <meshStandardMaterial
          color="#d6ff8a"
          metalness={0.6}
          roughness={0.22}
        />
      </mesh>
      <mesh rotation={[0.2, 1.2, -0.5]}>
        <torusGeometry args={[2.02, 0.012, 8, 128]} />
        <meshBasicMaterial color="#b5d89b" transparent opacity={0.55} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.12, 2]} />
        <meshStandardMaterial color="#141426" metalness={0.5} roughness={0.6} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.135, 2]} />
        <meshBasicMaterial
          color="#8b77ca"
          wireframe
          transparent
          opacity={0.38}
        />
      </mesh>
      <mesh position={[1.6, 0.9, 0.5]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#e3ffb1" />
      </mesh>
    </group>
  );
}
export default function HeroScene({ active }) {
  return (
    <div className="webgl-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.6], fov: 43 }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            gl.domElement.closest(".hero-visual").dataset.sceneLost = "true";
          });
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[3, 4, 5]}
          color="#f2ffd4"
          intensity={3.4}
        />
        <pointLight position={[-4, -1, 2]} color="#8e62ff" intensity={26} />
        <GrowthOrbit />
      </Canvas>
    </div>
  );
}
