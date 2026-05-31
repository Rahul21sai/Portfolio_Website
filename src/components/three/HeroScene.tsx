import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useIsMobile } from '../../hooks/useMediaQuery';

// Particle Field Component
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 300; // Reduced from 800 for better performance
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Animate particles
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial
        size={0.05}
        color="#7c3aed"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main Icosahedron Component
const Icosahedron = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      
      // Mouse parallax effect
      const targetRotationX = (mouseY / window.innerHeight - 0.5) * 0.2;
      const targetRotationY = (mouseX / window.innerWidth - 0.5) * 0.2;
      
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 1]} /> {/* Reduced detail from 0 to 1 */}
      <MeshDistortMaterial
        color="#7c3aed"
        wireframe
        distort={0.3}
        speed={2}
        roughness={0.5}
      />
    </mesh>
  );
};

// Orbiting Torus Knot Component
const TorusKnot = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Orbit around the icosahedron
      const time = state.clock.elapsedTime;
      meshRef.current.position.x = Math.cos(time * 0.5) * 3.5;
      meshRef.current.position.z = Math.sin(time * 0.5) * 3.5;
      meshRef.current.position.y = Math.sin(time * 0.3) * 0.5;
      
      // Rotate the torus knot itself
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.5, 0.2, 64, 12]} /> {/* Reduced from 100,16 to 64,12 */}
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.5}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
};

// Main Scene Component
const Scene = () => {
  const { x, y } = useMousePosition();

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      
      {/* 3D Objects */}
      <Icosahedron mouseX={x} mouseY={y} />
      <TorusKnot />
      <ParticleField />
    </>
  );
};

// Main HeroScene Export
export const HeroScene = () => {
  const isMobile = useIsMobile();

  // Don't render 3D on mobile - return gradient instead
  if (isMobile) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-accent-violet/20 via-transparent to-accent-cyan/20 animate-pulse" />
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]} // Reduced from [1, 2] for better performance
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        frameloop="demand" // Only render when needed
        performance={{ min: 0.5 }} // Adaptive performance
      >
        <Scene />
      </Canvas>
    </div>
  );
};

// Made with Bob
