'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Sparkles, Zap, CheckCircle, XCircle } from 'lucide-react'
import axios from 'axios'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await axios.post('/api/contact/', formData)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@saxansaxo.com',
      gradient: 'from-blue-600 to-blue-500',
      delay: 0,
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      gradient: 'from-blue-600 to-blue-400',
      delay: 0.1,
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Tech Street, Innovation City, IC 12345',
      gradient: 'from-blue-500 to-blue-600',
      delay: 0.2,
    },
  ]

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-4"
          >
            <span className="text-blue-600 font-jetbrains text-sm uppercase tracking-wider px-4 py-2 rounded-full glass border border-blue-200">
              Get in Touch
            </span>
          </motion.span>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-orbitron font-black mb-6">
            <span className="gradient-text">Let's Build</span>{' '}
            <span className="text-gray-900">Together</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-space-grotesk leading-relaxed mb-4">
            Ready to accelerate your digital transformation? Our team is standing by to turn your boldest ideas into reality
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto font-space-grotesk">
            Schedule a free consultation and discover how we can help you achieve 10x growth with cutting-edge technology solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-orbitron font-bold text-gray-900 mb-4 flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Zap className="w-8 h-8 text-blue-600" />
                </motion.div>
                Contact Information
              </h3>
              <p className="text-gray-600 font-space-grotesk mb-8 leading-relaxed">
                Connect with our team through any channel. We typically respond within 2 hours during business hours and offer 
                24/7 support for enterprise clients. Let's discuss how we can transform your business.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: info.delay, duration: 0.6 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-2xl`} />
                  <div className="relative glass p-6 rounded-2xl border border-gray-200 flex items-start space-x-4 group-hover:border-white/50 transition-all">
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${info.gradient} flex items-center justify-center flex-shrink-0 relative overflow-hidden shadow-lg`}
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                    >
                      <info.icon className="w-7 h-7 text-gray-900 relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </motion.div>
                    <div>
                      <h4 className="text-gray-900 font-orbitron font-semibold mb-1">{info.title}</h4>
                      <p className="text-gray-600 font-space-grotesk group-hover:text-gray-900 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-blue-500/20 rounded-3xl blur-lg opacity-30" />
            <form
              onSubmit={handleSubmit}
              className="relative glass-strong p-10 rounded-3xl border border-gray-200"
            >
              <div className="absolute top-4 right-4 opacity-20">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-12 h-12 text-gray-900/30" />
                </motion.div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 glass border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-space-grotesk"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 glass border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-space-grotesk"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-5 py-4 glass border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-space-grotesk"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05, y: -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className="w-full relative px-8 py-5 rounded-xl font-space-grotesk font-bold text-lg overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  />
                  <span className="relative z-10 text-gray-900 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 text-center font-space-grotesk flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      ✨ Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 text-center font-space-grotesk flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Something went wrong. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
