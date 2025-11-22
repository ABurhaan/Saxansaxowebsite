'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Users, Award, TrendingUp, Sparkles, Zap, Rocket, Star } from 'lucide-react'

const stats = [
  { icon: Users, value: '500+', label: 'Global Clients', gradient: 'from-blue-600 to-blue-500', desc: 'Across 30+ countries' },
  { icon: Award, value: '1000+', label: 'Projects Delivered', gradient: 'from-blue-600 to-blue-400', desc: '99.2% on-time delivery' },
  { icon: TrendingUp, value: '98%', label: 'Client Retention', gradient: 'from-blue-500 to-blue-600', desc: '5-star satisfaction' },
  { icon: Target, value: '50+', label: 'Expert Engineers', gradient: 'from-blue-600 to-blue-500', desc: 'Award-winning talent' },
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
      <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-3xl`} />
      <div className="relative glass-strong p-8 rounded-3xl border border-gray-200 text-center group-hover:border-white/30 transition-all">
        <motion.div
          className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center relative overflow-hidden shadow-lg`}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          whileHover={{ scale: 1.15 }}
        >
          <stat.icon className="w-10 h-10 text-gray-900 relative z-10" />
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
        <motion.div
          className="text-5xl font-orbitron font-black mb-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
            {stat.value}
          </span>
        </motion.div>
        <div className="text-gray-600 font-space-grotesk font-medium mb-1">{stat.label}</div>
        {stat.desc && (
          <div className="text-xs text-gray-500 font-space-grotesk">{stat.desc}</div>
        )}
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
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
              About Us
            </span>
          </motion.span>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-orbitron font-black mb-6">
            <span className="text-gray-900">Architects of</span>{' '}
            <span className="gradient-text">Digital</span>{' '}
            <span className="text-gray-900">Excellence</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-space-grotesk leading-relaxed mb-4">
            We're not just developers—we're digital architects crafting the future of technology
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto font-space-grotesk">
            With a decade of expertise, we've transformed 500+ businesses across 30 countries, delivering solutions that generate over $2B in combined client revenue
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
                className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center"
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-4xl font-orbitron font-bold gradient-text">
                Who We Are
              </h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed font-space-grotesk">
              <span className="text-blue-600 font-bold">Saxansaxo Technology</span> stands at the forefront of digital innovation, 
              specializing in enterprise-grade solutions that transform how businesses operate. Founded in 2014, we've grown from a 
              startup to a global technology powerhouse, serving Fortune 500 companies and ambitious startups alike.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed font-space-grotesk">
              Our multidisciplinary team of 50+ engineers, designers, and strategists brings together expertise in AI, cloud computing, 
              cybersecurity, and data science. We've been recognized with 15+ industry awards and maintain partnerships with leading 
              tech giants including AWS, Microsoft, and Google Cloud.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed font-space-grotesk">
              What sets us apart is our commitment to measurable outcomes. Every solution we deliver is backed by data-driven insights, 
              resulting in an average 45% increase in operational efficiency and 60% reduction in development costs for our clients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-3xl blur-3xl" />
            <div className="relative glass-strong p-10 rounded-3xl border border-gray-300">
              <div className="space-y-8">
                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 group hover:border-blue-500/50 transition-all"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg"
                  >
                    <Target className="w-8 h-8 text-gray-900" />
                  </motion.div>
                  <div>
                    <h4 className="text-gray-900 font-orbitron font-bold text-xl mb-2">Our Mission</h4>
                    <p className="text-gray-600 font-space-grotesk group-hover:text-gray-700 transition-colors">
                      To democratize cutting-edge technology and empower businesses of all sizes to achieve extraordinary growth through 
                      intelligent automation, scalable infrastructure, and data-driven decision making.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 group hover:border-blue-500/50 transition-all"
                >
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg"
                  >
                    <TrendingUp className="w-8 h-8 text-gray-900" />
                  </motion.div>
                  <div>
                    <h4 className="text-gray-900 font-orbitron font-bold text-xl mb-2">Our Vision</h4>
                    <p className="text-gray-600 font-space-grotesk group-hover:text-gray-700 transition-colors">
                      To become the world's most trusted technology transformation partner, recognized for our ability to turn complex 
                      challenges into elegant solutions that drive sustainable competitive advantage and long-term success.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
