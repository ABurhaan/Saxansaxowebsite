'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Linkedin, Twitter, Github, Mail, Users, Sparkles } from 'lucide-react'
import { api } from '@/lib/auth'

interface TeamMember {
  id: number
  name: string
  position: string
  bio: string
  email: string
  linkedin: string
  twitter: string
  github: string
  image_url: string | null
}

export default function Teams() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get('/team/')
        setTeamMembers(response.data.results || response.data)
      } catch (error) {
        console.error('Error fetching team:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeam()
  }, [])

  if (loading) {
    return (
      <section id="teams" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-900">Loading team...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="teams" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-4"
          >
            <span className="text-blue-600 font-jetbrains text-sm uppercase tracking-wider px-4 py-2 rounded-full glass border border-blue-200">
              Our Team
            </span>
          </motion.span>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-orbitron font-black mb-6">
            <span className="gradient-text">Meet the</span>{' '}
            <span className="text-gray-900">Visionaries</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-space-grotesk leading-relaxed mb-4">
            Our team combines decades of experience from leading tech companies with fresh perspectives and innovative thinking
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto font-space-grotesk">
            From former Google engineers to award-winning designers, we've assembled a world-class team dedicated to excellence
          </p>
        </motion.div>

        {teamMembers.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-20 h-20 text-gray-900/20 mx-auto mb-4" />
            <p className="text-gray-600 font-space-grotesk">No team members to display yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-3xl" />
                <div className="relative glass-strong p-8 rounded-3xl border border-gray-200 text-center group-hover:border-white/30 transition-all overflow-hidden">
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
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

                  <div className="relative mb-6">
                    <motion.div
                      className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-1 flex items-center justify-center overflow-hidden shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div className="w-full h-full rounded-full glass-strong border-2 border-white/20 flex items-center justify-center overflow-hidden">
                        {member.image_url ? (
                          <img
                            src={member.image_url}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Users className="w-16 h-16 text-gray-900/50" />
                        )}
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-orbitron font-bold text-gray-900 mb-2 relative z-10">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-space-grotesk font-medium mb-4 relative z-10">
                    {member.position}
                  </p>
                  {member.bio && (
                    <p className="text-gray-600 font-space-grotesk text-sm mb-6 leading-relaxed relative z-10">
                      {member.bio}
                    </p>
                  )}
                  <div className="flex justify-center gap-4 relative z-10">
                    {member.email && (
                      <motion.a
                        href={`mailto:${member.email}`}
                        whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-xl glass border border-gray-200 flex items-center justify-center text-gray-900 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all group"
                      >
                        <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </motion.a>
                    )}
                    {member.linkedin && (
                      <motion.a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-xl glass border border-gray-200 flex items-center justify-center text-gray-900 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all group"
                      >
                        <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </motion.a>
                    )}
                    {member.twitter && (
                      <motion.a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-xl glass border border-gray-200 flex items-center justify-center text-gray-900 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all group"
                      >
                        <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </motion.a>
                    )}
                    {member.github && (
                      <motion.a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-xl glass border border-gray-200 flex items-center justify-center text-gray-900 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all group"
                      >
                        <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
