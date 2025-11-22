'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, LogIn, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function Navbar() {
  const { isAuthenticated, logout, isAdmin } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#teams' },
    { name: 'Jobs', href: '#jobs' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-strong shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 group"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-10 h-10 text-transparent bg-gradient-to-r from-white via-glass-accent to-glass-purple bg-clip-text" />
            </motion.div>
            <span className="text-3xl font-orbitron font-bold gradient-text">
              Saxansaxo
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-3 text-gray-300 hover:text-white transition-colors font-space-grotesk font-medium group"
              >
                <span className="relative z-10">{item.name}</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-glass-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId={`nav-${item.name}`}
                />
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white/50 to-glass-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                />
              </motion.a>
            ))}
            {isAuthenticated ? (
              <>
                <Link href="/profile">
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 text-gray-300 hover:text-white transition-colors font-space-grotesk font-medium flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </motion.button>
                </Link>
                {isAdmin && (
                  <Link href="/cms">
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 text-gray-300 hover:text-white transition-colors font-space-grotesk font-medium flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      CMS
                    </motion.button>
                  </Link>
                )}
                <motion.button
                  onClick={logout}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-colors font-space-grotesk font-medium flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </>
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-colors font-space-grotesk font-medium flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={28} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={28} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="block text-gray-300 hover:text-white transition-colors font-space-grotesk font-medium text-lg py-2 border-l-2 border-transparent hover:border-white/50 pl-4"
                >
                  {item.name}
                </motion.a>
              ))}
              {isAuthenticated ? (
                <>
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.length * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-space-grotesk font-medium text-lg py-2 border-l-2 border-transparent hover:border-white/50 pl-4"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </motion.div>
                  </Link>
                  {isAdmin && (
                    <Link href="/cms" onClick={() => setIsMobileMenuOpen(false)}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navItems.length + 1) * 0.1 }}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-space-grotesk font-medium text-lg py-2 border-l-2 border-transparent hover:border-white/50 pl-4"
                      >
                        <Settings className="w-4 h-4" />
                        CMS
                      </motion.div>
                    </Link>
                  )}
                  <motion.button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navItems.length + (isAdmin ? 2 : 1)) * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-space-grotesk font-medium text-lg py-2 border-l-2 border-transparent hover:border-white/50 pl-4"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-space-grotesk font-medium text-lg py-2 border-l-2 border-transparent hover:border-white/50 pl-4"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </motion.div>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
