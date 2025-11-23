'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/auth'
import { 
  Settings, Users, Briefcase, FileText, Building2, User as UserIcon,
  Plus, Edit, Trash2, Save, X, Download, Mail, Phone, Calendar
} from 'lucide-react'
import Link from 'next/link'
import JobModal from '@/components/CMS/JobModal'
import TeamModal from '@/components/CMS/TeamModal'
import UserModal from '@/components/CMS/UserModal'
import ApplicationModal from '@/components/CMS/ApplicationModal'
import Navbar from '@/components/Navbar'
import ParticleSystem from '@/components/ParticleSystem'
import MorphingBlob from '@/components/MorphingBlob'

export default function CMSPage() {
  const router = useRouter()
  const { user, isAuthenticated, loading, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState<'jobs' | 'team' | 'applications' | 'users' | 'company'>('jobs')
  const [jobs, setJobs] = useState<any[]>([])
  const [team, setTeam] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [company, setCompany] = useState<any>(null)
  const [loadingData, setLoadingData] = useState(true)
  
  // Modal states
  const [jobModalOpen, setJobModalOpen] = useState(false)
  const [teamModalOpen, setTeamModalOpen] = useState(false)
  const [userModalOpen, setUserModalOpen] = useState(false)
  const [applicationModalOpen, setApplicationModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    } else if (!loading && isAuthenticated && !isAdmin) {
      router.push('/')
    }
  }, [loading, isAuthenticated, isAdmin, router])

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchData()
    }
  }, [isAuthenticated, isAdmin, activeTab])

  const fetchData = async () => {
    setLoadingData(true)
    try {
      if (activeTab === 'jobs') {
        const response = await api.get('/jobs/')
        setJobs(response.data.results || response.data)
      } else if (activeTab === 'team') {
        const response = await api.get('/team/')
        setTeam(response.data.results || response.data)
      } else if (activeTab === 'applications') {
        const response = await api.get('/applications/')
        setApplications(response.data.results || response.data)
      } else if (activeTab === 'users') {
        // Fetch users directly from users endpoint
        const response = await api.get('/users/')
        setUsers(response.data.results || response.data)
      } else if (activeTab === 'company') {
        // Company endpoint returns a list, get the first one or use detail endpoint
        try {
          const response = await api.get('/company/1/')
          setCompany(response.data)
        } catch (error) {
          // If detail endpoint fails, try list endpoint
          const response = await api.get('/company/')
          const companyData = Array.isArray(response.data) ? response.data[0] : response.data
          setCompany(companyData)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoadingData(false)
    }
  }

  const handleDeleteJob = async (jobId: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return
    
    try {
      await api.delete(`/jobs/${jobId}/`)
      fetchData()
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Failed to delete job. Please try again.')
    }
  }

  const handleDeleteMember = async (memberId: number) => {
    if (!confirm('Are you sure you want to delete this team member?')) return
    
    try {
      await api.delete(`/team/${memberId}/`)
      fetchData()
    } catch (error) {
      console.error('Error deleting member:', error)
      alert('Failed to delete team member. Please try again.')
    }
  }

  const handleEditJob = (job: any) => {
    setSelectedJob(job)
    setJobModalOpen(true)
  }

  const handleEditMember = (member: any) => {
    setSelectedMember(member)
    setTeamModalOpen(true)
  }

  const handleAddJob = () => {
    setSelectedJob(null)
    setJobModalOpen(true)
  }

  const handleAddMember = () => {
    setSelectedMember(null)
    setTeamModalOpen(true)
  }

  const handleEditApplication = (app: any) => {
    setSelectedApplication(app)
    setApplicationModalOpen(true)
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setUserModalOpen(true)
  }

  const handleCompanySave = async () => {
    try {
      const formData = {
        name: (document.getElementById('company-name') as HTMLInputElement)?.value || company.name,
        email: (document.getElementById('company-email') as HTMLInputElement)?.value || company.email,
        phone: (document.getElementById('company-phone') as HTMLInputElement)?.value || company.phone,
        address: (document.getElementById('company-address') as HTMLTextAreaElement)?.value || company.address,
        about: (document.getElementById('company-about') as HTMLTextAreaElement)?.value || company.about,
        mission: (document.getElementById('company-mission') as HTMLTextAreaElement)?.value || company.mission || '',
        vision: (document.getElementById('company-vision') as HTMLTextAreaElement)?.value || company.vision || '',
      }
      
      // Use PATCH on the specific company object (ID 1)
      await api.patch(`/company/${company.id || 1}/`, formData)
      alert('Company information updated successfully!')
      fetchData()
    } catch (error: any) {
      console.error('Error updating company:', error)
      const errorMsg = error.response?.data?.message || error.response?.data?.detail || 'Failed to update company information. Please try again.'
      alert(errorMsg)
    }
  }

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900">Loading...</div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
        <ParticleSystem />
        <Navbar />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <MorphingBlob className="top-10 left-10" size={500} />
          <MorphingBlob className="bottom-10 right-10" size={600} />
        </div>
        <div className="relative z-10 glass-strong p-8 rounded-3xl border border-gray-200 shadow-xl text-center max-w-md">
          <h2 className="text-2xl font-orbitron font-bold gradient-text mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 font-space-grotesk mb-6">
            You need administrator privileges to access the CMS.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 glass border border-gray-200 rounded-xl text-gray-900 font-space-grotesk font-semibold hover:border-blue-500/50 transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-white relative overflow-hidden">
        <ParticleSystem />
        <Navbar />
        
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <MorphingBlob className="top-10 left-10" size={500} />
          <MorphingBlob className="bottom-10 right-10" size={600} />
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-orbitron font-bold gradient-text mb-2">
                Content Management System
              </h1>
              <p className="text-gray-600 font-space-grotesk">
                Manage your website content
              </p>
            </div>
            <Link
              href="/"
              className="px-6 py-3 glass border border-gray-200 rounded-xl text-gray-900 font-space-grotesk hover:border-blue-500/50 transition-all"
            >
              Back to Website
            </Link>
          </div>

          <div className="flex gap-4 mb-8 border-b border-gray-200">
            {[
              { id: 'jobs', label: 'Jobs', icon: Briefcase },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'applications', label: 'Applications', icon: FileText },
              { id: 'users', label: 'Users', icon: UserIcon },
              { id: 'company', label: 'Company Info', icon: Building2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 font-space-grotesk font-semibold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="glass-strong rounded-3xl border border-gray-200 shadow-xl p-8">
            {loadingData ? (
              <div className="text-center py-20">
                <div className="text-gray-900">Loading...</div>
              </div>
            ) : (
              <>
                {activeTab === 'jobs' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-orbitron font-bold gradient-text">Job Postings</h2>
                      <motion.button
                        onClick={handleAddJob}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-6 py-3 rounded-xl font-space-grotesk flex items-center gap-2 overflow-hidden group"
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
                        <Plus className="w-5 h-5 relative z-10 text-white" />
                        <span className="relative z-10 text-white font-semibold">Add Job</span>
                      </motion.button>
                    </div>
                    <div className="space-y-4">
                      {jobs.length === 0 ? (
                        <div className="text-center py-12">
                          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-600 font-space-grotesk">No jobs posted yet. Click "Add Job" to create one.</p>
                        </div>
                      ) : (
                        jobs.map((job) => (
                          <div
                            key={job.id}
                            className="glass p-6 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-all"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="text-xl font-orbitron font-bold text-gray-900 mb-2">
                                  {job.title}
                                </h3>
                                <p className="text-blue-600 font-space-grotesk mb-2">
                                  {job.department} • {job.location} • {job.job_type}
                                </p>
                                <p className="text-gray-600 font-space-grotesk text-sm line-clamp-2 mb-2">
                                  {job.description}
                                </p>
                                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-space-grotesk font-semibold border ${
                                  job.is_active ? 'bg-green-500/10 text-green-600 border-green-500/30' : 'bg-gray-500/10 text-gray-600 border-gray-500/30'
                                }`}>
                                  {job.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <motion.button
                                  onClick={() => handleEditJob(job)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 glass border border-gray-200 rounded-lg text-gray-900 hover:border-blue-500/50 transition-all"
                                >
                                  <Edit className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  onClick={() => handleDeleteJob(job.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 glass border border-gray-200 rounded-lg text-red-600 hover:border-red-500/50 transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'team' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-orbitron font-bold gradient-text">Team Members</h2>
                      <motion.button
                        onClick={handleAddMember}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-6 py-3 rounded-xl font-space-grotesk flex items-center gap-2 overflow-hidden group"
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
                        <Plus className="w-5 h-5 relative z-10 text-white" />
                        <span className="relative z-10 text-white font-semibold">Add Member</span>
                      </motion.button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {team.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-600 font-space-grotesk">No team members yet. Click "Add Member" to add one.</p>
                        </div>
                      ) : (
                        team.map((member) => (
                          <div
                            key={member.id}
                            className="glass p-6 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-all"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <h3 className="text-lg font-orbitron font-bold text-gray-900">
                                  {member.name}
                                </h3>
                                <p className="text-blue-600 font-space-grotesk text-sm">
                                  {member.position}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <motion.button
                                  onClick={() => handleEditMember(member)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 glass border border-gray-200 rounded-lg text-gray-900 hover:border-blue-500/50 transition-all"
                                >
                                  <Edit className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  onClick={() => handleDeleteMember(member.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 glass border border-gray-200 rounded-lg text-red-600 hover:border-red-500/50 transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'applications' && (
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold gradient-text mb-6">
                      Job Applications
                    </h2>
                    <div className="space-y-4">
                      {applications.length === 0 ? (
                        <div className="text-center py-12">
                          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-600 font-space-grotesk">No applications yet.</p>
                        </div>
                      ) : (
                        applications.map((app: any) => (
                          <div
                            key={app.id}
                            className="glass p-6 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-all"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-orbitron font-bold text-gray-900 mb-2">
                                  {app.first_name} {app.last_name}
                                </h3>
                                <p className="text-blue-600 font-space-grotesk mb-3">
                                  Applied for: {app.job_title}
                                </p>
                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center gap-2 text-gray-600 font-space-grotesk text-sm">
                                    <Mail className="w-4 h-4" />
                                    {app.email}
                                  </div>
                                  {app.phone && (
                                    <div className="flex items-center gap-2 text-gray-600 font-space-grotesk text-sm">
                                      <Phone className="w-4 h-4" />
                                      {app.phone}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 text-gray-600 font-space-grotesk text-sm">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(app.applied_date).toLocaleDateString()}
                                  </div>
                                </div>
                                {app.cover_letter && (
                                  <div className="mb-4">
                                    <p className="text-gray-900 font-space-grotesk font-semibold mb-2">Cover Letter:</p>
                                    <p className="text-gray-600 font-space-grotesk text-sm line-clamp-3">
                                      {app.cover_letter}
                                    </p>
                                  </div>
                                )}
                                <span
                                  className={`inline-block px-3 py-1 rounded-lg text-xs font-space-grotesk font-semibold border ${
                                    app.status === 'accepted'
                                      ? 'bg-green-500/10 text-green-600 border-green-500/30'
                                      : app.status === 'rejected'
                                      ? 'bg-red-500/10 text-red-600 border-red-500/30'
                                      : app.status === 'shortlisted'
                                      ? 'bg-blue-500/10 text-blue-600 border-blue-500/30'
                                      : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30'
                                  }`}
                                >
                                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                </span>
                              </div>
                              <div className="flex flex-col gap-2 ml-4">
                                {app.resume_url && (
                                  <motion.a
                                    href={app.resume_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 glass border border-gray-200 rounded-lg text-gray-900 hover:border-blue-500/50 transition-all"
                                    title="Download Resume"
                                  >
                                    <Download className="w-4 h-4" />
                                  </motion.a>
                                )}
                                <motion.button
                                  onClick={() => handleEditApplication(app)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 glass border border-gray-200 rounded-lg text-gray-900 hover:border-blue-500/50 transition-all"
                                  title="Edit Application"
                                >
                                  <Edit className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'users' && (
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold gradient-text mb-6">
                      User Management
                    </h2>
                    <div className="space-y-4">
                      {users.length === 0 ? (
                        <div className="text-center py-12">
                          <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-600 font-space-grotesk">No users found.</p>
                        </div>
                      ) : (
                        users.map((user: any) => (
                          <div
                            key={user.id}
                            className="glass p-6 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-all"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="text-xl font-orbitron font-bold text-gray-900 mb-2">
                                  {user.first_name && user.last_name
                                    ? `${user.first_name} ${user.last_name}`
                                    : user.username}
                                </h3>
                                <p className="text-blue-600 font-space-grotesk mb-2">
                                  @{user.username}
                                </p>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-gray-600 font-space-grotesk text-sm">
                                    <Mail className="w-4 h-4" />
                                    {user.email}
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-600 font-space-grotesk text-sm">
                                    <Calendar className="w-4 h-4" />
                                    Joined: {new Date(user.date_joined).toLocaleDateString()}
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                    {user.is_staff && (
                                      <span className="px-2 py-1 rounded text-xs font-space-grotesk font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/30">
                                        Staff
                                      </span>
                                    )}
                                    {user.is_superuser && (
                                      <span className="px-2 py-1 rounded text-xs font-space-grotesk font-semibold bg-purple-500/10 text-purple-600 border border-purple-500/30">
                                        Admin
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <motion.button
                                  onClick={() => handleEditUser(user)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 glass border border-gray-200 rounded-lg text-gray-900 hover:border-blue-500/50 transition-all"
                                  title="Edit User"
                                >
                                  <Edit className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'company' && (
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold gradient-text mb-6">
                      Company Information
                    </h2>
                    {company && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                            Company Name
                          </label>
                          <input
                            id="company-name"
                            type="text"
                            defaultValue={company.name}
                            className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 font-space-grotesk focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                              Email
                            </label>
                            <input
                              id="company-email"
                              type="email"
                              defaultValue={company.email}
                              className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 font-space-grotesk focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                              Phone
                            </label>
                            <input
                              id="company-phone"
                              type="tel"
                              defaultValue={company.phone}
                              className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 font-space-grotesk focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                            Address
                          </label>
                          <textarea
                            id="company-address"
                            defaultValue={company.address}
                            rows={3}
                            className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 font-space-grotesk resize-none focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                            About
                          </label>
                          <textarea
                            id="company-about"
                            defaultValue={company.about}
                            rows={5}
                            className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 font-space-grotesk resize-none focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                            Mission
                          </label>
                          <textarea
                            id="company-mission"
                            defaultValue={company.mission || ''}
                            rows={3}
                            className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 font-space-grotesk resize-none focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-900 font-space-grotesk font-semibold mb-2">
                            Vision
                          </label>
                          <textarea
                            id="company-vision"
                            defaultValue={company.vision || ''}
                            rows={3}
                            className="w-full px-4 py-3 glass border border-gray-200 rounded-xl text-gray-900 font-space-grotesk resize-none focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <motion.button
                          onClick={handleCompanySave}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative px-6 py-3 rounded-xl font-space-grotesk font-semibold flex items-center gap-2 overflow-hidden group"
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
                          <Save className="w-5 h-5 relative z-10 text-white" />
                          <span className="relative z-10 text-white">Save Changes</span>
                        </motion.button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <JobModal
        isOpen={jobModalOpen}
        onClose={() => {
          setJobModalOpen(false)
          setSelectedJob(null)
        }}
        job={selectedJob}
        onSuccess={fetchData}
      />

      <TeamModal
        isOpen={teamModalOpen}
        onClose={() => {
          setTeamModalOpen(false)
          setSelectedMember(null)
        }}
        member={selectedMember}
        onSuccess={fetchData}
      />

      <UserModal
        isOpen={userModalOpen}
        onClose={() => {
          setUserModalOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        onSuccess={fetchData}
      />

      <ApplicationModal
        isOpen={applicationModalOpen}
        onClose={() => {
          setApplicationModalOpen(false)
          setSelectedApplication(null)
        }}
        application={selectedApplication}
        onSuccess={fetchData}
      />
    </>
  )
}
