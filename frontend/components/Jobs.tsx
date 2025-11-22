'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight, X, Sparkles } from 'lucide-react'
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
      'full-time': 'from-blue-600 to-blue-500',
      'part-time': 'from-blue-500 to-blue-400',
      'contract': 'from-blue-600 to-blue-400',
      'internship': 'from-blue-500 to-blue-600',
    }
    return colors[type] || 'from-blue-600 to-blue-500'
  }

  if (loading) {
    return (
      <section id="jobs" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-900">Loading jobs...</div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="jobs" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
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
              <span className="text-blue-600 font-jetbrains text-sm uppercase tracking-wider px-4 py-2 rounded-full glass border border-blue-500/20">
                Careers
              </span>
            </motion.span>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-orbitron font-black mb-6">
              <span className="gradient-text">Shape the</span>{' '}
              <span className="text-gray-900">Future</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-space-grotesk leading-relaxed mb-4">
              Join a team of world-class engineers, designers, and innovators building the next generation of technology
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto font-space-grotesk">
              We offer competitive salaries, equity packages, remote flexibility, and opportunities to work on cutting-edge projects 
              that impact millions of users worldwide
            </p>
          </motion.div>

          {jobs.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="w-20 h-20 text-gray-900/20 mx-auto mb-4" />
              <p className="text-gray-600 font-space-grotesk">No open positions at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${getJobTypeColor(job.job_type)} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-3xl`} />
                  <div className="relative glass-strong p-8 rounded-3xl border border-gray-200 h-full flex flex-col group-hover:border-white/30 transition-all overflow-hidden">
                    {/* Animated background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${getJobTypeColor(job.job_type)} opacity-0 group-hover:opacity-10 transition-opacity`}
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

                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="flex-1">
                        <h3 className="text-2xl font-orbitron font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-blue-500 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
                          {job.title}
                        </h3>
                        <p className="text-blue-600 font-space-grotesk font-medium">
                          {job.department}
                        </p>
                      </div>
                      <motion.div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${getJobTypeColor(job.job_type)} flex items-center justify-center flex-shrink-0 shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Briefcase className="w-8 h-8 text-gray-900" />
                      </motion.div>
                    </div>

                    <div className="space-y-3 mb-6 relative z-10">
                      <div className="flex items-center gap-2 text-gray-600 font-space-grotesk text-sm group-hover:text-gray-700 transition-colors">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 font-space-grotesk text-sm group-hover:text-gray-700 transition-colors">
                        <Clock className="w-4 h-4 text-blue-500" />
                        {job.job_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                      {job.salary_range && (
                        <div className="flex items-center gap-2 text-gray-600 font-space-grotesk text-sm group-hover:text-gray-700 transition-colors">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                          {job.salary_range}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 font-space-grotesk text-sm mb-6 line-clamp-3 flex-1 relative z-10 group-hover:text-gray-300 transition-colors">
                      {job.description}
                    </p>

                    <motion.button
                      onClick={() => handleApply(job)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full relative px-6 py-3 rounded-xl font-space-grotesk font-semibold flex items-center justify-center gap-2 overflow-hidden group/btn relative z-10"
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${getJobTypeColor(job.job_type)}`}
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
                      <span className="relative z-10 text-gray-900 flex items-center gap-2">
                        Apply Now
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
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
