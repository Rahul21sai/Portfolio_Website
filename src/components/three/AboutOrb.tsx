import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../../hooks/useMediaQuery';

// Cube Satellite Component
const CubeSatellite = ({ index, total }: { index: number; total: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 2.5;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Orbit around the sphere
      meshRef.current.position.x = Math.cos(time * 0.5 + angle) * radius;
      meshRef.current.position.y = Math.sin(time * 0.3 + angle) * 0.5;
      meshRef.current.position.z = Math.sin(time * 0.5 + angle) * radius;
      
      // Rotate the cube
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

// Main Orb Component
const Orb = ({ isHovered }: { isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={isHovered ? 1.2 : 1}>
      <sphereGeometry args={[1.5, 32, 32]} /> {/* Reduced from 64,64 to 32,32 */}
      <MeshDistortMaterial
        color={isHovered ? '#8b5cf6' : '#7c3aed'}
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive={isHovered ? '#7c3aed' : '#5b21b6'}
        emissiveIntensity={isHovered ? 0.5 : 0.2}
      />
    </mesh>
  );
};

// Scene Component
const Scene = ({ isHovered }: { isHovered: boolean }) => {
  const satelliteCount = 5;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#06b6d4" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#7c3aed"
      />
      
      {/* Main Orb */}
      <Orb isHovered={isHovered} />
      
      {/* Orbiting Cubes */}
      {Array.from({ length: satelliteCount }).map((_, i) => (
        <CubeSatellite key={i} index={i} total={satelliteCount} />
      ))}
    </>
  );
};

// Main AboutOrb Export
export const AboutOrb = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  // Don't render 3D on mobile
  if (isMobile) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-accent-violet/20 via-accent-cyan/10 to-transparent rounded-full animate-pulse" />
    );
  }

  return (
    <div
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        frameloop="demand"
        performance={{ min: 0.5 }}
      >
        <Scene isHovered={isHovered} />
      </Canvas>
    </div>
  );
};

// Made with Bob
