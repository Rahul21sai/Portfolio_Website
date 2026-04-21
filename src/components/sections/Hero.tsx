import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { HeroScene } from '../three/HeroScene';
import { TypeWriter } from '../ui/TypeWriter';
import { MagneticButton } from '../ui/MagneticButton';
import { personalData } from '../../data/portfolio';

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="space-y-6 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Greeting */}
            <motion.p
              className="text-accent-cyan font-mono text-sm md:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Hi, my name is
            </motion.p>

            {/* Name */}
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-gradient">{personalData.name}</span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-text-muted"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <TypeWriter
                texts={personalData.typingRoles}
                speed={100}
                deleteSpeed={50}
                delayBetween={2000}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-text-muted text-lg md:text-xl max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {personalData.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <MagneticButton
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-accent-violet text-white rounded-full font-medium hover:bg-accent-violet/90 transition-all glow-violet"
              >
                View My Work
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-transparent border-2 border-accent-cyan text-accent-cyan rounded-full font-medium hover:bg-accent-cyan hover:text-bg transition-all"
              >
                Get In Touch
              </MagneticButton>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              className="flex flex-wrap gap-6 pt-8 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {personalData.stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-mono text-accent-violet stat-bracket">
                    {stat.value}
                  </span>
                  <span className="text-text-muted text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Scene */}
          <motion.div
            className="relative h-[400px] md:h-[600px] lg:h-[700px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-accent-violet border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <HeroScene />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
      >
        <div className="flex flex-col items-center gap-2 text-text-muted">
          <span className="text-sm font-mono">Scroll Down</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent-violet/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
    </section>
  );
};

// Made with Bob
