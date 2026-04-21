import { motion } from 'framer-motion';
import { publication, certifications } from '../../data/portfolio';
import { Award, ExternalLink, FileText, CheckCircle } from 'lucide-react';

export const Publications = () => {
  return (
    <section id="publications" className="section-padding bg-surface/50">
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
            Publications & Certifications
          </h2>
          <div className="separator mx-auto w-32" />
          <p className="text-text-muted text-lg mt-6 max-w-2xl mx-auto">
            Research contributions and professional certifications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Publication Card - Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 h-full border-2 border-accent-amber/30 hover:border-accent-amber/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              {/* Award Badge */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-amber/20 to-transparent rounded-bl-full" />
              
              <div className="relative z-10">
                {/* Award Icon */}
                <div className="w-16 h-16 bg-accent-amber/20 rounded-full flex items-center justify-center mb-6 shadow-glow-amber">
                  <Award className="w-8 h-8 text-accent-amber" />
                </div>

                {/* Award Badge Text */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-amber/20 border border-accent-amber/30 rounded-full text-accent-amber text-sm font-mono mb-4">
                  <span className="text-xl">{publication.award.split(' ')[0]}</span>
                  <span>{publication.award.split(' ').slice(1).join(' ')}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-bold text-text mb-3">
                  {publication.title}
                </h3>

                {/* Conference */}
                <div className="flex items-center gap-2 text-accent-amber mb-4">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">{publication.conference}</span>
                </div>

                {/* Description */}
                <p className="text-text-muted leading-relaxed mb-6">
                  {publication.description}
                </p>

                {/* Read Paper Link */}
                <a
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-amber/10 border border-accent-amber/30 rounded-full text-accent-amber hover:bg-accent-amber hover:text-white transition-all duration-300 shadow-glow-amber-sm hover:shadow-glow-amber group"
                >
                  <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-sm">Read Paper</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Certifications - Right */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                {/* Color Accent Bar */}
                <div
                  className={`absolute top-0 left-0 w-1 h-full ${
                    cert.color === 'violet'
                      ? 'bg-accent-violet'
                      : cert.color === 'amber'
                      ? 'bg-accent-amber'
                      : 'bg-accent-cyan'
                  }`}
                />

                <div className="pl-4">
                  {/* Badge & Name */}
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{cert.badge}</span>
                    <div className="flex-1">
                      <h4 className="text-lg font-display font-bold text-text mb-1">
                        {cert.name}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <span>{cert.issuer}</span>
                        <span>•</span>
                        <span className="font-mono">{cert.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Score Badge */}
                  {cert.score && (
                    <div className="flex items-center gap-2 mt-3">
                      <CheckCircle
                        className={`w-4 h-4 ${
                          cert.color === 'violet'
                            ? 'text-accent-violet'
                            : cert.color === 'amber'
                            ? 'text-accent-amber'
                            : 'text-accent-cyan'
                        }`}
                      />
                      <span
                        className={`text-sm font-mono ${
                          cert.color === 'violet'
                            ? 'text-accent-violet'
                            : cert.color === 'amber'
                            ? 'text-accent-amber'
                            : 'text-accent-cyan'
                        }`}
                      >
                        Score: {cert.score}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <blockquote className="text-xl md:text-2xl font-display text-text-muted italic max-w-3xl mx-auto">
            "Continuous learning and research drive innovation in AI and enterprise systems."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

// Made with Bob
