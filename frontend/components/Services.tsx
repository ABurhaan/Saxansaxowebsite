'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Cloud, Smartphone, Database, Shield, Zap, Sparkles } from 'lucide-react'

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom web applications built with cutting-edge frameworks and revolutionary design patterns',
    gradient: 'from-white/20 via-glass-accent/30 to-glass-blue/20',
    glow: 'glow-white',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure that grows with your dreams and ambitions',
    gradient: 'from-glass-accent/20 via-glass-purple/30 to-glass-pink/20',
    glow: 'glow-glass',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile experiences that users fall in love with',
    gradient: 'from-white/20 via-glass-accent/30 to-glass-blue/20',
    glow: 'glow-white',
  },
  {
    icon: Database,
    title: 'Data Analytics',
    description: 'Transform raw data into golden insights that drive strategic decisions',
    gradient: 'from-glass-accent/20 via-glass-purple/30 to-glass-pink/20',
    glow: 'glow-glass',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Fortress-level security protecting your digital kingdom from all threats',
    gradient: 'from-white/20 via-glass-blue/30 to-glass-accent/20',
    glow: 'glow-white',
  },
  {
    icon: Zap,
    title: 'AI & ML',
    description: 'Intelligent automation that learns, adapts, and evolves with your business',
    gradient: 'from-glass-accent/20 via-glass-purple/30 to-glass-pink/20',
    glow: 'glow-glass',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full"
      >
        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Card */}
        <div className="relative glass-strong p-8 rounded-3xl border border-white/10 h-full transform-gpu">
          {/* Icon Container */}
          <motion.div
            className={`relative w-20 h-20 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 ${service.glow}`}
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <service.icon className="w-10 h-10 text-white" />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"
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

          {/* Content */}
          <h3 className="text-2xl font-orbitron font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-glass-accent group-hover:to-glass-purple group-hover:bg-clip-text transition-all">
            {service.title}
          </h3>
          <p className="text-gray-400 leading-relaxed font-space-grotesk group-hover:text-gray-300 transition-colors">
            {service.description}
          </p>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
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
            <span className="text-white/70 font-jetbrains text-sm uppercase tracking-wider">Our Services</span>
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-6">
            <span className="gradient-text">Magical</span>{' '}
            <span className="text-white">Solutions</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-space-grotesk">
            Transforming ideas into digital reality with cutting-edge technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
