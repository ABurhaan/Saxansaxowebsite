'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Upload } from 'lucide-react'
import { api } from '@/lib/auth'

interface TeamModalProps {
  isOpen: boolean
  onClose: () => void
  member?: any
  onSuccess: () => void
}

export default function TeamModal({ isOpen, onClose, member, onSuccess }: TeamModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    email: '',
    linkedin: '',
    twitter: '',
    github: '',
    is_active: true,
    order: 0,
  })
  const [image, setImage] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        position: member.position || '',
        bio: member.bio || '',
        email: member.email || '',
        linkedin: member.linkedin || '',
        twitter: member.twitter || '',
        github: member.github || '',
        is_active: member.is_active !== undefined ? member.is_active : true,
        order: member.order || 0,
      })
    } else {
      setFormData({
        name: '',
        position: '',
        bio: '',
        email: '',
        linkedin: '',
        twitter: '',
        github: '',
        is_active: true,
        order: 0,
      })
    }
    setImage(null)
  }, [member, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formDataToSend.append(key, value.toString())
        }
      })
      if (image) {
        formDataToSend.append('image', image)
      }

      if (member) {
        await api.patch(`/team/${member.id}/`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      } else {
        await api.post('/team/', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }
      onSuccess()
      onClose()
    } catch (err: any) {
      console.error('Error saving team member:', err)
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
        setError(errorText || 'Failed to save team member. Please try again.')
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to save team member. Please try again.')
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
            {member ? 'Edit Team Member' : 'Add New Team Member'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="Software Engineer"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-space-grotesk font-semibold mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all resize-none font-space-grotesk"
                placeholder="Team member bio..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-space-grotesk font-semibold mb-2">
                Profile Image
              </label>
              <label className="flex items-center gap-4 p-6 glass border border-white/10 rounded-xl cursor-pointer hover:border-white/50 transition-all">
                <Upload className="w-6 h-6 text-white" />
                <div className="flex-1">
                  {image ? (
                    <span className="text-white font-space-grotesk">{image.name}</span>
                  ) : (
                    <span className="text-gray-400 font-space-grotesk">
                      {member?.image_url ? 'Change image' : 'Upload image'}
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && setImage(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex items-center gap-3">
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
              {isSaving ? 'Saving...' : member ? 'Update Member' : 'Add Member'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

