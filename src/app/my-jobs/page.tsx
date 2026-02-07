'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useJobs, type Job } from '../../context/JobsContext'
import { 
  MapPin, 
  Calendar,
  PoundSterling,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  MessageSquare,
  Edit,
  Plus,
  Building,
  Trash2
} from "lucide-react"

export default function MyJobsPage() {
  const { isAuthenticated, user } = useAuth()
  const { getAllJobs } = useJobs()
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'draft'>('active')
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null)

  // Handle delete job
  const handleDeleteJob = async (jobId: string, jobTitle: string) => {
    if (confirm(`Are you sure you want to delete "${jobTitle}"? This action cannot be undone.`)) {
      setDeletingJobId(jobId)
      // In a real app, make API call to delete job
      // For now, just simulate deletion
      setTimeout(() => {
        setDeletingJobId(null)
        alert('Job deleted successfully!')
        // Here you would normally reload the jobs or remove from state
        window.location.reload()
      }, 1000)
    }
  }

  // Handle view proposals
  const handleViewProposals = (jobId: string) => {
    window.location.href = `/project/${jobId}/quotes`
  }

  // Handle post project click
  const handlePostProject = () => {
    if (!isAuthenticated || !user?.verified) {
      window.location.href = '/auth/login?redirect=' + encodeURIComponent('/post-job');
    } else {
      window.location.href = '/post-job';
    }
  };

  // Redirect contractors to marketplace
  useEffect(() => {
    if (isAuthenticated && user?.userType === 'contractor') {
      window.location.href = '/marketplace'
    }
  }, [isAuthenticated, user])

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
            🏠 Access Required
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Please sign in to view your jobs.
          </p>
          <a href="/auth/login" style={{ 
            backgroundColor: '#f59e0b', 
            color: 'white', 
            padding: '1rem 2rem', 
            borderRadius: '8px', 
            textDecoration: 'none',
            fontWeight: '600' 
          }}>
            Sign In
          </a>
        </div>
      </div>
    )
  }

  if (user?.userType !== 'customer') {
    return null
  }

  // Mock job data for the user (in real app, fetch from API)
  const userJobs = [
    {
      id: '1',
      title: 'Kitchen Renovation',
      description: 'Complete kitchen renovation including new cabinets, countertops, and appliances',
      location: 'Kensington, London',
      budget: 25000,
      status: 'active',
      datePosted: '2026-01-20',
      proposals: 8,
      deadline: '2026-02-15'
    },
    {
      id: '2', 
      title: 'Bathroom Extension',
      description: 'Add ensuite bathroom to master bedroom',
      location: 'Camden, London',
      budget: 15000,
      status: 'completed',
      datePosted: '2025-12-10',
      proposals: 12,
      completedDate: '2026-01-10'
    },
    {
      id: '3',
      title: 'Garden Landscaping',
      description: 'Complete garden redesign with patio and planted areas',
      location: 'Wimbledon, London',
      budget: 8000,
      status: 'draft',
      datePosted: null,
      proposals: 0
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return '#f59e0b'
      case 'completed': return '#10b981' 
      case 'draft': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <Clock style={{ height: '1rem', width: '1rem' }} />
      case 'completed': return <CheckCircle style={{ height: '1rem', width: '1rem' }} />
      case 'draft': return <Edit style={{ height: '1rem', width: '1rem' }} />
      default: return null
    }
  }

  const filteredJobs = userJobs.filter(job => job.status === activeTab)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Main Header Navigation */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                <div style={{ 
                  width: '3rem', 
                  height: '3rem', 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Building style={{ height: '1.5rem', width: '1.5rem', color: 'white' }} />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
                    BuildHub
                    <span style={{ 
                      backgroundColor: '#10b981', 
                      color: 'white', 
                      fontSize: '0.6rem', 
                      padding: '0.125rem 0.375rem', 
                      borderRadius: '4px', 
                      marginLeft: '0.5rem',
                      fontWeight: '700'
                    }}>
                      LIVE
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>
                    Where Building Dreams Come True • UK's Leading Platform
                  </div>
                </div>
              </a>
            </div>
            
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
              {/* Homeowner Navigation */}
              <a href="/professionals" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Find Professionals</a>
              <button onClick={handlePostProject} style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}>Post a Job</button>
              <a href="/my-jobs" style={{ fontSize: '0.9rem', color: '#f59e0b', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s', borderBottom: '2px solid #f59e0b', paddingBottom: '0.25rem' }}>My Jobs</a>
              
              {/* User Account */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <a href="/dashboard" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Dashboard</a>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)', 
                  color: 'white', 
                  fontSize: '0.9rem', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '6px', 
                  fontWeight: '600'
                }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: '700'
                  }}>
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  <span>Welcome, {user?.firstName}!</span>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to sign out?')) {
                        window.location.href = '/auth/login';
                      }
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Content Header */}
      <div style={{ backgroundColor: 'white', padding: '1.5rem 0', borderBottom: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                My Projects
              </h1>
              <p style={{ color: '#6b7280' }}>
                Manage your construction projects and track progress
              </p>
            </div>
            <a href="/post-job" style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
              transition: 'all 0.2s'
            }}>
              <Plus style={{ height: '1.2rem', width: '1.2rem' }} />
              Post New Job
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        {/* Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            {[
              { key: 'active', label: 'Active Projects', count: userJobs.filter(j => j.status === 'active').length },
              { key: 'completed', label: 'Completed', count: userJobs.filter(j => j.status === 'completed').length },
              { key: 'draft', label: 'Drafts', count: userJobs.filter(j => j.status === 'draft').length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                style={{
                  padding: '1rem 1.5rem',
                  borderBottom: activeTab === tab.key ? '3px solid #f59e0b' : '3px solid transparent',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: activeTab === tab.key ? '600' : '500',
                  color: activeTab === tab.key ? '#f59e0b' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {tab.label}
                <span style={{
                  backgroundColor: activeTab === tab.key ? '#f59e0b' : '#e5e7eb',
                  color: activeTab === tab.key ? 'white' : '#6b7280',
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                const target = e.currentTarget as HTMLDivElement
                target.style.transform = 'translateY(-2px)'
                target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'
              }}
              onMouseOut={(e) => {
                const target = e.currentTarget as HTMLDivElement
                target.style.transform = 'translateY(0)'
                target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                        {job.title}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: `${getStatusColor(job.status)}20`,
                        color: getStatusColor(job.status),
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>
                        {getStatusIcon(job.status)}
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </div>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                      {job.description}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                    <span style={{ color: '#6b7280' }}>{job.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PoundSterling style={{ height: '1.2rem', width: '1.2rem', color: '#10b981' }} />
                    <span style={{ color: '#10b981', fontWeight: '600' }}>£{job.budget.toLocaleString()}</span>
                  </div>
                  {job.datePosted && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                      <span style={{ color: '#6b7280' }}>Posted {new Date(job.datePosted).toLocaleDateString()}</span>
                    </div>
                  )}
                  {job.status === 'active' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users style={{ height: '1.2rem', width: '1.2rem', color: '#f59e0b' }} />
                      <span style={{ color: '#f59e0b', fontWeight: '600' }}>{job.proposals} Proposals</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {job.status === 'draft' ? (
                      <>
                        <button style={{
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Edit style={{ height: '1rem', width: '1rem' }} />
                          Continue Editing
                        </button>
                        <button style={{
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}>
                          Publish Job
                        </button>
                      </>
                    ) : job.status === 'active' ? (
                      <>
                        <button 
                          onClick={() => handleViewProposals(job.id)}
                          style={{
                            backgroundColor: '#f59e0b',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <MessageSquare style={{ height: '1rem', width: '1rem' }} />
                          View Proposals ({job.proposals})
                        </button>
                        <button style={{
                          border: '1px solid #e5e7eb',
                          backgroundColor: 'white',
                          color: '#374151',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}>
                          Edit Job
                        </button>
                      </>
                    ) : (
                      <button style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <CheckCircle style={{ height: '1rem', width: '1rem' }} />
                        View Details
                      </button>
                    )}
                  </div>
                  
                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDeleteJob(job.id, job.title)}
                    disabled={deletingJobId === job.id}
                    style={{
                      backgroundColor: deletingJobId === job.id ? '#9ca3af' : '#dc2626',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: deletingJobId === job.id ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <Trash2 style={{ height: '1rem', width: '1rem' }} />
                    {deletingJobId === job.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '4rem 2rem',
              textAlign: 'center',
              border: '2px dashed #e5e7eb'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                {activeTab === 'active' ? '🏗️' : activeTab === 'completed' ? '✅' : '✏️'}
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
                No {activeTab} projects
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                {activeTab === 'active' && "You don't have any active projects yet."}
                {activeTab === 'completed' && "No completed projects to show."}
                {activeTab === 'draft' && "No draft projects saved."}
              </p>
              {activeTab !== 'completed' && (
                <a href="/post-job" style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Plus style={{ height: '1.2rem', width: '1.2rem' }} />
                  Post Your First Job
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}