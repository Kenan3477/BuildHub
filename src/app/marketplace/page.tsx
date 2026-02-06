'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useAuth } from '../../context/AuthContext'
import { useJobs, type Job } from '../../context/JobsContext'
import { 
  MapPin, 
  Search, 
  Building, 
  Clock,
  PoundSterling,
  LogOut,
  CheckCircle
} from "lucide-react"

const InteractiveJobsMap = dynamic(() => import('../../components/InteractiveJobsMap'), { 
  ssr: false,
  loading: () => (
    <div style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc'
    }}>
      <div>Loading Map...</div>
    </div>
  )
})

export default function MarketplacePage() {
  const { isAuthenticated, user, logout } = useAuth()
  const { getAllJobs } = useJobs()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const allJobs = getAllJobs()

  const filteredJobs = allJobs.filter(job => {
    return job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           job.location.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const formatBudget = (budget: number): string => {
    if (budget >= 1000) {
      return `£${(budget / 1000).toFixed(0)}k`
    }
    return `£${budget.toLocaleString()}`
  }

  // Redirect homeowners
  useEffect(() => {
    if (isAuthenticated && user?.userType === 'customer') {
      window.location.href = '/my-jobs'
    }
  }, [isAuthenticated, user])

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '3rem', borderRadius: '12px' }}>
          <h2>🔨 Contractor Access Required</h2>
          <p>This marketplace is only for verified contractors.</p>
          <a href="/auth/login" style={{ backgroundColor: '#f59e0b', color: 'white', padding: '1rem', borderRadius: '8px', textDecoration: 'none' }}>
            Sign in as Contractor
          </a>
        </div>
      </div>
    )
  }

  if (user?.userType !== 'contractor') {
    return null
  }

  const transformedJobs = filteredJobs.map(job => ({
    ...job,
    coordinates: { lat: job.lat || 51.5074, lng: job.lng || -0.1278 },
    posted: job.timePosted || 'Recently',
    verified: true,
    type: job.projectType,
    budget: typeof job.budget === 'number' ? formatBudget(job.budget) : job.budget
  }))

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <header style={{ backgroundColor: 'white', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#111827' }}>🔨 BuildHub Marketplace</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Hello, {user?.firstName}</span>
            <button onClick={logout} style={{ padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px' }}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem', padding: '1.5rem' }}>
        
        {/* Map Section */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', minHeight: '600px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h2>🗺️ Live Job Map ({filteredJobs.length} Jobs)</h2>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '300px',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                marginTop: '1rem'
              }}
            />
          </div>
          
          <div style={{ height: '500px' }}>
            <InteractiveJobsMap 
              jobs={transformedJobs}
              onJobSelect={(mapJob) => {
                const originalJob = filteredJobs.find(job => job.id === mapJob.id)
                if (originalJob) setSelectedJob(originalJob)
              }}
              selectedJob={selectedJob ? transformedJobs.find(job => job.id === selectedJob.id) : null}
              height="100%"
            />
          </div>
        </div>

        {/* Job List Section */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem' }}>
          <h3>📋 Available Jobs ({filteredJobs.length})</h3>
          
          <div style={{ maxHeight: '600px', overflowY: 'auto', marginTop: '1rem' }}>
            {filteredJobs.map(job => (
              <div 
                key={job.id}
                onClick={() => setSelectedJob(job)}
                style={{ 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                  backgroundColor: selectedJob?.id === job.id ? '#f0f9ff' : 'white'
                }}
              >
                <h4 style={{ margin: '0 0 0.5rem 0' }}>{job.title}</h4>
                <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>{job.location}</p>
                <p style={{ margin: '0', fontWeight: '600', color: '#059669' }}>
                  {formatBudget(job.budget)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          zIndex: 1000
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>{selectedJob.title}</h3>
            <button onClick={() => setSelectedJob(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem' }}>
              ×
            </button>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Budget:</strong> {formatBudget(selectedJob.budget)}</p>
            <p><strong>Description:</strong> {selectedJob.description}</p>
          </div>
          
          <button style={{
            width: '100%',
            backgroundColor: '#f59e0b',
            color: 'white',
            padding: '1rem',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Apply for This Job
          </button>
        </div>
      )}

      {/* Overlay for modal */}
      {selectedJob && (
        <div 
          onClick={() => setSelectedJob(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
        />
      )}
    </div>
  )
}
