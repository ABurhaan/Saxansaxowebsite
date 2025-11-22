'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Cloud, Smartphone, Database, Shield, Zap, Sparkles, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Code,
    title: 'Enterprise Web Development',
    description: 'Revolutionary web platforms engineered with Next.js, React, and TypeScript. We build lightning-fast, SEO-optimized applications that scale effortlessly and deliver exceptional user experiences across all devices.',
    gradient: 'from-blue-600 via-blue-500 to-blue-400',
    color: 'cyan',
    features: ['Real-time Performance', 'SEO Optimized', 'Progressive Web Apps'],
  },
  {
    icon: Cloud,
    title: 'Cloud-Native Architecture',
    description: 'Transform your infrastructure with AWS, Azure, and GCP solutions. We design resilient, auto-scaling systems that reduce costs by 40% while ensuring 99.9% uptime and seamless global deployment.',
    gradient: 'from-blue-600 via-blue-500 to-blue-400',
    color: 'purple',
    features: ['Multi-Cloud Strategy', 'Auto-Scaling', 'Cost Optimization'],
  },
  {
    icon: Smartphone,
    title: 'Native Mobile Excellence',
    description: 'Craft stunning iOS and Android applications with React Native and Flutter. Our mobile solutions combine native performance with cross-platform efficiency, reaching millions of users with seamless experiences.',
    gradient: 'from-blue-500 via-blue-600 to-blue-400',
    color: 'pink',
    features: ['iOS & Android', 'App Store Ready', 'Offline Capabilities'],
  },
  {
    icon: Database,
    title: 'Advanced Data Intelligence',
    description: 'Unlock the power of your data with machine learning pipelines and real-time analytics. We transform terabytes of information into actionable insights that drive revenue growth and operational excellence.',
    gradient: 'from-blue-600 via-blue-500 to-blue-400',
    color: 'blue',
    features: ['Real-time Analytics', 'ML Pipelines', 'Predictive Insights'],
  },
  {
    icon: Shield,
    title: 'Enterprise Cybersecurity',
    description: 'Protect your digital assets with military-grade security protocols. Our comprehensive security solutions include penetration testing, compliance audits, and 24/7 threat monitoring to safeguard your business.',
    gradient: 'from-blue-600 via-blue-500 to-blue-400',
    color: 'cyan',
    features: ['Zero-Trust Architecture', 'Compliance Ready', 'Threat Detection'],
  },
  {
    icon: Zap,
    title: 'AI & Machine Learning',
    description: 'Harness the power of artificial intelligence to automate workflows, predict trends, and create intelligent systems. From ChatGPT integrations to custom neural networks, we build AI that transforms businesses.',
    gradient: 'from-blue-600 via-blue-500 to-blue-400',
    color: 'purple',
    features: ['Custom AI Models', 'Process Automation', 'Intelligent Systems'],
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

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

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
      className="group relative h-full"
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
        {/* Enhanced Glow Effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Card */}
        <div className="relative glass-strong p-8 rounded-3xl border border-gray-200 h-full transform-gpu overflow-hidden group-hover:border-gray-300 transition-all flex flex-col">
          {/* Animated background gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          />

          {/* Icon Container with Enhanced Design */}
          <motion.div
            className={`relative w-20 h-20 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}
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
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <service.icon className="w-10 h-10 text-white drop-shadow-lg" />
            </motion.div>
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 1,
              }}
            />
          </motion.div>

          {/* Content */}
          <h3 className="text-2xl font-orbitron font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-blue-500 group-hover:to-blue-400 group-hover:bg-clip-text transition-all relative z-10">
            {service.title}
          </h3>
          <p className="text-gray-600 leading-relaxed font-space-grotesk group-hover:text-gray-700 transition-colors relative z-10 mb-4 text-sm">
            {service.description}
          </p>

          {/* Features List */}
          {service.features && (
            <div className="relative z-10 mb-4">
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-3 py-1 rounded-full text-xs font-space-grotesk font-medium bg-gradient-to-r from-blue-500/10 to-blue-400/10 text-gray-700 border border-blue-200/50"
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Learn More Link */}
          <motion.div
            className="flex items-center gap-2 text-blue-600 font-space-grotesk font-semibold opacity-0 group-hover:opacity-100 transition-opacity relative z-10 mt-auto"
            whileHover={{ x: 5 }}
          >
            <span>Discover More</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>

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
            <Sparkles className="w-6 h-6 text-gray-400" />
          </motion.div>

          {/* Corner accent */}
          <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity`} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
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
              Our Services
            </span>
          </motion.span>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-orbitron font-black mb-6">
            <span className="gradient-text">Revolutionary</span>{' '}
            <span className="text-gray-900">Solutions</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-space-grotesk leading-relaxed mb-4">
            We don't just build software—we architect digital transformations that redefine industries
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto font-space-grotesk">
            From concept to deployment, our full-stack expertise delivers solutions that exceed expectations and drive measurable business impact
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
