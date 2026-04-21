import { Suspense, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillsOrbit } from '../three/SkillsOrbit';
import { skillCategories } from '../../data/portfolio';

const tabs = [
  { id: 0, label: 'Core Stack' },
  { id: 1, label: 'AI / ML' },
  { id: 2, label: 'Frontend' },
  { id: 3, label: 'Cloud & Tools' },
];

export const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);

  const activeSkills = skillCategories[activeTab]?.skills || [];
  
  // Get all skill names for 3D orbit
  const allSkillNames = useMemo(() => {
    return skillCategories.flatMap(category =>
      category.skills.map(skill => skill.name)
    );
  }, []);

  return (
    <section id="skills" className="section-padding bg-bg">
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
            Skills & Expertise
          </h2>
          <div className="separator mx-auto w-32" />
          <p className="text-text-muted text-lg mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit spanning enterprise development, AI/ML, and modern web technologies
          </p>
        </motion.div>

        {/* 3D Orbital Ring */}
        <motion.div
          className="relative h-[400px] md:h-[500px] mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <SkillsOrbit skills={allSkillNames} />
          </Suspense>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`
                px-6 py-3 rounded-full font-mono text-sm transition-all duration-300
                ${
                  activeTab === idx
                    ? 'bg-accent-violet text-white shadow-glow-violet'
                    : 'bg-surface border border-border text-text-muted hover:border-accent-violet/50'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="glass-card p-4 text-center group hover:scale-105 transition-transform cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-accent-violet group-hover:text-accent-cyan transition-colors text-lg font-mono">
                  {skill.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-display font-bold text-accent-violet mb-2">
              [ 10+ ]
            </div>
            <div className="text-text-muted">Core Technologies</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-display font-bold text-accent-cyan mb-2">
              [ 8+ ]
            </div>
            <div className="text-text-muted">AI/ML Frameworks</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-display font-bold text-accent-amber mb-2">
              [ 6+ ]
            </div>
            <div className="text-text-muted">Cloud & DevOps Tools</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Made with Bob
