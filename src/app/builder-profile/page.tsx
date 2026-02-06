'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { 
  MapPin, 
  Star,
  PoundSterling,
  Clock,
  CheckCircle,
  Users,
  MessageSquare,
  Edit,
  Camera,
  Award,
  Briefcase,
  Phone,
  Mail,
  Shield,
  TrendingUp,
  Building
} from "lucide-react"

export default function BuilderProfilePage() {
  const { isAuthenticated, user } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews' | 'settings'>('overview')

  // Redirect homeowners to their jobs page
  useEffect(() => {
    if (isAuthenticated && user?.userType === 'customer') {
      window.location.href = '/my-jobs'
    }
  }, [isAuthenticated, user])

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
            🔨 Contractor Access Required
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Please sign in as a contractor to view your builder profile.
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

  if (user?.userType !== 'contractor') {
    return null
  }

  // Mock profile data (in real app, fetch from API)
  const profileData = {
    name: `${user.firstName} ${user.lastName}`,
    company: "Expert Builders Ltd",
    specialties: ["Kitchen Renovation", "Bathroom Renovation", "Extensions"],
    location: "London & Surrounding Areas",
    rating: 4.8,
    reviewCount: 127,
    projectsCompleted: 89,
    responseTime: "2 hours",
    memberSince: "2023",
    verified: true,
    profilePicture: null,
    bio: "Experienced builder with over 15 years in the construction industry. Specializing in high-quality kitchen and bathroom renovations with a focus on modern design and excellent craftsmanship.",
    certifications: ["Gas Safe Registered", "NICEIC Approved", "FMB Member"],
    recentProjects: [
      { title: "Modern Kitchen Extension", location: "Kensington", budget: "£35k", image: null, rating: 5 },
      { title: "Luxury Bathroom Suite", location: "Chelsea", budget: "£18k", image: null, rating: 5 },
      { title: "Loft Conversion", location: "Wimbledon", budget: "£25k", image: null, rating: 4 }
    ],
    stats: {
      totalEarnings: "£245k",
      activeJobs: 3,
      pendingQuotes: 8,
      thisMonthEarnings: "£18.5k"
    }
  }

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
              {/* Contractor Navigation */}
              <a href="/marketplace" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Marketplace</a>
              <a href="/builder-profile" style={{ fontSize: '0.9rem', color: '#f59e0b', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s', borderBottom: '2px solid #f59e0b', paddingBottom: '0.25rem' }}>My Builder Profile</a>
              
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

      {/* Profile Header */}
      <div style={{ backgroundColor: 'white', padding: '2rem 0', borderBottom: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {/* Profile Picture */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                fontWeight: '700',
                color: 'white',
                boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
              }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <button style={{
                position: 'absolute',
                bottom: '5px',
                right: '5px',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                backgroundColor: '#111827',
                border: '3px solid white',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Camera style={{ height: '1rem', width: '1rem' }} />
              </button>
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                  {profileData.name}
                </h1>
                {profileData.verified && (
                  <div style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Shield style={{ height: '1rem', width: '1rem' }} />
                    Verified
                  </div>
                )}
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#f59e0b', marginBottom: '0.5rem' }}>
                {profileData.company}
              </h2>
              <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '1rem' }}>
                {profileData.bio}
              </p>
              
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star style={{ height: '1.2rem', width: '1.2rem', color: '#fbbf24', fill: '#fbbf24' }} />
                  <span style={{ fontWeight: '600', color: '#111827' }}>{profileData.rating}</span>
                  <span style={{ color: '#6b7280' }}>({profileData.reviewCount} reviews)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle style={{ height: '1.2rem', width: '1.2rem', color: '#10b981' }} />
                  <span style={{ fontWeight: '600', color: '#111827' }}>{profileData.projectsCompleted}</span>
                  <span style={{ color: '#6b7280' }}>projects completed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock style={{ height: '1.2rem', width: '1.2rem', color: '#f59e0b' }} />
                  <span style={{ color: '#6b7280' }}>Responds in {profileData.responseTime}</span>
                </div>
              </div>
            </div>
            
            <button style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}>
              <Edit style={{ height: '1.2rem', width: '1.2rem' }} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { label: "This Month Earnings", value: profileData.stats.thisMonthEarnings, icon: TrendingUp, color: '#10b981' },
            { label: "Total Earnings", value: profileData.stats.totalEarnings, icon: PoundSterling, color: '#f59e0b' },
            { label: "Active Jobs", value: profileData.stats.activeJobs, icon: Briefcase, color: '#3b82f6' },
            { label: "Pending Quotes", value: profileData.stats.pendingQuotes, icon: MessageSquare, color: '#8b5cf6' }
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '12px',
                backgroundColor: `${stat.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <stat.icon style={{ height: '1.5rem', width: '1.5rem', color: stat.color }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            {[
              { key: 'overview', label: 'Overview', icon: Users },
              { key: 'portfolio', label: 'Portfolio', icon: Camera },
              { key: 'reviews', label: 'Reviews', icon: Star },
              { key: 'settings', label: 'Settings', icon: Edit }
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
                <tab.icon style={{ height: '1rem', width: '1rem' }} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          {activeTab === 'overview' && (
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>
                Professional Overview
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                    Specialties
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                    {profileData.specialties.map(specialty => (
                      <span key={specialty} style={{
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                    Certifications
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {profileData.certifications.map(cert => (
                      <div key={cert} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        backgroundColor: '#f0fdf4',
                        borderRadius: '8px',
                        border: '1px solid #10b981'
                      }}>
                        <Shield style={{ height: '1.2rem', width: '1.2rem', color: '#10b981' }} />
                        <span style={{ fontWeight: '600', color: '#111827' }}>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                    Contact Information
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <MapPin style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                      <span>{profileData.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Phone style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                      <span>+44 7700 900123</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Mail style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                      <span>{user.email}</span>
                    </div>
                  </div>
                  
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                    Membership
                  </h4>
                  <div style={{
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Award style={{ height: '1.2rem', width: '1.2rem', color: '#0ea5e9' }} />
                      <span style={{ fontWeight: '600', color: '#111827' }}>Professional Member</span>
                    </div>
                    <span style={{ color: '#0369a1', fontSize: '0.9rem' }}>
                      Member since {profileData.memberSince}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'portfolio' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                  Recent Projects
                </h3>
                <button style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Camera style={{ height: '1rem', width: '1rem' }} />
                  Add Photos
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {profileData.recentProjects.map((project, index) => (
                  <div key={index} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}>
                    <div style={{
                      height: '200px',
                      backgroundColor: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6b7280',
                      fontSize: '3rem'
                    }}>
                      🏗️
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                        {project.title}
                      </h4>
                      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                        📍 {project.location} • {project.budget}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {Array.from({ length: project.rating }).map((_, i) => (
                          <Star key={i} style={{ height: '1rem', width: '1rem', color: '#fbbf24', fill: '#fbbf24' }} />
                        ))}
                        <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Client Rating</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>
                Customer Reviews ({profileData.reviewCount})
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Mock reviews */}
                {[
                  { name: "Sarah M.", rating: 5, text: "Exceptional work on our kitchen renovation. Professional, clean, and finished ahead of schedule!", date: "2 weeks ago", project: "Kitchen Renovation" },
                  { name: "James L.", rating: 5, text: "Highly recommend! Great communication throughout the project and excellent attention to detail.", date: "1 month ago", project: "Bathroom Extension" },
                  { name: "Emma W.", rating: 4, text: "Very pleased with the loft conversion. Good quality work and fair pricing.", date: "2 months ago", project: "Loft Conversion" }
                ].map((review, index) => (
                  <div key={index} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: '600' }}>{review.name}</span>
                          <span style={{
                            backgroundColor: '#f59e0b',
                            color: 'white',
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px'
                          }}>
                            {review.project}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} style={{ height: '1rem', width: '1rem', color: '#fbbf24', fill: '#fbbf24' }} />
                          ))}
                        </div>
                      </div>
                      <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{review.date}</span>
                    </div>
                    <p style={{ color: '#374151', lineHeight: '1.6' }}>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>
                Profile Settings
              </h3>
              <div style={{ display: 'grid', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Availability
                  </h4>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Available for New Projects
                    </button>
                    <button style={{
                      backgroundColor: '#6b7280',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Temporarily Unavailable
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Notification Preferences
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      "New job notifications",
                      "Message notifications",
                      "Review notifications",
                      "Payment notifications"
                    ].map(pref => (
                      <label key={pref} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                        <span>{pref}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}