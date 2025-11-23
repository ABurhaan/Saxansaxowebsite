'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, FileText, Mail, Phone, Calendar, Download } from 'lucide-react'
import { api } from '@/lib/auth'

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  application?: any
  onSuccess: () => void
}

export default function ApplicationModal({ isOpen, onClose, application, onSuccess }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    status: 'pending',
    notes: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (application) {
      setFormData({
        status: application.status || 'pending',
        notes: application.notes || '',
      })
    }
  }, [application, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      await api.patch(`/applications/${application.id}/update_status/`, {
        status: formData.status,
        notes: formData.notes,
      })
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update application. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen || !application) return null

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30' },
    { value: 'reviewing', label: 'Reviewing', color: 'bg-blue-500/10 text-blue-600 border-blue-500/30' },
    { value: 'shortlisted', label: 'Shortlisted', color: 'bg-purple-500/10 text-purple-600 border-purple-500/30' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-500/10 text-red-600 border-red-500/30' },
    { value: 'accepted', label: 'Accepted', color: 'bg-green-500/10 text-green-600 border-green-500/30' },
  ]

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
            Edit Application
          </h2>
          <p className="text-blue-600 font-space-grotesk mb-8">
            {application.job_title}
          </p>

          {/* Application Details */}
          <div className="glass p-6 rounded-2xl border border-gray-200 mb-6">
            <h3 className="text-lg font-orbitron font-bold text-gray-900 mb-4">Applicant Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 flex items-center justify-center text-white font-space-grotesk font-bold">
                  {application.first_name?.[0]}{application.last_name?.[0]}
                </div>
                <div>
                  <p className="text-gray-900 font-space-grotesk font-semibold">
                    {application.first_name} {application.last_name}
                  </p>
                  <p className="text-gray-600 font-space-grotesk text-sm">{application.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                {application.phone && (
                  <div className="flex items-center gap-2 text-gray-600 font-space-grotesk text-sm">
                    <Phone className="w-4 h-4" />
                    {application.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600 font-space-grotesk text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(application.applied_date).toLocaleDateString()}
                </div>
              </div>
              {application.cover_letter && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-gray-900 font-space-grotesk font-semibold mb-2 text-sm">Cover Letter:</p>
                  <p className="text-gray-600 font-space-grotesk text-sm line-clamp-3">
                    {application.cover_letter}
                  </p>
                </div>
              )}
              {application.resume_url && (
                <div className="pt-3 border-t border-gray-200">
                  <a
                    href={application.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-space-grotesk text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-900 font-space-grotesk font-semibold mb-3">
                Application Status *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {statusOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.status === option.value
                        ? `${option.color} border-current`
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={formData.status === option.value}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="sr-only"
                    />
                    <span className="font-space-grotesk font-semibold text-sm">{option.label}</span>
                    {formData.status === option.value && (
                      <motion.div
                        layoutId="statusIndicator"
                        className="absolute inset-0 rounded-xl border-2 border-current"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                Notes (Internal)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-space-grotesk"
                placeholder="Add internal notes about this application..."
              />
              <p className="text-gray-500 text-xs mt-1 font-space-grotesk">
                These notes are only visible to administrators
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 font-space-grotesk"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSaving}
              whileHover={{ scale: isSaving ? 1 : 1.02, y: -2 }}
              whileTap={{ scale: isSaving ? 1 : 0.98 }}
              className="w-full relative px-6 py-4 rounded-xl font-space-grotesk font-bold text-lg overflow-hidden group disabled:opacity-50"
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
                <Save className="w-5 h-5" />
                {isSaving ? 'Saving...' : 'Update Application'}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

