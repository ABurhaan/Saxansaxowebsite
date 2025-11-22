'use client'

import { motion } from 'framer-motion'
import { Sparkles, Github, Twitter, Linkedin, Mail, Zap, ArrowUp } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', gradient: 'from-gray-400 to-gray-600' },
    { icon: Twitter, href: '#', label: 'Twitter', gradient: 'from-blue-500 to-blue-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', gradient: 'from-blue-600 to-blue-500' },
    { icon: Mail, href: '#', label: 'Email', gradient: 'from-blue-500 to-blue-400' },
  ]

  const quickLinks = ['Home', 'Services', 'About', 'Team', 'Jobs', 'Contact']
  const services = ['Web Development', 'Cloud Solutions', 'Mobile Apps', 'AI & ML']

  return (
    <footer className="relative bg-gradient-to-b from-transparent via-gray-50 to-white border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Enhanced Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-3 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full blur-xl opacity-50" />
                <Sparkles className="w-10 h-10 text-blue-600 relative z-10" />
              </motion.div>
              <span className="text-3xl font-orbitron font-bold gradient-text">
                Saxansaxo
              </span>
            </motion.div>
            <p className="text-gray-600 font-space-grotesk leading-relaxed">
              Transforming businesses with innovative technology solutions and digital magic.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-gray-900 font-orbitron font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors font-space-grotesk flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:w-4 transition-all" />
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-gray-900 font-orbitron font-bold mb-6 text-lg">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href="#services"
                    className="text-gray-600 hover:text-blue-600 transition-colors font-space-grotesk flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:w-4 transition-all" />
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Enhanced Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-gray-900 font-orbitron font-bold mb-6 text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-xl glass border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-500/50 transition-all group relative overflow-hidden`}
                  aria-label={social.label}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <social.icon className="w-5 h-5 relative z-10 group-hover:text-gray-900 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-600 font-space-grotesk text-center md:text-left">
            © {currentYear} <span className="gradient-text font-orbitron">Saxansaxo Technology</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600 font-jetbrains text-sm">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Made with magic</span>
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full glass border border-gray-200 flex items-center justify-center text-gray-900 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
