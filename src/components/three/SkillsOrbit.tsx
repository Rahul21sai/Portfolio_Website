import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../../hooks/useMediaQuery';

interface SkillLabelProps {
  skill: string;
  index: number;
  total: number;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

// Skill Label Component
const SkillLabel = ({ skill, index, total, selectedIndex, onSelect }: SkillLabelProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 3;
  const isSelected = selectedIndex === index;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * 0.3;
      
      if (isSelected) {
        // Float to center when selected
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 0, 0.1);
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0, 0.1);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.1);
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.5, 0.1));
      } else {
        // Orbit in circle
        const targetX = Math.cos(time + angle) * radius;
        const targetZ = Math.sin(time + angle) * radius;
        const targetY = Math.sin(time * 0.5 + angle) * 0.3;
        
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
      }
      
      // Always face camera
      meshRef.current.lookAt(0, meshRef.current.position.y, 5);
    }
  });

  return (
    <group ref={meshRef}>
      <Html
        center
        distanceFactor={10}
        style={{
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <div
          onClick={() => onSelect(index)}
          className={`
            px-4 py-2 rounded-full cursor-pointer transition-all duration-300
            ${isSelected 
              ? 'bg-accent-violet text-white glow-violet scale-110' 
              : 'bg-surface/80 backdrop-blur-sm text-text-muted hover:text-accent-violet hover:bg-accent-violet/10'
            }
            border border-accent-violet/30 font-mono text-sm whitespace-nowrap
          `}
        >
          {skill}
        </div>
      </Html>
    </group>
  );
};

// Scene Component
const Scene = ({ skills }: { skills: string[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      {/* Skill Labels */}
      {skills.map((skill, index) => (
        <SkillLabel
          key={skill}
          skill={skill}
          index={index}
          total={skills.length}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      ))}
      
      {/* Central Glow */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.2}
        />
      </mesh>
    </>
  );
};

// Main SkillsOrbit Export
interface SkillsOrbitProps {
  skills: string[];
}

export const SkillsOrbit = ({ skills }: SkillsOrbitProps) => {
  const isMobile = useIsMobile();

  // Don't render 3D on mobile
  if (isMobile) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3">
          {skills.slice(0, 6).map((skill) => (
            <div
              key={skill}
              className="px-4 py-2 bg-surface/80 backdrop-blur-sm rounded-full text-text-muted text-sm font-mono border border-accent-violet/30"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene skills={skills} />
      </Canvas>
    </div>
  );
};

// Made with Bob
