'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save } from 'lucide-react'
import { api } from '@/lib/auth'

interface JobModalProps {
  isOpen: boolean
  onClose: () => void
  job?: any
  onSuccess: () => void
}

export default function JobModal({ isOpen, onClose, job, onSuccess }: JobModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    job_type: 'full-time',
    description: '',
    requirements: '',
    responsibilities: '',
    salary_range: '',
    is_active: true,
    application_deadline: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        department: job.department || '',
        location: job.location || '',
        job_type: job.job_type || 'full-time',
        description: job.description || '',
        requirements: job.requirements || '',
        responsibilities: job.responsibilities || '',
        salary_range: job.salary_range || '',
        is_active: job.is_active !== undefined ? job.is_active : true,
        application_deadline: job.application_deadline || '',
      })
    } else {
      setFormData({
        title: '',
        department: '',
        location: '',
        job_type: 'full-time',
        description: '',
        requirements: '',
        responsibilities: '',
        salary_range: '',
        is_active: true,
        application_deadline: '',
      })
    }
  }, [job, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      if (job) {
        await api.patch(`/jobs/${job.id}/`, formData)
      } else {
        await api.post('/jobs/', formData)
      }
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save job. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl glass-strong rounded-3xl border border-white/20 p-8 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-white hover:border-white/50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-3xl font-orbitron font-bold text-white mb-6">
            {job ? 'Edit Job' : 'Add New Job'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="Engineering"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="Remote"
                />
              </div>
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Job Type *
                </label>
                <select
                  required
                  value={formData.job_type}
                  onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Salary Range
                </label>
                <input
                  type="text"
                  value={formData.salary_range}
                  onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="$80k - $120k"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-space-grotesk font-semibold mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all resize-none font-space-grotesk"
                placeholder="Job description..."
              />
            </div>

            <div>
              <label className="block text-white font-space-grotesk font-semibold mb-2">
                Requirements *
              </label>
              <textarea
                required
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all resize-none font-space-grotesk"
                placeholder="Required skills and qualifications..."
              />
            </div>

            <div>
              <label className="block text-white font-space-grotesk font-semibold mb-2">
                Responsibilities *
              </label>
              <textarea
                required
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all resize-none font-space-grotesk"
                placeholder="Key responsibilities..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={formData.application_deadline}
                  onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                />
              </div>
              <div className="flex items-center gap-3 pt-8">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <label htmlFor="is_active" className="text-white font-space-grotesk">
                  Active (visible on website)
                </label>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 font-space-grotesk">
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSaving}
              whileHover={{ scale: isSaving ? 1 : 1.02 }}
              whileTap={{ scale: isSaving ? 1 : 0.98 }}
              className="w-full px-6 py-4 rounded-xl glass border border-white/20 text-white font-space-grotesk font-bold text-lg flex items-center justify-center gap-2 hover:border-white/50 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Saving...' : job ? 'Update Job' : 'Create Job'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

