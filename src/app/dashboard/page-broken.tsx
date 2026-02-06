'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, MapPin, Clock, DollarSign, Users, Star, Phone, Mail, CheckCircle, AlertCircle, Calendar, Filter, Building, X } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

// Mock user data
const mockUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '+44 7700 123456',
  verified: true,
  userType: 'customer'
};

// Mock nearby contractors (same data as professionals page)
const nearbyContractors = [
  {
    id: 1,
    name: "James Mitchell",
    company: "Mitchell Construction Ltd",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    specialties: ["Kitchen Renovation", "Bathroom Refit", "Extensions"],
    location: "London",
    distance: 2.3,
    rating: 4.9,
    reviewCount: 127,
    pricePerDay: 350,
    responseTime: "< 2 hours",
    phone: "07700 123456",
    email: "james@mitchellconstruction.co.uk",
    matchScore: 95
  },
  {
    id: 2,
    name: "Sarah Thompson", 
    company: "Thompson Electrical Services",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b8b3?w=150&h=150&fit=crop&crop=face",
    specialties: ["Electrical Installation", "Rewiring", "Smart Home"],
    location: "London",
    distance: 4.7,
    rating: 4.8,
    reviewCount: 89,
    pricePerDay: 280,
    responseTime: "< 1 hour",
    phone: "07700 234567",
    email: "sarah@thompsonelectrical.co.uk",
    matchScore: 88
  },
  {
    id: 3,
    name: "Robert Chen",
    company: "Chen Plumbing & Heating", 
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialties: ["Plumbing", "Central Heating", "Boiler Installation"],
    location: "London",
    distance: 6.1,
    rating: 4.9,
    reviewCount: 203,
    pricePerDay: 320,
    responseTime: "< 30 min",
    phone: "07700 345678",
    email: "robert@chenplumbing.co.uk",
    matchScore: 92
  }
];

export default function UserDashboard() {
  const { isAuthenticated, user, loading, logout: authLogout } = useAuth();
  const [activeTab, setActiveTab] = useState('my-jobs');
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  
  // Move all useState hooks to the top before any conditional returns
  const [jobs, setJobs] = useState<Array<{
    id: number;
    title: string;
    description: string;
    projectType: string;
    location: string;
    postcode: string;
    budget: number;
    urgency: string;
    status: string;
    postedDate: string;
    matches: typeof nearbyContractors;
    selectedContractor: typeof nearbyContractors[0] | null;
  }>>([
    {
      id: 1,
      title: "Kitchen Renovation",
      description: "Complete kitchen renovation including new cabinets, countertops, and appliances. Modern design with island.",
      projectType: "Kitchen Renovation",
      location: "Manchester",
      postcode: "M1 5GD",
      budget: 15000,
      urgency: "Within 2 weeks",
      status: "matched",
      postedDate: "2024-01-10",
      matches: nearbyContractors,
      selectedContractor: null
    },
    {
      id: 2,
      title: "Emergency Roof Repair",
      description: "Urgent roof leak repair needed. Water damage in bedroom ceiling.",
      projectType: "Roofing",
      location: "Manchester", 
      postcode: "M1 5GD",
      budget: 2500,
      urgency: "ASAP",
      status: "pending",
      postedDate: "2024-01-12",
      matches: [],
      selectedContractor: null
    }
  ]);
  
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    projectType: '',
    location: '',
    postcode: '',
    budget: '',
    urgency: '',
    photos: []
  });

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏗️</div>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>Loading...</div>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    window.location.href = '/auth/login?redirect=/dashboard';
    return null;
  }

  const handlePostJob = () => {
    const jobData = {
      id: Date.now(),
      ...newJob,
      budget: parseFloat(newJob.budget),
      status: 'pending',
      postedDate: new Date().toISOString().split('T')[0],
      matches: [],
      selectedContractor: null
    };

    setJobs(prev => [jobData, ...prev]);
    setNewJob({
      title: '',
      description: '',
      projectType: '',
      location: '',
      postcode: '',
      budget: '',
      urgency: '',
      photos: []
    });
    setShowNewJobForm(false);

    // Simulate matching process
    setTimeout(() => {
      setJobs(prev => prev.map(job => 
        job.id === jobData.id 
          ? { ...job, status: 'matched', matches: nearbyContractors }
          : job
      ));
    }, 3000);
  };

  const handleSelectContractor = (jobId: number, contractor: typeof nearbyContractors[0]) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, selectedContractor: contractor, status: 'contractor-selected' }
        : job
    ));
  };

  // Component starts here since authentication is already checked above
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
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                Welcome back, {user.firstName}!
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '500', color: '#111827' }}>
                  {user.firstName} {user.lastName}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  {user.userType === 'customer' ? 'Customer' : 'Contractor'}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                authLogout();
                window.location.href = '/';
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
              My Jobs ({jobs.length})
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
            {/* Enhanced Header with Statistics */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                    My Projects
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
                        {jobs.length}
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
                        {jobs.filter(job => job.status === 'matched' || job.status === 'contractor-selected').length}
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
                        £{jobs.reduce((sum, job) => sum + job.budget, 0).toLocaleString()}
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
                        Contractors Found
                      </p>
                      <p style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                        {jobs.reduce((sum, job) => sum + job.matches.length, 0)}
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
                      <Users style={{ height: '1.5rem', width: '1.5rem', color: '#9333ea' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter and Sort Options */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                border: '1px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Filter style={{ height: '1.25rem', width: '1.25rem', color: '#6b7280' }} />
                    <span style={{ fontSize: '1rem', fontWeight: '600', color: '#111827' }}>Filter & Sort</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <select style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      backgroundColor: 'white'
                    }}>
                      <option>All Projects</option>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Completed</option>
                    </select>
                    
                    <select style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      backgroundColor: 'white'
                    }}>
                      <option>Sort by Date</option>
                      <option>Sort by Budget</option>
                      <option>Sort by Status</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Enhanced Jobs List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {jobs.length === 0 ? (
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
                </div>
              ) : (
                jobs.map(job => (
                  <div key={job.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                    border: '1px solid #f3f4f6',
                    overflow: 'hidden'
                  }}>
                    {/* Job content would go here - simplified for now */}
                    <div style={{ padding: '2rem' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
                        {job.title}
                      </h3>
                      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>{job.description}</p>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
                        <span>📍 {job.location}</span>
                        <span>💰 £{job.budget.toLocaleString()}</span>
                        <span>⏰ {job.urgency}</span>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: job.status === 'matched' ? '#dcfce7' : '#fef3c7',
                          color: job.status === 'matched' ? '#166534' : '#92400e',
                          borderRadius: '12px',
                          fontWeight: '600'
                        }}>
                          {job.status === 'matched' ? '✓ Matched' : '⏳ Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
                        <p style={{ fontSize: '0.9rem', fontWeight: '500', color: '#92400e', margin: 0 }}>
                          Finding the best contractors for your project...
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#92400e', margin: '0.25rem 0 0 0' }}>
                          We'll match you with 3 verified professionals within 10km of your location.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {jobs.length === 0 && (
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  padding: '3rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏗️</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: '0 0 0.5rem 0' }}>
                    No projects yet
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                    Post your first project to get matched with qualified contractors in your area.
                  </p>
                  <button
                    onClick={() => setShowNewJobForm(true)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Post Your First Project
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '2rem' }}>
              Profile Settings
            </h2>
            
            <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    value={user.firstName}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={user.lastName}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                  Phone Number
                  <span style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginLeft: '0.5rem'
                  }}>
                    Verified
                  </span>
                </label>
                <input
                  type="tel"
                  value={user.phone}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <button style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Job Modal */}
      {showNewJobForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
        onClick={() => setShowNewJobForm(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem'
          }}
          onClick={(e) => e.stopPropagation()}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                Post New Project
              </h2>
              <button
                onClick={() => setShowNewJobForm(false)}
                style={{
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  fontSize: '1.5rem'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handlePostJob(); }}>
              <div style={{ display: 'grid', gap: '1rem' }}>
                
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={newJob.title}
                    onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Modern Kitchen Renovation"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                    Project Type *
                  </label>
                  <select
                    value={newJob.projectType}
                    onChange={(e) => setNewJob(prev => ({ ...prev, projectType: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                    required
                  >
                    <option value="">Select project type...</option>
                    <option value="Kitchen Renovation">Kitchen Renovation</option>
                    <option value="Bathroom Refit">Bathroom Refit</option>
                    <option value="Home Extension">Home Extension</option>
                    <option value="Roofing">Roofing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Landscaping">Landscaping</option>
                    <option value="General Building">General Building</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                      Location *
                    </label>
                    <input
                      type="text"
                      value={newJob.location}
                      onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City or area"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                      Postcode *
                    </label>
                    <input
                      type="text"
                      value={newJob.postcode}
                      onChange={(e) => setNewJob(prev => ({ ...prev, postcode: e.target.value }))}
                      placeholder="M1 5GD"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                      Budget (£) *
                    </label>
                    <input
                      type="number"
                      value={newJob.budget}
                      onChange={(e) => setNewJob(prev => ({ ...prev, budget: e.target.value }))}
                      placeholder="5000"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                      Urgency *
                    </label>
                    <select
                      value={newJob.urgency}
                      onChange={(e) => setNewJob(prev => ({ ...prev, urgency: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '1rem'
                      }}
                      required
                    >
                      <option value="">Select urgency...</option>
                      <option value="ASAP">ASAP</option>
                      <option value="Within 1 week">Within 1 week</option>
                      <option value="Within 2 weeks">Within 2 weeks</option>
                      <option value="Within 1 month">Within 1 month</option>
                      <option value="Flexible">Flexible timing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                    Project Description *
                  </label>
                  <textarea
                    value={newJob.description}
                    onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your project requirements, style preferences, and any specific needs..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                  <button
                    type="button"
                    onClick={() => setShowNewJobForm(false)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Post Project & Find Contractors
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}