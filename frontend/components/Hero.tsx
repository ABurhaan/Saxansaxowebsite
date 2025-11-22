'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Rocket, Star, TrendingUp } from 'lucide-react'
import ParticleSystem from './ParticleSystem'
import MorphingBlob from './MorphingBlob'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set((e.clientX - centerX) / 20)
        mouseY.set((e.clientY - centerY) / 20)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const rotateX = useTransform(y, [-20, 20], [10, -10])
  const rotateY = useTransform(x, [-20, 20], [-10, 10])

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <ParticleSystem />
      
      {/* Enhanced Animated Background Blobs */}
      <MorphingBlob className="top-10 left-10" size={700} />
      <MorphingBlob className="bottom-10 right-10" size={600} />
      <MorphingBlob className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={500} />

      {/* Floating Gradient Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.3), transparent)',
          }}
          animate={{
            x: [0, Math.sin(i) * 200, 0],
            y: [0, Math.cos(i) * 200, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      {/* 3D Floating Elements */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-gray-200 mb-8 group hover:border-blue-500/50 transition-all"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Star className="w-4 h-4 text-blue-600" />
            </motion.div>
            <span className="text-sm font-space-grotesk font-semibold text-gray-800">
              Pioneering Tomorrow's Technology Today
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </motion.div>
          </motion.div>

          {/* Icon with Enhanced Glow */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-block mb-8 relative"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.15, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="relative"
            >
              {/* Multiple glow layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full blur-2xl opacity-30" />
              <div className="relative z-10">
                <Sparkles className="w-24 h-24 text-blue-600 drop-shadow-[0_0_30px_rgba(37,99,235,0.6)]" />
              </div>
            </motion.div>
          </motion.div>

          {/* Main Heading with Enhanced Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-7xl md:text-8xl lg:text-9xl font-orbitron font-black mb-6 leading-tight"
          >
            <span className="block gradient-text text-reveal mb-2">
              <motion.span
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="inline-block"
              >
                Saxansaxo
              </motion.span>
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
              className="block text-gray-900 text-5xl md:text-6xl lg:text-7xl font-space-grotesk font-light mt-2"
            >
              Technology
            </motion.span>
          </motion.h1>

          {/* Enhanced Subtitle with More Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-8 max-w-5xl mx-auto"
          >
            <motion.p
              className="text-2xl md:text-3xl lg:text-4xl text-gray-700 mb-6 font-space-grotesk leading-relaxed"
            >
              Where{' '}
              <span className="relative inline-block">
              <span className="glass-text font-jetbrains font-bold text-blue-600">cutting-edge innovation</span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </span>
              {' '}meets{' '}
              <span className="relative inline-block">
              <span className="glass-text font-jetbrains font-bold text-blue-600">transformative solutions</span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                />
              </span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-space-grotesk leading-relaxed"
            >
              We craft exceptional digital experiences that propel businesses into the future. From AI-powered automation to cloud-native architectures, we transform complex challenges into elegant solutions that drive real results.
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 rounded-full font-space-grotesk font-bold text-xl overflow-hidden"
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 text-white flex items-center gap-3">
                <Rocket className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                Explore Magic
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 border-2 border-gray-300 rounded-full font-space-grotesk font-bold text-xl text-gray-800 hover:border-blue-500/50 transition-all overflow-hidden backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                <Zap className="w-5 h-5" />
                Get in Touch
              </span>
            </motion.a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-8"
          >
            {[
              { value: '500+', label: 'Projects Delivered', icon: Rocket, desc: 'Across 30+ countries' },
              { value: '98%', label: 'Client Satisfaction', icon: TrendingUp, desc: '5-star rated' },
              { value: '50+', label: 'Expert Team', icon: Sparkles, desc: 'Award-winning talent' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + i * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="glass p-6 rounded-2xl border border-gray-200 text-center min-w-[140px] group hover:border-blue-500/50 transition-all"
              >
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-orbitron font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-800 font-space-grotesk mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500 font-space-grotesk">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  )
}
