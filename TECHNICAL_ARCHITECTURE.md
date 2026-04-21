# Technical Architecture - 3D Portfolio Website

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React Application Layer                  │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │         Component Hierarchy                     │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │  App.tsx (Root)                          │  │  │  │
│  │  │  │    ├─ LoadingScreen                      │  │  │  │
│  │  │  │    ├─ CustomCursor                       │  │  │  │
│  │  │  │    └─ SmoothScroll (Lenis Wrapper)       │  │  │  │
│  │  │  │         ├─ Navbar                        │  │  │  │
│  │  │  │         ├─ Hero (+ HeroScene 3D)         │  │  │  │
│  │  │  │         ├─ About (+ AboutOrb 3D)         │  │  │  │
│  │  │  │         ├─ Skills (+ SkillsOrbit 3D)     │  │  │  │
│  │  │  │         ├─ Projects                      │  │  │  │
│  │  │  │         ├─ Experience                    │  │  │  │
│  │  │  │         ├─ Publications                  │  │  │  │
│  │  │  │         ├─ Contact                       │  │  │  │
│  │  │  │         └─ Footer                        │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Animation & Interaction Layer               │  │
│  │  ┌────────────┬────────────┬──────────────────────┐  │  │
│  │  │   GSAP     │  Framer    │   Lenis              │  │  │
│  │  │ ScrollTrig │  Motion    │ Smooth Scroll        │  │  │
│  │  └────────────┴────────────┴──────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              3D Rendering Layer                       │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  React Three Fiber (R3F)                       │  │  │
│  │  │    ├─ Canvas Components                        │  │  │
│  │  │    ├─ Three.js Geometries                      │  │  │
│  │  │    ├─ Materials & Shaders                      │  │  │
│  │  │    └─ Animation Loops (useFrame)               │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  @react-three/drei (Helpers)                   │  │  │
│  │  │    ├─ MeshDistortMaterial                      │  │  │
│  │  │    ├─ Text3D                                   │  │  │
│  │  │    └─ Html (for labels)                        │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Styling Layer                            │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Tailwind CSS (Utility Classes)                │  │  │
│  │  │  + Custom CSS (globals.css)                    │  │  │
│  │  │    ├─ CSS Variables (Design Tokens)            │  │  │
│  │  │    ├─ Grain Texture Overlay                    │  │  │
│  │  │    ├─ Custom Cursor Styles                     │  │  │
│  │  │    └─ Glassmorphism Effects                    │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Component Architecture

### Core Layout Components

#### 1. SmoothScroll.tsx
```typescript
Purpose: Wraps entire app with Lenis smooth scroll
Dependencies: @studio-freight/lenis, GSAP
Key Features:
  - Initialize Lenis instance
  - Connect to GSAP ticker
  - Cleanup on unmount
```

#### 2. Navbar.tsx
```typescript
Purpose: Fixed navigation with scroll effects
State Management:
  - isScrolled (boolean) - for glass effect
  - activeSection (string) - current section
  - isMobileMenuOpen (boolean)
Features:
  - IntersectionObserver for active section
  - Smooth scroll to sections
  - Mobile hamburger menu
  - Frosted glass on scroll
```

#### 3. Footer.tsx
```typescript
Purpose: Footer with copyright and links
Features:
  - Social media links
  - Copyright notice
  - Back to top button
```

---

### UI Components

#### 1. CustomCursor.tsx
```typescript
Purpose: Custom glowing cursor with trail
State:
  - mousePosition { x, y }
  - isHovering (boolean)
Implementation:
  - Main dot: 20px violet circle
  - Trail dot: 8px with 100ms lag
  - Expand on hover (scale 1.5)
  - Hide on touch devices
```

#### 2. MagneticButton.tsx
```typescript
Purpose: Button that follows cursor on hover
Props:
  - children: ReactNode
  - onClick?: () => void
  - className?: string
Implementation:
  - Calculate offset from cursor
  - Apply transform with spring physics
  - Reset on mouse leave
```

#### 3. GlassCard.tsx
```typescript
Purpose: Reusable glassmorphism card
Props:
  - children: ReactNode
  - className?: string
  - hover3D?: boolean
Styles:
  - backdrop-blur-md
  - bg-white/5
  - border-violet-500/20
  - Optional 3D tilt on hover
```

#### 4. TypeWriter.tsx
```typescript
Purpose: Typing animation for roles
Props:
  - texts: string[]
  - speed?: number
  - deleteSpeed?: number
State:
  - currentText (string)
  - currentIndex (number)
  - isDeleting (boolean)
```

#### 5. CountUp.tsx
```typescript
Purpose: Animated number counter
Props:
  - end: number
  - duration?: number
  - suffix?: string
Implementation:
  - Trigger on scroll (IntersectionObserver)
  - Animate from 0 to end value
  - Use requestAnimationFrame
```

#### 6. LoadingScreen.tsx
```typescript
Purpose: Initial loading animation
Features:
  - Animated name reveal
  - Progress bar
  - Fade out after 2s
  - Set loading complete state
```

---

### 3D Components

#### 1. HeroScene.tsx
```typescript
Purpose: Main 3D scene for hero section
Three.js Objects:
  - IcosahedronGeometry (wireframe)
    - Scale: 2.5
    - Material: MeshBasicMaterial (wireframe)
    - Color: #7c3aed (violet)
    - Rotation: slow (0.001 rad/frame)
    - Mouse parallax: ±0.1 rotation
  
  - TorusKnotGeometry (orbiting)
    - Scale: 0.5
    - Material: MeshStandardMaterial (emissive)
    - Color: #06b6d4 (cyan)
    - Orbit radius: 3.5
    - Orbit speed: 0.01 rad/frame
  
  - ParticleField (800 particles)
    - BufferGeometry with Float32Array
    - PointsMaterial (size: 0.05)
    - Random positions in sphere
    - Subtle drift animation

Camera:
  - PerspectiveCamera
  - fov: 60
  - position: [0, 0, 5]
  - lookAt: [0, 0, 0]

Performance:
  - dpr={[1, 2]}
  - Dispose on unmount
```

#### 2. AboutOrb.tsx
```typescript
Purpose: 3D orb for about section
Three.js Objects:
  - SphereGeometry
    - Radius: 1.5
    - Segments: 64
    - Material: MeshDistortMaterial
    - Distort: 0.3
    - Speed: 2
    - Gradient: violet → cyan
  
  - Cube Satellites (3-5)
    - BoxGeometry (0.1 scale)
    - Orbital motion
    - Different speeds

Interactions:
  - Hover: scale 1.2, brightness +20%
  - Click: pulse animation

Performance:
  - frameloop="demand"
  - Dispose on unmount
```

#### 3. SkillsOrbit.tsx
```typescript
Purpose: 3D orbital skill ring
Implementation:
  - Skills arranged in circle
  - Radius: 3
  - Rotation: 0.005 rad/frame
  - Each skill: Text3D or Html label
  
Interactions:
  - Click skill: float to center
  - Highlight selected skill
  - Rotate to face camera

Performance:
  - Lazy load with Suspense
  - Dispose on unmount
```

---

## 🎨 Styling Architecture

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050508',
        surface: '#0d0d14',
        accent: {
          violet: '#7c3aed',
          cyan: '#06b6d4',
          amber: '#f59e0b',
        },
        text: {
          DEFAULT: '#e2e8f0',
          muted: '#64748b',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #7c3aed, 0 0 10px #7c3aed' },
          '100%': { boxShadow: '0 0 10px #7c3aed, 0 0 20px #7c3aed, 0 0 30px #7c3aed' },
        },
      },
    },
  },
  plugins: [],
}
```

### Global CSS Structure
```css
/* globals.css */

/* 1. CSS Variables */
:root {
  --bg: #050508;
  --surface: #0d0d14;
  --accent-violet: #7c3aed;
  --accent-cyan: #06b6d4;
  --accent-amber: #f59e0b;
  --text: #e2e8f0;
  --text-muted: #64748b;
  --border: rgba(124, 58, 237, 0.2);
}

/* 2. Font Imports */
@font-face {
  font-family: 'Syne';
  src: url('/fonts/Syne-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

/* 3. Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  cursor: none; /* Hide default cursor */
}

/* 4. Grain Texture Overlay */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,..."); /* Noise SVG */
  opacity: 0.03;
  pointer-events: none;
  animation: grain 8s steps(10) infinite;
  z-index: 9999;
}

/* 5. Custom Cursor */
.custom-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent-violet);
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
  box-shadow: 0 0 20px var(--accent-violet);
}

.cursor-trail {
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-cyan);
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease-out;
}

/* 6. Glassmorphism */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: 16px;
}

/* 7. Glow Effects */
.glow-violet {
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
}

.glow-cyan {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
}

/* 8. Grid Background */
.grid-bg {
  background-image: 
    linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* 9. Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--accent-violet);
  border-radius: 4px;
}

/* 10. Selection */
::selection {
  background: var(--accent-violet);
  color: white;
}
```

---

## 🎬 Animation System

### GSAP ScrollTrigger Pattern
```typescript
// Reusable animation utility
export const fadeInUp = (element: string, delay = 0) => {
  gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  });
};

// Stagger children
export const staggerChildren = (parent: string, children: string) => {
  gsap.from(`${parent} ${children}`, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: parent,
      start: 'top 80%',
    },
  });
};
```

### Framer Motion Variants
```typescript
// Page load animations
export const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  },
};

// Stagger container
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Child items
export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};
```

---

## 🔌 Custom Hooks

### useMousePosition.ts
```typescript
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);
  
  return position;
};
```

### useScrollProgress.ts
```typescript
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrolled / total) * 100);
    };
    
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  
  return progress;
};
```

### useMediaQuery.ts
```typescript
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
};
```

### useReducedMotion.ts
```typescript
export const useReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};
```

---

## 📊 Data Structure

### portfolio.ts
```typescript
export interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  badge?: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  date: string;
  location: string;
  description: string[];
  tags: string[];
  logo?: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  score?: string;
  badge?: string;
}

// Export all data
export const projects: Project[] = [...];
export const experiences: Experience[] = [...];
export const certifications: Certification[] = [...];
```

---

## 🚀 Performance Optimization

### Code Splitting
```typescript
// Lazy load sections
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
// ... etc

// Wrap in Suspense
<Suspense fallback={<Loader />}>
  <Hero />
</Suspense>
```

### 3D Optimization
```typescript
// Dispose Three.js objects
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    texture?.dispose();
  };
}, []);

// Use frameloop demand
<Canvas frameloop="demand" dpr={[1, 2]}>
  {/* 3D content */}
</Canvas>
```

### Image Optimization
- Use WebP format
- Lazy load images
- Responsive images with srcset
- Preload critical images

---

## 🧪 Testing Strategy

### Unit Tests
- Component rendering
- Hook functionality
- Utility functions

### Integration Tests
- Section interactions
- Form submission
- Navigation flow

### Performance Tests
- Lighthouse CI
- Bundle size analysis
- 3D rendering FPS

### Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- Color contrast

---

## 📦 Build Configuration

### Vite Config
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'animations': ['gsap', 'framer-motion'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber'],
  },
});
```

---

## 🔐 Environment Variables

```env
# .env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

This architecture ensures:
- ✅ Scalable component structure
- ✅ Optimized 3D rendering
- ✅ Smooth animations
- ✅ Excellent performance
- ✅ Maintainable codebase
- ✅ Accessibility compliance