'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight, X } from 'lucide-react'
import { api } from '@/lib/auth'
import { useAuth } from '@/contexts/AuthContext'
import JobApplicationModal from './JobApplicationModal'

interface Job {
  id: number
  title: string
  department: string
  location: string
  job_type: string
  description: string
  requirements: string
  responsibilities: string
  salary_range: string
  posted_date: string
  application_deadline: string | null
  application_count: number
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs/')
        setJobs(response.data.results || response.data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleApply = (job: Job) => {
    setSelectedJob(job)
    setShowApplicationModal(true)
  }

  const getJobTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'full-time': 'from-white/30 to-glass-accent/30',
      'part-time': 'from-glass-accent/30 to-glass-purple/30',
      'contract': 'from-glass-purple/30 to-glass-pink/30',
      'internship': 'from-glass-pink/30 to-white/30',
    }
    return colors[type] || 'from-white/30 to-glass-accent/30'
  }

  if (loading) {
    return (
      <section id="jobs" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-white">Loading jobs...</div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="jobs" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-glass-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
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
              <span className="text-white/70 font-jetbrains text-sm uppercase tracking-wider">Careers</span>
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-6">
              <span className="gradient-text">Join Our</span>{' '}
              <span className="text-white">Team</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-space-grotesk">
              Build the future with us. Explore exciting opportunities.
            </p>
          </motion.div>

          {jobs.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="w-20 h-20 text-white/20 mx-auto mb-4" />
              <p className="text-gray-400 font-space-grotesk">No open positions at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-3xl" style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(224, 231, 255, 0.1))`,
                  }} />
                  <div className="relative glass-strong p-8 rounded-3xl border border-white/10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-orbitron font-bold text-white mb-2">
                          {job.title}
                        </h3>
                        <p className="text-glass-accent font-space-grotesk font-medium">
                          {job.department}
                        </p>
                      </div>
                      <motion.div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${getJobTypeColor(job.job_type)} flex items-center justify-center flex-shrink-0`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Briefcase className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-400 font-space-grotesk text-sm">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 font-space-grotesk text-sm">
                        <Clock className="w-4 h-4" />
                        {job.job_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                      {job.salary_range && (
                        <div className="flex items-center gap-2 text-gray-400 font-space-grotesk text-sm">
                          <DollarSign className="w-4 h-4" />
                          {job.salary_range}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-400 font-space-grotesk text-sm mb-6 line-clamp-3 flex-1">
                      {job.description}
                    </p>

                    <motion.button
                      onClick={() => handleApply(job)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 rounded-xl glass border border-white/20 text-white font-space-grotesk font-semibold flex items-center justify-center gap-2 hover:border-white/50 transition-all group"
                    >
                      Apply Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {showApplicationModal && selectedJob && (
          <JobApplicationModal
            job={selectedJob}
            onClose={() => {
              setShowApplicationModal(false)
              setSelectedJob(null)
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

