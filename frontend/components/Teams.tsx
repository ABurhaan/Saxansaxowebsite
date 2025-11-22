'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Linkedin, Twitter, Github, Mail, Users } from 'lucide-react'
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
          <div className="text-white">Loading team...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="teams" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-glass-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            <span className="text-white/70 font-jetbrains text-sm uppercase tracking-wider">Our Team</span>
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-6">
            <span className="gradient-text">Meet the</span>{' '}
            <span className="text-white">Masters</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-space-grotesk">
            The brilliant minds behind our innovative solutions
          </p>
        </motion.div>

        {teamMembers.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-20 h-20 text-white/20 mx-auto mb-4" />
            <p className="text-gray-400 font-space-grotesk">No team members to display yet.</p>
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
                <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-3xl" style={{
                  backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(224, 231, 255, 0.1))`,
                }} />
                <div className="relative glass-strong p-8 rounded-3xl border border-white/10 text-center">
                  <div className="relative mb-6">
                    <motion.div
                      className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-white/20 to-glass-accent/20 flex items-center justify-center overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                    >
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users className="w-16 h-16 text-white/50" />
                      )}
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-glass-accent font-space-grotesk font-medium mb-4">
                    {member.position}
                  </p>
                  {member.bio && (
                    <p className="text-gray-400 font-space-grotesk text-sm mb-6 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                  <div className="flex justify-center gap-4">
                    {member.email && (
                      <motion.a
                        href={`mailto:${member.email}`}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-white hover:border-white/50 transition-all"
                      >
                        <Mail className="w-5 h-5" />
                      </motion.a>
                    )}
                    {member.linkedin && (
                      <motion.a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-white hover:border-white/50 transition-all"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                    )}
                    {member.twitter && (
                      <motion.a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-white hover:border-white/50 transition-all"
                      >
                        <Twitter className="w-5 h-5" />
                      </motion.a>
                    )}
                    {member.github && (
                      <motion.a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-white hover:border-white/50 transition-all"
                      >
                        <Github className="w-5 h-5" />
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

