import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { personalData } from '../../data/portfolio';
import { Mail, Send, MapPin, ExternalLink } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send form data to Formspree
      const response = await fetch('https://formspree.io/f/xzdyynza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email, // Formspree will use this for reply-to
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-bg relative overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-violet/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            Let's Build Something
          </h2>
          <div className="separator mx-auto w-32" />
          <p className="text-text-muted text-lg mt-6 max-w-2xl mx-auto">
            Open to full-time roles, research collaborations, and interesting problems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text placeholder-transparent focus:outline-none focus:border-accent-violet transition-colors peer"
                  placeholder="Your Name"
                />
                <label className="absolute left-4 -top-2.5 bg-surface px-2 text-sm text-text-muted transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-accent-violet">
                  Your Name
                </label>
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text placeholder-transparent focus:outline-none focus:border-accent-violet transition-colors peer"
                  placeholder="Your Email"
                />
                <label className="absolute left-4 -top-2.5 bg-surface px-2 text-sm text-text-muted transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-accent-violet">
                  Your Email
                </label>
              </div>

              {/* Subject Field */}
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text placeholder-transparent focus:outline-none focus:border-accent-violet transition-colors peer"
                  placeholder="Subject"
                />
                <label className="absolute left-4 -top-2.5 bg-surface px-2 text-sm text-text-muted transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-accent-violet">
                  Subject
                </label>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text placeholder-transparent focus:outline-none focus:border-accent-violet transition-colors peer resize-none"
                  placeholder="Your Message"
                />
                <label className="absolute left-4 -top-2.5 bg-surface px-2 text-sm text-text-muted transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-accent-violet">
                  Your Message
                </label>
              </div>

              {/* Submit Button */}
              <MagneticButton>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-accent-violet text-white rounded-lg font-mono text-sm hover:bg-accent-violet/90 transition-all duration-300 shadow-glow-violet disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </MagneticButton>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-center"
                >
                  ✓ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-center"
                >
                  ✗ Failed to send message. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Right: Contact Info & Social Links */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-text mb-6">
                Get In Touch
              </h3>

              {/* Email */}
              <a
                href={`mailto:${personalData.contact.email}`}
                className="glass-card p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform group"
              >
                <div className="w-12 h-12 bg-accent-violet/20 rounded-full flex items-center justify-center group-hover:bg-accent-violet/30 transition-colors">
                  <Mail className="w-6 h-6 text-accent-violet" />
                </div>
                <div>
                  <div className="text-sm text-text-muted">Email</div>
                  <div className="text-text font-mono">{personalData.contact.email}</div>
                </div>
              </a>

              {/* Location */}
              <div className="glass-card p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-cyan/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent-cyan" />
                </div>
                <div>
                  <div className="text-sm text-text-muted">Location</div>
                  <div className="text-text">{personalData.company}</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-display font-bold text-text mb-6">
                Connect With Me
              </h3>
              <div className="space-y-4">
                {/* GitHub */}
                <a
                  href={personalData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 flex items-center justify-between hover:scale-[1.02] transition-transform group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-violet/20 rounded-full flex items-center justify-center group-hover:bg-accent-violet/30 transition-colors">
                      <ExternalLink className="w-6 h-6 text-accent-violet" />
                    </div>
                    <div>
                      <div className="text-text font-semibold">GitHub</div>
                      <div className="text-sm text-text-muted">@Rahul21sai</div>
                    </div>
                  </div>
                  <div className="text-accent-violet group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={personalData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 flex items-center justify-between hover:scale-[1.02] transition-transform group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-cyan/20 rounded-full flex items-center justify-center group-hover:bg-accent-cyan/30 transition-colors">
                      <ExternalLink className="w-6 h-6 text-accent-cyan" />
                    </div>
                    <div>
                      <div className="text-text font-semibold">LinkedIn</div>
                      <div className="text-sm text-text-muted">Connect professionally</div>
                    </div>
                  </div>
                  <div className="text-accent-cyan group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </a>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="glass-card p-6 text-center border-2 border-accent-violet/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-text font-semibold">Available for Opportunities</span>
              </div>
              <p className="text-sm text-text-muted">
                Open to full-time roles and exciting projects
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Made with Bob
