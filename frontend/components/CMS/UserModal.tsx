'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save } from 'lucide-react'
import { api } from '@/lib/auth'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  user?: any
  onSuccess: () => void
}

export default function UserModal({ isOpen, onClose, user, onSuccess }: UserModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    is_staff: false,
    is_superuser: false,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        is_staff: user.is_staff || false,
        is_superuser: user.is_superuser || false,
      })
    }
  }, [user, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      await api.patch(`/users/${user.id}/`, formData)
      onSuccess()
      onClose()
    } catch (err: any) {
      console.error('Error saving user:', err)
      const errorMsg = err.response?.data
      if (typeof errorMsg === 'object') {
        const errorText = Object.entries(errorMsg)
          .map(([field, messages]: [string, any]) => {
            if (Array.isArray(messages)) {
              return `${field}: ${messages.join(', ')}`
            }
            return `${field}: ${messages}`
          })
          .join('\n')
        setError(errorText || 'Failed to save user. Please try again.')
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to save user. Please try again.')
      }
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
          className="relative w-full max-w-2xl glass-strong rounded-3xl border border-white/20 p-8 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-white hover:border-white/50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-3xl font-orbitron font-bold text-white mb-6">
            Edit User
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="username"
                />
              </div>
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="user@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-4 p-4 glass border border-white/10 rounded-xl">
              <h3 className="text-white font-space-grotesk font-semibold mb-3">Permissions</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_staff}
                    onChange={(e) => setFormData({ ...formData, is_staff: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                  <div>
                    <span className="text-white font-space-grotesk font-semibold">Staff Status</span>
                    <p className="text-gray-400 font-space-grotesk text-sm">Allow access to CMS</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_superuser}
                    onChange={(e) => setFormData({ ...formData, is_superuser: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                  <div>
                    <span className="text-white font-space-grotesk font-semibold">Superuser Status</span>
                    <p className="text-gray-400 font-space-grotesk text-sm">Full admin access</p>
                  </div>
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
              {isSaving ? 'Saving...' : 'Update User'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

