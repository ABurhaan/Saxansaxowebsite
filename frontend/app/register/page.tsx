'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { UserPlus, Mail, Lock, User, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.password2) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      await register(formData)
      router.push('/')
    } catch (err: any) {
      console.error('Registration error:', err)
      // Handle different error formats
      if (err.response?.data) {
        const errorData = err.response.data
        // If it's a dictionary of field errors, format them
        if (typeof errorData === 'object' && !errorData.message) {
          const errorMessages = Object.entries(errorData)
            .map(([field, messages]: [string, any]) => {
              if (Array.isArray(messages)) {
                return `${field}: ${messages.join(', ')}`
              }
              return `${field}: ${messages}`
            })
            .join('\n')
          setError(errorMessages || 'Registration failed. Please check your input.')
        } else {
          setError(errorData.message || errorData.detail || 'Registration failed')
        }
      } else {
        setError(err.message || 'Registration failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-glass-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-strong p-8 rounded-3xl border border-white/20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 font-space-grotesk"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-white/20 to-glass-accent/20 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-orbitron font-bold text-white">Sign Up</h1>
              <p className="text-gray-400 font-space-grotesk">Create your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-space-grotesk font-semibold mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                    placeholder="John"
                  />
                </div>
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

            <div>
              <label className="block text-white font-space-grotesk font-semibold mb-2">
                Username *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="johndoe"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-space-grotesk font-semibold mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-space-grotesk font-semibold mb-2">
                Password * (min. 8 characters)
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1 font-space-grotesk">
                Must be at least 8 characters and not too common
              </p>
            </div>

            <div>
              <label className="block text-white font-space-grotesk font-semibold mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="password"
                  required
                  value={formData.password2}
                  onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 glass border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all font-space-grotesk"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 font-space-grotesk text-sm whitespace-pre-line">
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full px-6 py-4 rounded-xl glass border border-white/20 text-white font-space-grotesk font-bold text-lg flex items-center justify-center gap-2 hover:border-white/50 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </motion.button>
          </form>

          <p className="text-center text-gray-400 font-space-grotesk mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:text-glass-accent transition-colors">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

