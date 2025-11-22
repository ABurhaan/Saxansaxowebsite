'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Users, Award, TrendingUp, Sparkles, Zap } from 'lucide-react'

const stats = [
  { icon: Users, value: '500+', label: 'Happy Clients', color: 'from-white/80 to-glass-accent' },
  { icon: Award, value: '1000+', label: 'Projects Completed', color: 'from-glass-accent to-glass-purple' },
  { icon: TrendingUp, value: '98%', label: 'Success Rate', color: 'from-white/80 to-glass-blue' },
  { icon: Target, value: '50+', label: 'Team Members', color: 'from-glass-accent to-glass-pink' },
]

function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
      animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.1, y: -10 }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-3xl" style={{
        backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
      }} />
      <div className="relative glass-strong p-8 rounded-3xl border border-white/10 text-center">
        <motion.div
          className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center relative overflow-hidden`}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <stat.icon className="w-10 h-10 text-white relative z-10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
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
        <motion.div
          className="text-5xl font-orbitron font-black mb-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
            {stat.value}
          </span>
        </motion.div>
        <div className="text-gray-400 font-space-grotesk font-medium">{stat.label}</div>
      </div>
    </motion.div>
  )
}

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section id="about" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-glass-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

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
            <span className="text-white/70 font-jetbrains text-sm uppercase tracking-wider">About Us</span>
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-6">
            <span className="text-white">Crafting</span>{' '}
            <span className="gradient-text">Digital</span>{' '}
            <span className="text-white">Magic</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-space-grotesk">
            Where innovation meets excellence in every pixel and line of code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-4xl font-orbitron font-bold text-white">
                Who We Are
              </h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed font-space-grotesk">
              <span className="glass-text">Saxansaxo Technology</span> is a visionary technology company
              that transforms ambitious ideas into extraordinary digital experiences. We don't just build
              software—we craft digital magic.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed font-space-grotesk">
              With a team of passionate innovators, we combine cutting-edge technology with creative
              excellence to deliver solutions that don't just meet expectations—they exceed them in ways
              you never imagined.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed font-space-grotesk">
              Every project is an opportunity to push boundaries, break conventions, and create something
              truly magical that stands the test of time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-glass-accent/20 rounded-3xl blur-3xl" />
            <div className="relative glass-strong p-10 rounded-3xl border border-white/20">
              <div className="space-y-8">
                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-white/10 to-transparent border border-white/20"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-white/30 to-glass-accent/30 flex items-center justify-center flex-shrink-0"
                  >
                    <Target className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-white font-orbitron font-bold text-xl mb-2">Our Mission</h4>
                    <p className="text-gray-400 font-space-grotesk">Empower businesses through revolutionary technology and creative innovation</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-glass-accent/10 to-transparent border border-glass-accent/20"
                >
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-glass-blue/30 to-glass-accent/30 flex items-center justify-center flex-shrink-0"
                  >
                    <TrendingUp className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-white font-orbitron font-bold text-xl mb-2">Our Vision</h4>
                    <p className="text-gray-400 font-space-grotesk">Be the most innovative and trusted technology partner globally</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
