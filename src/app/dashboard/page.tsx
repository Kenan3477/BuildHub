'use client';

import React, { useState } from 'react';
import { ArrowLeft, Plus, MapPin, Clock, DollarSign, Building, CheckCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobsContext';

export default function UserDashboard() {
  const { isAuthenticated, user, loading, logout: authLogout } = useAuth();
  const { getJobsByUser } = useJobs();
  const [activeTab, setActiveTab] = useState('my-jobs');
  
  // Get user's jobs from context
  const userJobs = user ? getJobsByUser(user.id?.toString() || '') : [];

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏗️</div>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>Loading...</div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login?redirect=/dashboard';
    }
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.5rem 1rem', 
              backgroundColor: '#f3f4f6', 
              border: '1px solid #d1d5db', 
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#374151'
            }}>
              <ArrowLeft style={{ height: '1rem', width: '1rem' }} />
              Back to BuildHub
            </Link>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                My Dashboard
              </h1>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                Welcome back, {user.firstName}!
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#f59e0b',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}>
                  {user.firstName} {user.lastName}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {user.userType === 'customer' ? 'Customer' : 'Contractor'}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                authLogout();
                if (typeof window !== 'undefined') {
                  window.location.href = '/';
                }
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <button
              onClick={() => setActiveTab('my-jobs')}
              style={{
                padding: '1rem 0',
                backgroundColor: 'transparent',
                color: activeTab === 'my-jobs' ? '#f59e0b' : '#6b7280',
                border: 'none',
                borderBottom: activeTab === 'my-jobs' ? '2px solid #f59e0b' : '2px solid transparent',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              My Jobs ({userJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                padding: '1rem 0',
                backgroundColor: 'transparent',
                color: activeTab === 'profile' ? '#f59e0b' : '#6b7280',
                border: 'none',
                borderBottom: activeTab === 'profile' ? '2px solid #f59e0b' : '2px solid transparent',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Profile Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        {activeTab === 'my-jobs' && (
          <div>
            {/* Header with Statistics */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                    My Projects 🏗️
                  </h2>
                  <p style={{ fontSize: '1rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
                    Manage your construction projects and connect with contractors
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link href="/post-job" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}>
                    <Plus style={{ height: '1.25rem', width: '1.25rem' }} />
                    Post New Project
                  </Link>
                  
                  <Link href="/projects" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}>
                    <MapPin style={{ height: '1.25rem', width: '1.25rem' }} />
                    View Jobs Map
                  </Link>
                </div>
              </div>

              {/* Project Statistics Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  border: '1px solid #f3f4f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.5rem 0', fontWeight: '500' }}>
                        Total Projects
                      </p>
                      <p style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                        {userJobs.length}
                      </p>
                    </div>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: '#fef3c7',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Building style={{ height: '1.5rem', width: '1.5rem', color: '#f59e0b' }} />
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  border: '1px solid #f3f4f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.5rem 0', fontWeight: '500' }}>
                        Active Projects
                      </p>
                      <p style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                        {userJobs.filter(job => job.status === 'matched' || job.status === 'contractor-selected').length}
                      </p>
                    </div>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: '#dcfce7',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CheckCircle style={{ height: '1.5rem', width: '1.5rem', color: '#16a34a' }} />
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  border: '1px solid #f3f4f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.5rem 0', fontWeight: '500' }}>
                        Total Budget
                      </p>
                      <p style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                        £{userJobs.reduce((sum, job) => sum + job.budget, 0).toLocaleString()}
                      </p>
                    </div>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: '#dbeafe',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <DollarSign style={{ height: '1.5rem', width: '1.5rem', color: '#2563eb' }} />
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  border: '1px solid #f3f4f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.5rem 0', fontWeight: '500' }}>
                        Projects on Map
                      </p>
                      <p style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                        {userJobs.filter(job => job.lat && job.lng).length}
                      </p>
                    </div>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: '#f3e8ff',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <MapPin style={{ height: '1.5rem', width: '1.5rem', color: '#9333ea' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Jobs List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {userJobs.length === 0 ? (
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  border: '1px solid #f3f4f6'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏗️</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
                    No projects yet
                  </h3>
                  <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '2rem' }}>
                    Start by posting your first construction project to connect with qualified professionals.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link href="/post-job" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}>
                      <Plus style={{ height: '1.25rem', width: '1.25rem' }} />
                      Post Your First Project
                    </Link>
                    
                    <Link href="/projects" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#10b981',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}>
                      <MapPin style={{ height: '1.25rem', width: '1.25rem' }} />
                      Browse Jobs Map
                    </Link>
                  </div>
                </div>
              ) : (
                userJobs.map(job => (
                  <div key={job.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                    border: '1px solid #f3f4f6',
                    overflow: 'hidden'
                  }}>
                    {/* Job Card Content */}
                    <div style={{ 
                      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                      padding: '2rem',
                      borderBottom: '1px solid #e2e8f0'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                              {job.title}
                            </h3>
                            <div style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: 
                                job.status === 'matched' ? '#10b981' : 
                                job.status === 'contractor-selected' ? '#3b82f6' : 
                                job.status === 'pending' ? '#f59e0b' : '#6b7280',
                              color: 'white',
                              borderRadius: '25px',
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              {job.status === 'matched' && <CheckCircle style={{ height: '1rem', width: '1rem' }} />}
                              {job.status === 'pending' && <Clock style={{ height: '1rem', width: '1rem' }} />}
                              {job.status === 'matched' ? '✅ Live on Map' : 
                               job.status === 'pending' ? '🗺️ Live on Map' : 'Posted'}
                            </div>
                            
                            {/* Map indicator */}
                            {job.lat && job.lng && (
                              <div style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#dcfce7',
                                color: '#166534',
                                borderRadius: '25px',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}>
                                <MapPin style={{ height: '1rem', width: '1rem' }} />
                                Visible on Map
                              </div>
                            )}
                          </div>
                          
                          <p style={{ 
                            fontSize: '0.95rem', 
                            color: '#4b5563', 
                            lineHeight: '1.6', 
                            backgroundColor: '#f9fafb',
                            padding: '1rem',
                            borderRadius: '8px',
                            margin: '0 0 1rem 0',
                            border: '1px solid #f3f4f6'
                          }}>
                            {job.description}
                          </p>
                          
                          {/* Project Meta Information */}
                          <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                            gap: '1rem'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div style={{
                                width: '2rem',
                                height: '2rem',
                                backgroundColor: '#dbeafe',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <MapPin style={{ height: '1rem', width: '1rem', color: '#2563eb' }} />
                              </div>
                              <div>
                                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0, fontWeight: '500' }}>Location</p>
                                <p style={{ fontSize: '0.9rem', color: '#111827', margin: 0, fontWeight: '600' }}>{job.location}, {job.postcode}</p>
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div style={{
                                width: '2rem',
                                height: '2rem',
                                backgroundColor: '#dcfce7',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <DollarSign style={{ height: '1rem', width: '1rem', color: '#16a34a' }} />
                              </div>
                              <div>
                                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0, fontWeight: '500' }}>Budget</p>
                                <p style={{ fontSize: '0.9rem', color: '#111827', margin: 0, fontWeight: '600' }}>£{job.budget.toLocaleString()}</p>
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div style={{
                                width: '2rem',
                                height: '2rem',
                                backgroundColor: '#fef3c7',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <Clock style={{ height: '1rem', width: '1rem', color: '#d97706' }} />
                              </div>
                              <div>
                                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0, fontWeight: '500' }}>Timeline</p>
                                <p style={{ fontSize: '0.9rem', color: '#111827', margin: 0, fontWeight: '600' }}>{job.urgency}</p>
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div style={{
                                width: '2rem',
                                height: '2rem',
                                backgroundColor: '#f3e8ff',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <Calendar style={{ height: '1rem', width: '1rem', color: '#9333ea' }} />
                              </div>
                              <div>
                                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0, fontWeight: '500' }}>Posted</p>
                                <p style={{ fontSize: '0.9rem', color: '#111827', margin: 0, fontWeight: '600' }}>
                                  {new Date(job.postedDate).toLocaleDateString('en-UK', { 
                                    day: 'numeric', 
                                    month: 'short', 
                                    year: 'numeric' 
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Actions */}
                    <div style={{ padding: '2rem' }}>
                      <div style={{ 
                        padding: '1.5rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0 0 0.25rem 0', fontWeight: '500' }}>
                            🆔 Project ID: #{job.id}
                          </p>
                          <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
                            {job.lat && job.lng ? 
                              `🗺️ Visible to contractors on the jobs map` : 
                              '📍 Location coordinates being processed...'
                            }
                          </p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <Link href="/projects" style={{
                            padding: '0.75rem 1.25rem',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none'
                          }}>
                            <MapPin style={{ height: '1rem', width: '1rem' }} />
                            View on Map
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
              👤 Profile Settings
            </h2>
            
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      value={user?.firstName || ''}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={user?.lastName || ''}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb'
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={user?.phone || ''}
                    readOnly
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Account Type
                  </label>
                  <div style={{
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                    fontSize: '0.9rem',
                    color: '#374151'
                  }}>
                    {user?.userType === 'customer' ? '🏠 Customer' : '🔨 Contractor'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}