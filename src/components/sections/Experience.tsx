import { motion } from 'framer-motion';
import { experiences } from '../../data/portfolio';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-bg">
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
            Work Experience
          </h2>
          <div className="separator mx-auto w-32" />
          <p className="text-text-muted text-lg mt-6 max-w-2xl mx-auto">
            Building enterprise AI systems and leading technical initiatives
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-violet via-accent-cyan to-accent-violet opacity-30" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 top-8 w-4 h-4 -ml-2 rounded-full bg-accent-violet shadow-glow-violet z-10 animate-pulse" />

                {/* Content Card */}
                <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
                    {/* Company & Role */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-display font-bold text-text mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-accent-violet font-semibold mb-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Date & Location */}
                    <div className="flex flex-wrap gap-4 text-sm text-text-muted mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-mono">{exp.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description Points */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-text-muted">
                          <span className="text-accent-cyan mt-1">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/30 rounded-md text-accent-cyan text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-display font-bold text-accent-violet mb-2">
              [ 2+ ]
            </div>
            <div className="text-text-muted">Years of Experience</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-display font-bold text-accent-cyan mb-2">
              [ 3 ]
            </div>
            <div className="text-text-muted">Companies Worked With</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-display font-bold text-accent-amber mb-2">
              [ 60% ]
            </div>
            <div className="text-text-muted">Efficiency Improvement</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Made with Bob
