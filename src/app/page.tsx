'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { 
  Search,
  Star,
  CheckCircle,
  ArrowRight,
  Hammer,
  Wrench,
  Zap,
  Home,
  Building,
  ShowerHead,
  ChefHat,
  Shield,
  MapPin,
  MessageSquare,
  Phone,
  Clock,
  Award,
  TrendingUp,
  Users,
  Target,
  Calendar,
  PoundSterling
} from "lucide-react"

export default function BuildHubHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { isAuthenticated, user } = useAuth();

  // Handle post project click
  const handlePostProject = () => {
    if (!isAuthenticated || !user?.verified) {
      window.location.href = '/auth/login?redirect=' + encodeURIComponent('/post-job');
    } else {
      window.location.href = '/post-job';
    }
  };
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Homeowner, Kensington", 
      text: "Found an amazing contractor within 2 hours of posting. My kitchen renovation was completed on time and under budget!",
      rating: 5,
      project: "Kitchen Renovation - £18k"
    },
    {
      name: "Mike Johnson", 
      role: "Builder, London",
      text: "I've earned over £45k this year through BuildHub. The quality of leads is incredible - real customers with real budgets.",
      rating: 5,
      project: "Professional Member since 2023"
    },
    {
      name: "Emma Wilson",
      role: "Homeowner, Camden",
      text: "The verification system made me feel safe. All contractors were properly vetted and insured. Brilliant service!",
      rating: 5, 
      project: "Bathroom Extension - £12k"
    }
  ]

  const stats = [
    { number: "18,000+", label: "Verified Professionals", icon: Users },
    { number: "£2.4M", label: "Projects Completed", icon: PoundSterling },
    { number: "94%", label: "Customer Satisfaction", icon: Target },
    { number: "24/7", label: "Support Available", icon: Clock }
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
            </div>
            
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
              {/* Conditional Navigation Based on User Type */}
              {isAuthenticated && user ? (
                // Show different navigation for different user types
                user.userType === 'contractor' ? (
                  // Contractor Navigation
                  <>
                    <a href="/jobs" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Browse Jobs</a>
                    <a href="/marketplace" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Marketplace</a>
                    <a href="/builder-profile" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>My Builder Profile</a>
                  </>
                ) : (
                  // Homeowner Navigation  
                  <>
                    <a href="/professionals" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Find Professionals</a>
                    <button onClick={handlePostProject} style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}>Post a Job</button>
                    <a href="/my-jobs" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>My Jobs</a>
                  </>
                )
              ) : (
                // Non-authenticated users see general navigation
                <>
                  <button onClick={handlePostProject} style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}>Post Project</button>
                </>
              )}
              
              {/* Conditional Navigation */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {isAuthenticated && user ? (
                  <>
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
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <span>Welcome, {user.firstName}!</span>
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
                  </>
                ) : (
                  <>
                    <a href="/auth/login" style={{ fontSize: '0.9rem', color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>Sign In</a>
                    <a href="/auth/login" style={{ 
                      background: 'linear-gradient(135deg, #f59e0b, #ea580c)', 
                      color: 'white', 
                      fontSize: '0.9rem', 
                      padding: '0.75rem 1.5rem', 
                      borderRadius: '6px', 
                      fontWeight: '600',
                      textDecoration: 'none',
                      boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                      transition: 'all 0.2s',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                      Get Started
                    </a>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div style={{ backgroundColor: '#667eea', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span>🔥 LIVE NOW: 47 projects posted in the last hour</span>
            <span>•</span>
            <span>Get matched in under 2 minutes!</span>
            <span>•</span>
            <a href="/professionals" style={{ color: '#fbbf24', textDecoration: 'underline' }}>
              <strong>Professionals: Join 18,000+ verified tradespeople earning £60K+ annually</strong>
            </a>
          </div>
        </div>
      </div>

      {/* Revolutionary Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 75%, #475569 100%)',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(45deg, #f59e0b, #ea580c)',
          borderRadius: '50%',
          opacity: '0.1',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(45deg, #10b981, #059669)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          opacity: '0.1',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center', minHeight: '80vh' }}>
            
            {/* Left Column - Content */}
            <div style={{ color: 'white' }}>
              <div style={{ marginBottom: '2rem', opacity: '0.9' }}>
                <div style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '50px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }} />
                  🔥 47 Live Projects Posted Today • £2.1M+ Projects This Month
                </div>
              </div>

              <h1 style={{ 
                fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                fontWeight: '900', 
                marginBottom: '2rem',
                lineHeight: '1.1',
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Build Your Dream
                <br />
                <span style={{ 
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                  position: 'relative'
                }}>
                  With Confidence
                  <div style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '0',
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                    borderRadius: '2px'
                  }} />
                </span>
              </h1>

              <p style={{ 
                fontSize: '1.3rem', 
                color: '#cbd5e1', 
                marginBottom: '3rem',
                lineHeight: '1.7',
                maxWidth: '600px'
              }}>
                Connect with <strong style={{color: '#f59e0b'}}>18,000+ verified professionals</strong> across the UK. 
                From kitchen renovations to full home builds - get matched with trusted experts in under 2 minutes.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={handlePostProject}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)', 
                    color: 'white', 
                    fontSize: '1.1rem', 
                    padding: '1.25rem 2.5rem', 
                    borderRadius: '12px', 
                    fontWeight: '700',
                    textDecoration: 'none',
                    boxShadow: '0 8px 30px rgba(245, 158, 11, 0.4), 0 0 0 1px rgba(245, 158, 11, 0.3)',
                    transition: 'all 0.3s',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transform: 'translateY(0)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    const target = e.target as HTMLButtonElement
                    target.style.transform = 'translateY(-2px)'
                    target.style.boxShadow = '0 12px 40px rgba(245, 158, 11, 0.5), 0 0 0 1px rgba(245, 158, 11, 0.4)'
                  }}
                  onMouseOut={(e) => {
                    const target = e.target as HTMLButtonElement
                    target.style.transform = 'translateY(0)'
                    target.style.boxShadow = '0 8px 30px rgba(245, 158, 11, 0.4), 0 0 0 1px rgba(245, 158, 11, 0.3)'
                  }}
                >
                  🚀 Post Your Project
                  <ArrowRight style={{ height: '1.2rem', width: '1.2rem' }} />
                </button>
                
                <a 
                  href="/marketplace"
                  style={{
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    fontSize: '1.1rem',
                    padding: '1.25rem 2.5rem',
                    borderRadius: '12px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseOver={(e) => {
                    const target = e.target as HTMLAnchorElement
                    target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                    target.style.borderColor = 'rgba(245, 158, 11, 0.6)'
                    target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseOut={(e) => {
                    const target = e.target as HTMLAnchorElement
                    target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                    target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                    target.style.transform = 'translateY(0)'
                  }}
                >
                  🗺️ Explore Live Jobs
                  <MapPin style={{ height: '1.2rem', width: '1.2rem' }} />
                </a>
              </div>

              {/* Trust Indicators */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', opacity: '0.9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <Shield style={{ height: '1.2rem', width: '1.2rem', color: '#10b981' }} />
                  <span>100% Verified</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <CheckCircle style={{ height: '1.2rem', width: '1.2rem', color: '#10b981' }} />
                  <span>Instant Matching</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <Award style={{ height: '1.2rem', width: '1.2rem', color: '#10b981' }} />
                  <span>94% Success Rate</span>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Dashboard Preview */}
            <div style={{ position: 'relative' }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
                    🔥 Live Project Feed
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    Real projects being posted right now
                  </p>
                </div>
                
                {/* Mock Live Feed */}
                {[
                  { title: "Kitchen Extension", location: "Kensington, London", budget: "£25k", time: "2 mins ago", type: "premium" },
                  { title: "Bathroom Renovation", location: "Didsbury, Manchester", budget: "£12k", time: "5 mins ago", type: "standard" },
                  { title: "Loft Conversion", location: "Clifton, Bristol", budget: "£18k", time: "8 mins ago", type: "premium" }
                ].map((project, index) => (
                  <div key={index} style={{
                    backgroundColor: project.type === 'premium' ? '#fef3c7' : '#f8fafc',
                    border: project.type === 'premium' ? '2px solid #f59e0b' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    position: 'relative',
                    animation: `slideInRight 0.6s ease-out ${index * 0.2}s both`
                  }}>
                    {project.type === 'premium' && (
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '12px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        fontSize: '0.7rem',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontWeight: '600'
                      }}>
                        PREMIUM
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                        {project.title}
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600' }}>
                        {project.budget}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      📍 {project.location}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                        {project.time}
                      </span>
                      <button style={{
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        Quick Quote
                      </button>
                    </div>
                  </div>
                ))}
                
                <button style={{
                  width: '100%',
                  backgroundColor: '#111827',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '1rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}>
                  View All 47 Live Projects →
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes slideInRight {
            from { transform: translateX(30px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>
      </section>

      {/* Enhanced Stats Section */}
      <section style={{ 
        backgroundColor: 'white',
        padding: '4rem 2rem',
        position: 'relative',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '800', 
              color: '#111827', 
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #111827 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Powering the UK's Construction Industry
            </h2>
          </div>

          
          {/* Revolutionary Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ 
                backgroundColor: 'white', 
                padding: '2.5rem 2rem', 
                borderRadius: '20px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                const target = e.currentTarget as HTMLDivElement
                target.style.transform = 'translateY(-5px)'
                target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(245,158,11,0.2)'
              }}
              onMouseOut={(e) => {
                const target = e.currentTarget as HTMLDivElement
                target.style.transform = 'translateY(0)'
                target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)'
              }}
              >
                {/* Background Gradient */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '100px',
                  height: '100px',
                  background: `linear-gradient(135deg, ${index % 2 === 0 ? '#f59e0b' : '#10b981'}, ${index % 2 === 0 ? '#ea580c' : '#059669'})`,
                  borderRadius: '0 20px 0 100px',
                  opacity: '0.1'
                }} />
                
                <div style={{ 
                  width: '4.5rem', 
                  height: '4.5rem', 
                  background: `linear-gradient(135deg, ${index % 2 === 0 ? '#f59e0b' : '#10b981'}, ${index % 2 === 0 ? '#ea580c' : '#059669'})`,
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: `0 8px 25px rgba(${index % 2 === 0 ? '245, 158, 11' : '16, 185, 129'}, 0.4)`
                }}>
                  <stat.icon style={{ height: '2.2rem', width: '2.2rem', color: 'white' }} />
                </div>
                
                <div style={{ 
                  fontSize: '3rem', 
                  fontWeight: '900', 
                  background: `linear-gradient(135deg, #111827, ${index % 2 === 0 ? '#f59e0b' : '#10b981'})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '0.75rem',
                  lineHeight: '1.1'
                }}>
                  {stat.number}
                </div>
                
                <div style={{ 
                  fontSize: '1.1rem', 
                  color: '#6b7280', 
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>
                  {stat.label}
                </div>
                
                {/* Additional context */}
                <div style={{
                  marginTop: '1rem',
                  fontSize: '0.85rem',
                  color: '#9ca3af',
                  fontStyle: 'italic'
                }}>
                  {index === 0 && 'Active this month'}
                  {index === 1 && 'Completed successfully'}
                  {index === 2 && 'Average rating'}
                  {index === 3 && 'Response time'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Service Categories with Hover Effects */}
      <section style={{ 
        backgroundColor: '#f8fafc', 
        padding: '6rem 2rem',
        position: 'relative'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: '0.4'
        }} />
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '50px',
              padding: '0.5rem 1.5rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#92400e',
              marginBottom: '2rem'
            }}>
              🏗️ Most Popular Categories
            </div>
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: '900', 
              background: 'linear-gradient(135deg, #111827 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
              lineHeight: '1.1'
            }}>
              Expert Construction Services
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#6b7280', 
              maxWidth: '800px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              From kitchen makeovers to complete home transformations - find specialized professionals for every construction need
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              { 
                icon: ChefHat, 
                title: "Kitchen Renovation", 
                desc: "Transform your kitchen with modern designs, island layouts, and premium appliances", 
                projects: "240+ projects", 
                avg: "£18k avg",
                popular: true,
                gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                bgColor: '#fef3c7'
              },
              { 
                icon: ShowerHead, 
                title: "Bathroom Renovation", 
                desc: "Complete bathroom suites, wet rooms, and luxury spa-style transformations", 
                projects: "180+ projects", 
                avg: "£12k avg",
                popular: false,
                gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                bgColor: '#dbeafe'
              },
              { 
                icon: Home, 
                title: "House Extension", 
                desc: "Loft conversions, single/double story extensions to maximize your living space", 
                projects: "95+ projects", 
                avg: "£28k avg",
                popular: true,
                gradient: 'linear-gradient(135deg, #10b981, #059669)',
                bgColor: '#d1fae5'
              },
              { 
                icon: Zap, 
                title: "Electrical Work", 
                desc: "Complete rewiring, smart home installations, and electrical safety certifications", 
                projects: "320+ projects", 
                avg: "£5k avg",
                popular: false,
                gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                bgColor: '#ede9fe'
              },
              { 
                icon: Wrench, 
                title: "Plumbing Services", 
                desc: "Boiler installations, central heating systems, and emergency plumbing repairs", 
                projects: "150+ projects", 
                avg: "£3k avg",
                popular: false,
                gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                bgColor: '#cffafe'
              },
              { 
                icon: Building, 
                title: "General Building", 
                desc: "New builds, structural work, and comprehensive home renovations", 
                projects: "85+ projects", 
                avg: "£45k avg",
                popular: true,
                gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
                bgColor: '#fee2e2'
              }
            ].map((service, index) => (
              <div 
                key={index} 
                style={{
                  backgroundColor: 'white',
                  padding: '2.5rem',
                  borderRadius: '24px',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLDivElement
                  target.style.transform = 'translateY(-8px) scale(1.02)'
                  target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)'
                  target.style.borderColor = service.popular ? '#f59e0b' : '#e5e7eb'
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLDivElement
                  target.style.transform = 'translateY(0) scale(1)'
                  target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
                  target.style.borderColor = '#e5e7eb'
                }}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    🔥 Popular
                  </div>
                )}
                
                {/* Background Decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '120px',
                  height: '120px',
                  background: service.gradient,
                  borderRadius: '50%',
                  opacity: '0.1'
                }} />

                <div style={{
                  width: '5rem',
                  height: '5rem',
                  background: service.gradient,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 2rem',
                  boxShadow: `0 10px 30px ${service.bgColor.replace('f', '8').replace('e', '6')}`
                }}>
                  <service.icon style={{ height: '2.5rem', width: '2.5rem', color: 'white' }} />
                </div>
                
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: '800', 
                  color: '#111827', 
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>
                  {service.title}
                </h3>
                
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#6b7280', 
                  marginBottom: '2rem', 
                  lineHeight: '1.6',
                  minHeight: '48px'
                }}>
                  {service.desc}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  backgroundColor: service.bgColor,
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Completed
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>
                      {service.projects}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Average Cost
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: service.popular ? '#f59e0b' : '#10b981' }}>
                      {service.avg}
                    </div>
                  </div>
                </div>
                
                <button style={{
                  width: '100%',
                  background: service.gradient,
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  Find {service.title.split(' ')[0]} Pros
                  <ArrowRight style={{ height: '1rem', width: '1rem' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section style={{ 
        backgroundColor: '#0f172a',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: '6rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(45deg, #f59e0b, #ea580c)',
          borderRadius: '50%',
          opacity: '0.1',
          filter: 'blur(40px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(45deg, #10b981, #059669)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          opacity: '0.1',
          filter: 'blur(40px)'
        }} />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '50px',
              padding: '0.75rem 2rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#f59e0b',
              marginBottom: '2rem'
            }}>
              ⭐ Trusted by Thousands
            </div>
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: '900', 
              color: 'white',
              marginBottom: '1.5rem',
              lineHeight: '1.1'
            }}>
              Real Stories From Real Customers
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#cbd5e1', 
              maxWidth: '700px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Join thousands of homeowners who have successfully transformed their homes with BuildHub
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            borderRadius: '32px', 
            padding: '3.5rem 3rem', 
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative Elements */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              fontSize: '6rem',
              opacity: '0.1',
              color: '#f59e0b',
              lineHeight: '1'
            }}>
              "
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '2.5rem',
              gap: '0.5rem'
            }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} style={{ 
                  height: '2rem', 
                  width: '2rem', 
                  color: '#fbbf24',
                  fill: '#fbbf24'
                }} />
              ))}
            </div>
            
            <blockquote style={{ 
              fontSize: '1.6rem', 
              fontStyle: 'italic', 
              fontWeight: '500',
              color: '#374151', 
              marginBottom: '2.5rem',
              lineHeight: '1.6',
              textAlign: 'center',
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              "{testimonials[currentSlide].text}"
            </blockquote>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: '1.4rem',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)'
              }}>
                {testimonials[currentSlide].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '700', 
                  color: '#111827',
                  marginBottom: '0.25rem'
                }}>
                  {testimonials[currentSlide].name}
                </div>
                <div style={{ 
                  fontSize: '1rem', 
                  color: '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  {testimonials[currentSlide].role}
                </div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#f59e0b', 
                  fontWeight: '600',
                  backgroundColor: '#fef3c7',
                  borderRadius: '6px',
                  padding: '0.25rem 0.75rem',
                  display: 'inline-block'
                }}>
                  {testimonials[currentSlide].project}
                </div>
              </div>
            </div>
            
            {/* Enhanced Navigation */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '1rem',
              alignItems: 'center'
            }}>
              <button
                onClick={() => setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : testimonials.length - 1)}
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  border: '2px solid #e5e7eb',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                ←
              </button>
              
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      width: currentSlide === index ? '2rem' : '0.75rem',
                      height: '0.75rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: currentSlide === index ? '#f59e0b' : '#d1d5db',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentSlide(currentSlide < testimonials.length - 1 ? currentSlide + 1 : 0)}
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  border: '2px solid #e5e7eb',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                →
              </button>
            </div>
          </div>
          
          {/* Additional Social Proof */}
          <div style={{
            marginTop: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { metric: '4.9/5', label: 'Average Rating', icon: '⭐' },
              { metric: '98%', label: 'Project Success', icon: '✅' },
              { metric: '<2hr', label: 'Response Time', icon: '⚡' },
              { metric: '£2.4M+', label: 'Projects Completed', icon: '💰' }
            ].map((item, index) => (
              <div key={index} style={{
                color: 'white',
                opacity: '0.9'
              }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '0.5rem'
                }}>
                  {item.icon}
                </div>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: '800',
                  marginBottom: '0.5rem'
                }}>
                  {item.metric}
                </div>
                <div style={{ 
                  fontSize: '0.9rem',
                  color: '#cbd5e1'
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ backgroundColor: 'white', padding: '5rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginBottom: '1.5rem' }}>
                Ready to Start Your Project?
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
                Join thousands of homeowners who have successfully completed their construction projects through BuildHub. 
                Create your account to post projects and get matched with verified professionals.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                <button 
                  onClick={handlePostProject}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)', 
                    color: 'white', 
                    fontSize: '1.1rem', 
                    padding: '1rem 2.5rem', 
                    borderRadius: '8px', 
                    fontWeight: '700',
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
                    transition: 'all 0.2s',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }}
                >
                  Create Account & Post Project
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '0.9rem', color: '#6b7280', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle style={{ height: '1rem', width: '1rem', color: '#10b981' }} />
                    <span>Verified professionals only</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield style={{ height: '1rem', width: '1rem', color: '#10b981' }} />
                    <span>Secure & spam-free</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone style={{ height: '1rem', width: '1rem', color: '#10b981' }} />
                    <span>Phone verification required</span>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#f0f9ff', 
                border: '1px solid #0ea5e9', 
                borderRadius: '8px', 
                padding: '1rem', 
                marginTop: '2rem',
                fontSize: '0.9rem',
                color: '#0369a1'
              }}>
                <strong>Why account verification?</strong> We require phone verification to ensure all projects are from real homeowners, preventing spam and fraudulent listings. This keeps our platform safe and trustworthy for everyone.
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '20px',
                padding: '3rem',
                border: '2px dashed #d1d5db'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏗️</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
                  Browse Live Projects
                </h3>
                <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '2rem' }}>
                  See what projects are being posted right now on our interactive map
                </p>
                <a href="/marketplace" style={{
                  border: '2px solid #f59e0b',
                  color: '#f59e0b',
                  fontSize: '1rem',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'white'
                }}>
                  <MapPin style={{ height: '1rem', width: '1rem' }} />
                  View Jobs Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '3rem 1rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Building style={{ height: '1.5rem', width: '1.5rem', color: '#f59e0b' }} />
                <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>BuildHub</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#d1d5db', lineHeight: '1.6' }}>
                The UK's leading platform connecting homeowners with verified construction professionals. 
                Build with confidence.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Platform</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><a href="/professionals" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Browse All Professionals</a></li>
                <li style={{ marginBottom: '0.75rem' }}><button onClick={handlePostProject} style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>Post a Project</button></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/how-it-works" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>How It Works</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/auth/login" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Join as Professional</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><a href="/help" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Help Centre</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/contact" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Contact Us</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/safety" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Safety Guidelines</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/trust" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Trust & Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><a href="/about" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>About BuildHub</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/careers" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Careers</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/press" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Press & Media</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/investors" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Investor Relations</a></li>
              </ul>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                © 2024 BuildHub. All rights reserved. | VAT: GB123456789
              </div>
              <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
                <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none', fontWeight: '500' }}>Privacy Policy</a>
                <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none', fontWeight: '500' }}>Terms of Service</a>
                <a href="/cookie-policy" style={{ color: '#9ca3af', textDecoration: 'none', fontWeight: '500' }}>Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}