import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useIsMobile } from '../../hooks/useMediaQuery';

export const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Add hover class to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Don't render on mobile/touch devices
  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        animate={{
          x: x - 10,
          y: y - 10,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Trail dot */}
      <motion.div
        className="cursor-trail"
        animate={{
          x: x - 4,
          y: y - 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
    </>
  );
};

// Made with Bob
