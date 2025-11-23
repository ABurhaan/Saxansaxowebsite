'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, FileText, Send } from 'lucide-react'
import { api } from '@/lib/auth'
import { useAuth } from '@/contexts/AuthContext'

interface Job {
  id: number
  title: string
  department: string
}

interface JobApplicationModalProps {
  job: Job
  onClose: () => void
}

export default function JobApplicationModal({ job, onClose }: JobApplicationModalProps) {
  const { user, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: '',
    cover_letter: '',
  })
  const [resume, setResume] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('File size must be less than 5MB')
        return
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setErrorMessage('Please upload a PDF, DOC, or DOCX file')
        return
      }
      setResume(file)
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    if (!resume) {
      setErrorMessage('Please upload your resume')
      setIsSubmitting(false)
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('job', job.id.toString())
      formDataToSend.append('first_name', formData.first_name)
      formDataToSend.append('last_name', formData.last_name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('cover_letter', formData.cover_letter)
      formDataToSend.append('resume', resume)

      await api.post('/applications/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setSubmitStatus('success')
      setTimeout(() => {
        onClose()
        setSubmitStatus('idle')
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          cover_letter: '',
        })
        setResume(null)
      }, 2000)
    } catch (error: any) {
      setSubmitStatus('error')
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl glass-strong rounded-3xl border border-gray-200 shadow-2xl p-8 max-h-[90vh] overflow-y-auto bg-white"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-lg glass border border-gray-200 flex items-center justify-center text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-3xl font-orbitron font-bold gradient-text mb-2">
            Apply for {job.title}
          </h2>
          <p className="text-blue-600 font-space-grotesk mb-8">
            {job.department}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-space-grotesk"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-space-grotesk"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-space-grotesk"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-space-grotesk"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                Resume * (PDF, DOC, DOCX - Max 5MB)
              </label>
              <label className="flex items-center gap-4 p-6 glass border border-gray-200 rounded-xl cursor-pointer hover:border-blue-500/50 transition-all">
                <Upload className="w-6 h-6 text-blue-600" />
                <div className="flex-1">
                  {resume ? (
                    <div className="flex items-center gap-2 text-gray-900">
                      <FileText className="w-5 h-5" />
                      <span className="font-space-grotesk">{resume.name}</span>
                    </div>
                  ) : (
                    <span className="text-gray-600 font-space-grotesk">Click to upload resume</span>
                  )}
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                Cover Letter
              </label>
              <textarea
                value={formData.cover_letter}
                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-space-grotesk"
                placeholder="Tell us why you're interested in this position..."
              />
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 font-space-grotesk"
              >
                {errorMessage}
              </motion.div>
            )}

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 font-space-grotesk"
              >
                Application submitted successfully!
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02, y: -2 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full relative px-8 py-4 rounded-xl font-space-grotesk font-bold text-lg overflow-hidden group disabled:opacity-50"
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
              <span className="relative z-10 text-white flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="w-5 h-5" />
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

