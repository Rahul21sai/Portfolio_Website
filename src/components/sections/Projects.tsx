import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { projects } from '../../data/portfolio';
import { ExternalLink, Code2 } from 'lucide-react';

export const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-surface/50 overflow-hidden">
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
            Featured Projects
          </h2>
          <div className="separator mx-auto w-32" />
          <p className="text-text-muted text-lg mt-6 max-w-2xl mx-auto">
            Building enterprise AI systems, developer tools, and open-source solutions
          </p>
        </motion.div>

        {/* Projects Grid - Horizontal Scroll on Desktop */}
        <div className="relative">
          <div className="flex lg:flex-row flex-col gap-8 lg:overflow-x-auto lg:pb-8 scrollbar-custom">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="lg:min-w-[500px] flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="h-full p-8 hover:scale-[1.02] transition-transform duration-300">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-text mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <span className="font-mono">{project.category}</span>
                        <span>•</span>
                        <span>{project.date}</span>
                      </div>
                    </div>
                    
                    {/* Badge */}
                    {project.badge && (
                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-mono
                          ${
                            project.badge.includes('Award')
                              ? 'bg-accent-amber/20 text-accent-amber border border-accent-amber/30'
                              : project.badge.includes('Open Source')
                              ? 'bg-accent-violet/20 text-accent-violet border border-accent-violet/30'
                              : 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30'
                          }
                        `}
                      >
                        {project.badge}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-text-muted leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent-violet/10 border border-accent-violet/30 rounded-md text-accent-violet text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-border">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-muted hover:text-accent-violet transition-colors group"
                      >
                        <Code2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-mono">View Code</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors group"
                      >
                        <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-mono">Live Demo</span>
                      </a>
                    )}
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent-violet/10 to-transparent rounded-bl-full" />
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicator - Desktop Only */}
          <div className="hidden lg:flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-accent-violet/30"
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://github.com/Rahul21sai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-violet/10 border border-accent-violet/30 rounded-full text-accent-violet hover:bg-accent-violet hover:text-white transition-all duration-300 shadow-glow-violet-sm hover:shadow-glow-violet group"
          >
            <Code2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-mono">View All Projects on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Made with Bob
