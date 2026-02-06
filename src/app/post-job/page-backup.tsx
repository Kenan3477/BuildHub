'use client'

import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { 
  Building, 
  Shield,
  LogOut,
  User,
  PlusCircle,
  ArrowLeft,
  MapPin,
  PoundSterling,
  Calendar,
  Clock,
  Camera,
  X,
  CheckCircle,
  Star,
  Phone,
  Mail
} from "lucide-react"

// Professional data for matching algorithm
const professionals = [
  {
    id: 1,
    name: "James Mitchell",
    company: "Mitchell Construction Ltd",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    specialties: ["Kitchen Renovation", "Bathroom Refit", "Extensions", "General Construction"],
    skills: ["plumbing", "electrical", "tiling", "carpentry", "project management"],
    location: "London",
    postcode: "SW1A",
    radius: 25,
    experience: 15,
    rating: 4.9,
    reviewCount: 127,
    pricePerDay: 350,
    pricePerHour: 45,
    minBudget: 5000,
    maxBudget: 50000,
    availability: "Available",
    responseTime: "< 2 hours",
    completedJobs: 245,
    phone: "07700 123456",
    email: "james@mitchellconstruction.co.uk"
  },
  {
    id: 2,
    name: "Sarah Thompson",
    company: "Thompson Electrical Services",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b8b3?w=150&h=150&fit=crop&crop=face",
    specialties: ["Electrical Installation", "Rewiring", "Smart Home", "Emergency Repairs"],
    skills: ["electrical", "smart home", "wiring", "lighting", "power systems"],
    location: "Manchester",
    postcode: "M1",
    radius: 30,
    experience: 12,
    rating: 4.8,
    reviewCount: 89,
    pricePerDay: 280,
    pricePerHour: 35,
    minBudget: 1000,
    maxBudget: 25000,
    availability: "Available",
    responseTime: "< 1 hour",
    completedJobs: 156,
    phone: "07700 234567",
    email: "sarah@thompsonelectrical.co.uk"
  },
  {
    id: 3,
    name: "Michael Chen",
    company: "Chen Roofing Solutions",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialties: ["Roofing", "Guttering", "Roof Repairs", "Waterproofing"],
    skills: ["roofing", "guttering", "waterproofing", "tile replacement", "emergency repairs"],
    location: "Birmingham",
    postcode: "B1",
    radius: 20,
    experience: 18,
    rating: 4.9,
    reviewCount: 203,
    pricePerDay: 320,
    pricePerHour: 40,
    minBudget: 2000,
    maxBudget: 30000,
    availability: "Available",
    responseTime: "< 3 hours",
    completedJobs: 298,
    phone: "07700 345678",
    email: "mike@chenroofing.co.uk"
  },
  {
    id: 4,
    name: "Emma Wilson",
    company: "Wilson Interior Design",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    specialties: ["Interior Design", "Kitchen Design", "Bathroom Design", "Home Staging"],
    skills: ["interior design", "space planning", "color consultation", "furniture selection", "renovation"],
    location: "London",
    postcode: "N1",
    radius: 15,
    experience: 10,
    rating: 4.7,
    reviewCount: 76,
    pricePerDay: 250,
    pricePerHour: 30,
    minBudget: 3000,
    maxBudget: 40000,
    availability: "Available",
    responseTime: "< 4 hours",
    completedJobs: 134,
    phone: "07700 456789",
    email: "emma@wilsoninteriors.co.uk"
  },
  {
    id: 5,
    name: "David Brown",
    company: "Brown Plumbing & Heating",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    specialties: ["Plumbing", "Central Heating", "Boiler Installation", "Emergency Repairs"],
    skills: ["plumbing", "heating", "boiler repair", "pipe installation", "emergency repairs"],
    location: "Liverpool",
    postcode: "L1",
    radius: 25,
    experience: 20,
    rating: 4.8,
    reviewCount: 167,
    pricePerDay: 300,
    pricePerHour: 38,
    minBudget: 500,
    maxBudget: 20000,
    availability: "Available",
    responseTime: "< 2 hours",
    completedJobs: 312,
    phone: "07700 567890",
    email: "david@brownplumbing.co.uk"
  }
];

export default function PostJobPage() {
  const { isAuthenticated, user, logout, loading } = useAuth()
  const [step, setStep] = useState(1)
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    category: '',
    skills: [] as string[],
    budget: '',
    budgetType: 'fixed', // fixed, hourly, daily
    timeline: '',
    urgency: '',
    location: '',
    postcode: '',
    photos: [] as string[],
    requirements: ''
  })
  const [matches, setMatches] = useState<(typeof professionals[0] & { matchScore: number })[]>([])
  const [showMatches, setShowMatches] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Matching algorithm
  const calculateMatch = (professional: typeof professionals[0]) => {
    let score = 0;
    
    // Budget compatibility (40% weight)
    const budget = parseFloat(jobData.budget);
    if (budget >= professional.minBudget && budget <= professional.maxBudget) {
      score += 40;
    } else if (budget < professional.minBudget) {
      score += Math.max(0, 20 - ((professional.minBudget - budget) / budget) * 10);
    } else {
      score += Math.max(0, 30 - ((budget - professional.maxBudget) / professional.maxBudget) * 15);
    }
    
    // Skills matching (30% weight)
    const matchedSkills = jobData.skills.filter(skill => 
      professional.skills.some(pSkill => 
        pSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(pSkill.toLowerCase())
      )
    );
    if (jobData.skills.length > 0) {
      score += (matchedSkills.length / jobData.skills.length) * 30;
    }
    
    // Category/Specialty matching (20% weight)
    if (professional.specialties.some(spec => 
      spec.toLowerCase().includes(jobData.category.toLowerCase()) ||
      jobData.category.toLowerCase().includes(spec.toLowerCase())
    )) {
      score += 20;
    }
    
    // Rating bonus (10% weight)
    score += (professional.rating / 5) * 10;
    
    return Math.min(100, Math.round(score));
  };

  const findMatches = () => {
    const scoredProfessionals = professionals.map(prof => ({
      ...prof,
      matchScore: calculateMatch(prof)
    }));
    
    return scoredProfessionals
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate job posting
    setTimeout(() => {
      const matches = findMatches();
      setMatches(matches);
      setShowMatches(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const skillsList = [
    'Electrical', 'Plumbing', 'Carpentry', 'Tiling', 'Painting', 'Roofing', 
    'Plastering', 'Flooring', 'Kitchen Installation', 'Bathroom Installation',
    'Extension Building', 'Loft Conversion', 'Garden Landscaping', 'Brickwork',
    'Insulation', 'Heating', 'Air Conditioning', 'Windows & Doors'
  ];

  const categories = [
    'Kitchen Renovation', 'Bathroom Renovation', 'Extension', 'Loft Conversion',
    'Electrical Work', 'Plumbing', 'Roofing', 'Flooring', 'Painting & Decorating',
    'Garden & Landscaping', 'Windows & Doors', 'Heating & Cooling', 'General Maintenance'
  ];

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
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', padding: '40px', width: '100%', maxWidth: '500px', textAlign: 'center' }}>
          
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#f59e0b',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '32px'
          }}>
            🔐
          </div>
          
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
            Authentication Required
          </h1>
          
          <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
            You need to sign in to post a construction project. Join thousands of property owners who have found qualified professionals through BuildHub.
          </p>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/auth/login?redirect=/post-job" style={{
              background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <User style={{ height: '18px', width: '18px' }} />
              Sign In
            </a>
            
            <a href="/auth/login?redirect=/post-job" style={{
              border: '2px solid #f59e0b',
              color: '#f59e0b',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <PlusCircle style={{ height: '18px', width: '18px' }} />
              Create Account
            </a>
          </div>
          
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
            <a href="/" style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}>
              <ArrowLeft style={{ height: '16px', width: '16px' }} />
              Back to Homepage
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (showMatches) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        {/* Header */}
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
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>BuildHub</div>
                </a>
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
                    fontSize: '14px'
                  }}>
                    👤
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}>
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Member
                    </div>
                  </div>
                </div>
                
                <div style={{ height: '32px', width: '1px', backgroundColor: '#e5e7eb' }}></div>
                
                <a href="/marketplace" style={{ 
                  fontSize: '0.9rem', 
                  color: '#6b7280', 
                  textDecoration: 'none', 
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Building style={{ height: '1rem', width: '1rem' }} />
                  Marketplace
                </a>
                
                <button
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                  style={{
                    background: 'none',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    color: '#6b7280',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontWeight: '500'
                  }}
                >
                  <LogOut style={{ height: '1rem', width: '1rem' }} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Matches Display */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '32px'
            }}>
              ✅
            </div>
            
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
              Job Posted Successfully!
            </h1>
            
            <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
              We've analyzed your requirements and found the top 3 professionals that match your project needs.
            </p>
          </div>

          {/* Job Summary */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', marginBottom: '3rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
              Your Project: {jobData.title}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Budget: </span>
                <span style={{ fontWeight: '600' }}>£{jobData.budget}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Category: </span>
                <span style={{ fontWeight: '600' }}>{jobData.category}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Timeline: </span>
                <span style={{ fontWeight: '600' }}>{jobData.timeline}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Location: </span>
                <span style={{ fontWeight: '600' }}>{jobData.location}</span>
              </div>
            </div>
          </div>

          {/* Top Matches */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>
              🎯 Top 3 Matches for Your Project
            </h2>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {matches.map((professional, index) => (
                <div key={professional.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: index === 0 ? '2px solid #f59e0b' : '1px solid #e5e7eb',
                  position: 'relative'
                }}>
                  {index === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '20px',
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      BEST MATCH
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <img 
                      src={professional.profileImage} 
                      alt={professional.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#111827', margin: '0 0 0.25rem 0' }}>
                            {professional.name}
                          </h3>
                          <p style={{ color: '#6b7280', fontSize: '1rem', margin: '0 0 0.5rem 0' }}>
                            {professional.company}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Star style={{ height: '1rem', width: '1rem', color: '#f59e0b', fill: '#f59e0b' }} />
                              <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{professional.rating}</span>
                              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>({professional.reviewCount} reviews)</span>
                            </div>
                            <div style={{ width: '4px', height: '4px', backgroundColor: '#d1d5db', borderRadius: '50%' }}></div>
                            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{professional.completedJobs} jobs completed</span>
                          </div>
                        </div>
                        
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            marginBottom: '0.5rem'
                          }}>
                            {professional.matchScore}% Match
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                            £{professional.pricePerDay}/day
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>Specialties:</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {professional.specialties.map((specialty, idx) => (
                            <span key={idx} style={{
                              backgroundColor: '#f3f4f6',
                              color: '#374151',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '16px',
                              fontSize: '0.8rem'
                            }}>
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <button style={{
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Mail style={{ height: '1rem', width: '1rem' }} />
                          Contact Now
                        </button>
                        
                        <button style={{
                          backgroundColor: 'white',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Phone style={{ height: '1rem', width: '1rem' }} />
                          {professional.phone}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                setShowMatches(false);
                setStep(1);
                setJobData({
                  title: '',
                  description: '',
                  category: '',
                  skills: [],
                  budget: '',
                  budgetType: 'fixed',
                  timeline: '',
                  urgency: '',
                  location: '',
                  postcode: '',
                  photos: [],
                  requirements: ''
                });
              }}
              style={{
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
            >
              Post Another Job
            </button>
            
            <a href="/dashboard" style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              View Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header */}
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
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>BuildHub</div>
              </a>
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
                  fontSize: '14px'
                }}>
                  
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}>
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    Member
                  </div>
                </div>
              </div>
              
              <div style={{ height: '32px', width: '1px', backgroundColor: '#e5e7eb' }}></div>
              
              <a href="/marketplace" style={{ 
                fontSize: '0.9rem', 
                color: '#6b7280', 
                textDecoration: 'none', 
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Building style={{ height: '1rem', width: '1rem' }} />
                Marketplace
              </a>
              
              <button
                onClick={() => {
                  logout();
                  window.location.href = '/';
                }}
                style={{
                  background: 'none',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontWeight: '500'
                }}
              >
                <LogOut style={{ height: '1rem', width: '1rem' }} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '3rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          
          {/* Progress Bar */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: step >= stepNum ? '#f59e0b' : '#e5e7eb',
                    color: step >= stepNum ? 'white' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div style={{
                      width: '100px',
                      height: '2px',
                      backgroundColor: step > stepNum ? '#f59e0b' : '#e5e7eb',
                      margin: '0 1rem'
                    }}></div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                Step {step} of 3
              </span>
            </div>
          </div>

          {step === 1 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
                  Tell us about your project
                </h1>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Provide basic details about your construction project
                </p>
              </div>

              <div style={{ display: 'grid', gap: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={jobData.title}
                    onChange={(e) => setJobData({...jobData, title: e.target.value})}
                    placeholder="e.g., Kitchen Renovation, Bathroom Refit, Extension"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Project Category *
                  </label>
                  <select
                    value={jobData.category}
                    onChange={(e) => setJobData({...jobData, category: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Project Description *
                  </label>
                  <textarea
                    value={jobData.description}
                    onChange={(e) => setJobData({...jobData, description: e.target.value})}
                    placeholder="Describe your project in detail. Include what you want to achieve, materials needed, and any specific requirements."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Skills Required
                  </label>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>
                    Select the skills needed for your project (helps with matching):
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                    {skillsList.map((skill) => (
                      <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={jobData.skills.includes(skill)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setJobData({...jobData, skills: [...jobData.skills, skill]});
                            } else {
                              setJobData({...jobData, skills: jobData.skills.filter(s => s !== skill)});
                            }
                          }}
                          style={{ margin: 0 }}
                        />
                        <span style={{ fontSize: '0.9rem' }}>{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '2rem' }}>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!jobData.title || !jobData.category || !jobData.description}
                    style={{
                      backgroundColor: !jobData.title || !jobData.category || !jobData.description ? '#d1d5db' : '#f59e0b',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: !jobData.title || !jobData.category || !jobData.description ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next: Budget & Timeline
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
                  Budget & Timeline
                </h1>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Help professionals understand your project requirements
                </p>
              </div>

              <div style={{ display: 'grid', gap: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Budget Type *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    {[
                      { value: 'fixed', label: 'Fixed Price', icon: '💰' },
                      { value: 'hourly', label: 'Hourly Rate', icon: '⏰' },
                      { value: 'daily', label: 'Daily Rate', icon: '📅' }
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setJobData({...jobData, budgetType: type.value})}
                        style={{
                          padding: '1rem',
                          border: `2px solid ${jobData.budgetType === type.value ? '#f59e0b' : '#e5e7eb'}`,
                          backgroundColor: jobData.budgetType === type.value ? '#fef3c7' : 'white',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textAlign: 'center',
                          color: jobData.budgetType === type.value ? '#92400e' : '#6b7280'
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{type.icon}</div>
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Budget Amount (£) *
                  </label>
                  <input
                    type="number"
                    value={jobData.budget}
                    onChange={(e) => setJobData({...jobData, budget: e.target.value})}
                    placeholder={jobData.budgetType === 'fixed' ? '10000' : jobData.budgetType === 'hourly' ? '50' : '350'}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    {jobData.budgetType === 'fixed' && 'Total project budget'}
                    {jobData.budgetType === 'hourly' && 'Maximum per hour rate'}
                    {jobData.budgetType === 'daily' && 'Maximum per day rate'}
                  </p>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Timeline *
                  </label>
                  <select
                    value={jobData.timeline}
                    onChange={(e) => setJobData({...jobData, timeline: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Select timeline</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Urgency
                  </label>
                  <select
                    value={jobData.urgency}
                    onChange={(e) => setJobData({...jobData, urgency: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Select urgency</option>
                    <option value="ASAP">ASAP (Emergency)</option>
                    <option value="Within a week">Within a week</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="Within a month">Within a month</option>
                    <option value="Not urgent">Not urgent</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', paddingTop: '2rem' }}>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      backgroundColor: 'white',
                      color: '#6b7280',
                      border: '1px solid #d1d5db',
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!jobData.budget || !jobData.timeline}
                    style={{
                      backgroundColor: !jobData.budget || !jobData.timeline ? '#d1d5db' : '#f59e0b',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: !jobData.budget || !jobData.timeline ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next: Location & Photos
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
                  Location & Photos
                </h1>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Final details to find the best professionals near you
                </p>
              </div>

              <div style={{ display: 'grid', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                      Location *
                    </label>
                    <input
                      type="text"
                      value={jobData.location}
                      onChange={(e) => setJobData({...jobData, location: e.target.value})}
                      placeholder="e.g., London, Manchester, Birmingham"
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                      Postcode *
                    </label>
                    <input
                      type="text"
                      value={jobData.postcode}
                      onChange={(e) => setJobData({...jobData, postcode: e.target.value.toUpperCase()})}
                      placeholder="e.g., SW1A 1AA"
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Additional Requirements
                  </label>
                  <textarea
                    value={jobData.requirements}
                    onChange={(e) => setJobData({...jobData, requirements: e.target.value})}
                    placeholder="Any special requirements, materials preferences, access issues, etc."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    Project Photos (Optional)
                  </label>
                  <div style={{
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: '#f9fafb'
                  }}>
                    <Camera style={{ height: '3rem', width: '3rem', color: '#9ca3af', margin: '0 auto 1rem' }} />
                    <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '1rem' }}>
                      Upload photos to help professionals understand your project better
                    </p>
                    <button
                      type="button"
                      style={{
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                      onClick={() => alert('Photo upload feature coming soon!')}
                    >
                      Choose Photos
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', paddingTop: '2rem' }}>
                  <button
                    onClick={() => setStep(2)}
                    style={{
                      backgroundColor: 'white',
                      color: '#6b7280',
                      border: '1px solid #d1d5db',
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!jobData.location || !jobData.postcode || isSubmitting}
                    style={{
                      backgroundColor: !jobData.location || !jobData.postcode || isSubmitting ? '#d1d5db' : '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: !jobData.location || !jobData.postcode || isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{ 
                          width: '1rem', 
                          height: '1rem', 
                          border: '2px solid transparent',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Posting Job...
                      </>
                    ) : (
                      <>
                        <CheckCircle style={{ height: '1rem', width: '1rem' }} />
                        Post Job & Find Matches
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
