import { useEffect, useState } from 'react';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Publications } from './components/sections/Publications';
import { Contact } from './components/sections/Contact';
import { useIsMobile } from './hooks/useMediaQuery';
import { ChevronUp } from 'lucide-react';
import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isMobile = useIsMobile();

  // Handle loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-bg text-text overflow-x-hidden">
        {/* Custom Cursor - Desktop Only */}
        {!isMobile && <CustomCursor />}

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Publications />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8 z-40 w-12 h-12 bg-accent-violet rounded-full
            flex items-center justify-center shadow-glow-violet
            transition-all duration-300 hover:scale-110
            ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
          `}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>

        {/* Background Grain Texture */}
        <div className="grain-overlay" />
      </div>
    </SmoothScroll>
  );
}

export default App;

// Made with Bob
