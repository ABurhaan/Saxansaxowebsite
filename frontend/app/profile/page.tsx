'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/auth'
import { User, Mail, Phone, FileText, Upload, Save, ArrowLeft, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState({
    phone: '',
    bio: '',
  })
  const [resume, setResume] = useState<File | null>(null)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [loading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile()
      fetchApplications()
    }
  }, [isAuthenticated])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profiles/')
      const profileData = response.data.results?.[0] || response.data[0] || null
      if (profileData) {
        setProfile(profileData)
        setFormData({
          phone: profileData.phone || '',
          bio: profileData.bio || '',
        })
      } else {
        // Create profile if it doesn't exist
        const createResponse = await api.post('/profiles/', {
          phone: '',
          bio: '',
        })
        setProfile(createResponse.data)
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error)
      if (error.response?.status === 404) {
        // Create profile if it doesn't exist
        try {
          const createResponse = await api.post('/profiles/', {
            phone: '',
            bio: '',
          })
          setProfile(createResponse.data)
        } catch (createError) {
          console.error('Error creating profile:', createError)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications/')
      setApplications(response.data.results || response.data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('bio', formData.bio)
      if (resume) {
        formDataToSend.append('resume', resume)
      }
      if (avatar) {
        formDataToSend.append('avatar', avatar)
      }

      const response = await api.patch(`/profiles/${profile.id}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setProfile(response.data)
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setResume(null)
      setAvatar(null)
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile. Please try again.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 font-space-grotesk"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-8 rounded-3xl border border-white/20 mb-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-white/20 to-glass-accent/20 flex items-center justify-center overflow-hidden">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={user?.username} className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-white/50" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-orbitron font-bold text-white">
                {user?.first_name && user?.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user?.username}
              </h1>
              <p className="text-glass-accent font-space-grotesk">@{user?.username}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full pl-12 pr-4 py-3 glass border border-white/10 rounded-xl text-gray-400 font-space-grotesk cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
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
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-white font-space-grotesk font-semibold mb-2">
                Avatar
              </label>
              <label className="flex items-center gap-4 p-6 glass border border-white/10 rounded-xl cursor-pointer hover:border-white/50 transition-all">
                <Upload className="w-6 h-6 text-white" />
                <div className="flex-1">
                  {avatar ? (
                    <span className="text-white font-space-grotesk">{avatar.name}</span>
                  ) : (
                    <span className="text-gray-400 font-space-grotesk">
                      {profile?.avatar_url ? 'Change avatar' : 'Upload avatar'}
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && setAvatar(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-white font-space-grotesk font-semibold mb-2">
                Resume
              </label>
              <label className="flex items-center gap-4 p-6 glass border border-white/10 rounded-xl cursor-pointer hover:border-white/50 transition-all">
                <FileText className="w-6 h-6 text-white" />
                <div className="flex-1">
                  {resume ? (
                    <span className="text-white font-space-grotesk">{resume.name}</span>
                  ) : (
                    <span className="text-gray-400 font-space-grotesk">
                      {profile?.resume_url ? 'Change resume' : 'Upload resume (PDF, DOC, DOCX)'}
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => e.target.files && setResume(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            {message && (
              <div
                className={`p-4 rounded-xl border font-space-grotesk ${
                  message.type === 'success'
                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                    : 'bg-red-500/20 border-red-500/50 text-red-400'
                }`}
              >
                {message.text}
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
              {isSaving ? 'Saving...' : 'Save Profile'}
            </motion.button>
          </form>
        </motion.div>

        {/* Job Applications */}
        {applications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong p-8 rounded-3xl border border-white/20"
          >
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 flex items-center gap-3">
              <Briefcase className="w-6 h-6" />
              My Job Applications
            </h2>
            <div className="space-y-4">
              {applications.map((app: any) => (
                <div
                  key={app.id}
                  className="glass p-6 rounded-2xl border border-white/10"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                        {app.job_title}
                      </h3>
                      <p className="text-gray-400 font-space-grotesk text-sm mb-2">
                        Applied on {new Date(app.applied_date).toLocaleDateString()}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-xs font-space-grotesk font-semibold ${
                          app.status === 'accepted'
                            ? 'bg-green-500/20 text-green-400'
                            : app.status === 'rejected'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

