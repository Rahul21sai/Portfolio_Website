import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { AboutOrb } from '../three/AboutOrb';
import { CountUp } from '../ui/CountUp';
import { personalData } from '../../data/portfolio';

export const About = () => {
  return (
    <section id="about" className="section-padding bg-surface/50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            About Me
          </h2>
          <div className="separator mx-auto w-32" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Bio Paragraphs */}
            <p className="text-text-muted text-lg leading-relaxed">
              {personalData.about.intro}
            </p>

            <p className="text-text-muted text-lg leading-relaxed">
              {personalData.about.education}
            </p>

            <p className="text-text-muted text-lg leading-relaxed">
              {personalData.about.research}
            </p>

            {/* Animated Counters */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {personalData.counters.map((counter, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 text-center hover:scale-105 transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-4xl font-display font-bold text-accent-violet mb-2">
                    <CountUp
                      end={counter.value}
                      duration={2}
                      suffix={counter.suffix}
                    />
                  </div>
                  <div className="text-text-muted text-sm">{counter.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Skills Highlight */}
            <motion.div
              className="flex flex-wrap gap-3 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {['Java', 'AEM', 'Python', 'LLM Integration', 'React', 'AWS'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-accent-violet/10 border border-accent-violet/30 rounded-full text-accent-violet text-sm font-mono"
                  >
                    {skill}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Right: 3D Orb */}
          <motion.div
            className="relative h-[400px] md:h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-accent-violet border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <AboutOrb />
            </Suspense>

            {/* Decorative Ring */}
            <div className="absolute inset-0 border-2 border-accent-violet/20 rounded-full animate-pulse" />
          </motion.div>
        </div>

        {/* Bottom Quote/Highlight */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <blockquote className="text-xl md:text-2xl font-display text-text-muted italic max-w-3xl mx-auto">
            "Building the future of enterprise AI, one intelligent system at a time."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

// Made with Bob
