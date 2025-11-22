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
          ? 'glass-strong shadow-2xl border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 group relative"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <Sparkles className="w-10 h-10 text-blue-600 relative z-10 drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
            </motion.div>
            <span className="text-3xl font-orbitron font-bold gradient-text relative">
              <span className="absolute inset-0 blur-xl opacity-50 gradient-text">Saxansaxo</span>
              <span className="relative">Saxansaxo</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-5 py-2.5 text-gray-700 hover:text-gray-900 transition-all font-space-grotesk font-medium group rounded-lg"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.name}
                </span>
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15))',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                {/* Bottom border gradient */}
                <motion.div
                  className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-center"
                  style={{ transform: 'translateX(-50%)' }}
                />
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(168, 85, 247, 0.3))',
                  }}
                />
              </motion.a>
            ))}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
              {isAuthenticated ? (
                <>
                  <Link href="/profile">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative px-4 py-2.5 text-gray-700 hover:text-gray-900 transition-all font-space-grotesk font-medium flex items-center gap-2 rounded-lg group"
                    >
                      <User className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Profile</span>
                      <motion.div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/20 to-blue-400/20 transition-opacity"
                      />
                    </motion.button>
                  </Link>
                  {isAdmin && (
                    <Link href="/cms">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-4 py-2.5 text-gray-700 hover:text-gray-900 transition-all font-space-grotesk font-medium flex items-center gap-2 rounded-lg group"
                      >
                        <Settings className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">CMS</span>
                        <motion.div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/20 to-blue-400/20 transition-opacity"
                        />
                      </motion.button>
                    </Link>
                  )}
                  <motion.button
                    onClick={logout}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2.5 text-gray-700 hover:text-gray-900 transition-all font-space-grotesk font-medium flex items-center gap-2 rounded-lg group"
                  >
                    <LogOut className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Logout</span>
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/20 to-blue-400/20 transition-opacity"
                    />
                  </motion.button>
                </>
              ) : (
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-6 py-2.5 font-space-grotesk font-semibold flex items-center gap-2 rounded-lg overflow-hidden group"
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
                    <span className="relative z-10 text-white flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Login
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative z-50 p-2 rounded-lg glass border border-gray-200 hover:border-gray-300 transition-all"
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
                  <X size={24} className="text-gray-800" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={24} className="text-gray-800" />
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
            className="md:hidden glass-strong border-t border-gray-200 backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="block text-gray-700 hover:text-gray-900 transition-all font-space-grotesk font-medium text-lg py-3 px-4 rounded-lg border-l-2 border-transparent hover:border-blue-500 hover:bg-gray-50 pl-4 relative group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-blue-400/10 transition-opacity"
                  />
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
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-all font-space-grotesk font-medium text-lg py-3 px-4 rounded-lg border-l-2 border-transparent hover:border-blue-500 hover:bg-white/5 pl-4 relative group"
                    >
                      <User className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Profile</span>
                      <motion.div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-blue-400/10 transition-opacity"
                      />
                    </motion.div>
                  </Link>
                  {isAdmin && (
                    <Link href="/cms" onClick={() => setIsMobileMenuOpen(false)}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navItems.length + 1) * 0.1 }}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-all font-space-grotesk font-medium text-lg py-3 px-4 rounded-lg border-l-2 border-transparent hover:border-blue-500 hover:bg-white/5 pl-4 relative group"
                      >
                        <Settings className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">CMS</span>
                        <motion.div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-blue-400/10 transition-opacity"
                        />
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
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-all font-space-grotesk font-medium text-lg py-3 px-4 rounded-lg border-l-2 border-transparent hover:border-blue-500 hover:bg-white/5 pl-4 relative group w-full text-left"
                  >
                    <LogOut className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Logout</span>
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-blue-400/10 transition-opacity"
                    />
                  </motion.button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-white transition-all font-space-grotesk font-semibold text-lg py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 relative overflow-hidden group"
                  >
                    <LogIn className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Login</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
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
