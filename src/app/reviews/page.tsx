'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import buildHubAPI from '../../lib/api'
import {
  Star,
  Camera,
  FileText,
  Calendar,
  MessageSquare,
  User,
  Award,
  CheckCircle,
  Clock,
  PoundSterling,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Globe,
  Upload,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  Shield,
  Heart
} from "lucide-react"

interface Review {
  id: string
  homeownerName: string
  homeownerAvatar?: string
  projectTitle: string
  rating: number
  comment: string
  images?: string[]
  date: Date
  verified: boolean
}

interface Project {
  id: string
  title: string
  description: string
  images: string[]
  completedAt: Date
  category: string
  value?: number
  clientTestimonial?: string
}

interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: Date
  expiryDate?: Date
  credentialId?: string
  verified: boolean
}

export default function ReviewsSystemPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'received' | 'given' | 'portfolio' | 'certifications'>('received')
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [newReview, setNewReview] = useState({
    contractorId: '',
    projectId: '',
    rating: 5,
    comment: '',
    images: [] as File[]
  })

  // Mock data - replace with real API calls
  const mockReceivedReviews: Review[] = [
    {
      id: '1',
      homeownerName: 'Sarah Johnson',
      projectTitle: 'Kitchen Extension and Renovation',
      rating: 5,
      comment: 'Absolutely fantastic work! The team was professional, punctual, and delivered exactly what we wanted. The kitchen looks amazing and the quality is outstanding. Would definitely recommend and use again.',
      images: ['/placeholder-image.jpg', '/placeholder-image.jpg'],
      date: new Date('2026-01-20'),
      verified: true
    },
    {
      id: '2',
      homeownerName: 'Michael Chen',
      projectTitle: 'Bathroom Renovation',
      rating: 5,
      comment: 'Excellent communication throughout the project. Very clean workers and attention to detail was superb. The bathroom transformation exceeded our expectations.',
      date: new Date('2026-01-15'),
      verified: true
    },
    {
      id: '3',
      homeownerName: 'Emma Thompson',
      projectTitle: 'Garden Decking Installation',
      rating: 4,
      comment: 'Great work overall. The decking looks beautiful and was completed on time. Minor issue with cleanup but otherwise very satisfied.',
      date: new Date('2026-01-10'),
      verified: true
    },
    {
      id: '4',
      homeownerName: 'David Wilson',
      projectTitle: 'Conservatory Build',
      rating: 5,
      comment: 'Outstanding service from start to finish. Professional, reliable, and produced high-quality work. The conservatory is perfect!',
      date: new Date('2026-01-05'),
      verified: true
    },
    {
      id: '5',
      homeownerName: 'Lisa Brown',
      projectTitle: 'Loft Conversion',
      rating: 4,
      comment: 'Very pleased with the loft conversion. Good value for money and the team was friendly. Would use again.',
      date: new Date('2025-12-28'),
      verified: true
    }
  ]

  const mockPortfolio: Project[] = [
    {
      id: '1',
      title: 'Modern Kitchen Extension',
      description: 'Complete kitchen renovation with island, bi-fold doors to garden, and luxury finishes.',
      images: ['/placeholder-image.jpg', '/placeholder-image.jpg', '/placeholder-image.jpg'],
      completedAt: new Date('2026-01-20'),
      category: 'Kitchen',
      value: 25000,
      clientTestimonial: 'Absolutely fantastic work! Exceeded all expectations.'
    },
    {
      id: '2',
      title: 'Luxury Bathroom Suite',
      description: 'Full bathroom renovation with underfloor heating, rainfall shower, and marble tiles.',
      images: ['/placeholder-image.jpg', '/placeholder-image.jpg'],
      completedAt: new Date('2026-01-15'),
      category: 'Bathroom',
      value: 12000
    },
    {
      id: '3',
      title: 'Garden Decking & Landscaping',
      description: 'Composite decking installation with integrated lighting and planters.',
      images: ['/placeholder-image.jpg'],
      completedAt: new Date('2026-01-10'),
      category: 'Garden',
      value: 8000
    }
  ]

  const mockCertifications: Certification[] = [
    {
      id: '1',
      name: 'Gas Safe Registered',
      issuer: 'Gas Safe Register',
      issueDate: new Date('2023-01-15'),
      expiryDate: new Date('2027-01-15'),
      credentialId: 'GS123456',
      verified: true
    },
    {
      id: '2',
      name: 'NICEIC Approved Contractor',
      issuer: 'NICEIC',
      issueDate: new Date('2022-06-01'),
      expiryDate: new Date('2026-06-01'),
      credentialId: 'NIC789012',
      verified: true
    },
    {
      id: '3',
      name: 'Construction Skills Certification',
      issuer: 'CITB',
      issueDate: new Date('2021-03-10'),
      credentialId: 'CITB345678',
      verified: true
    }
  ]

  const averageRating = mockReceivedReviews.reduce((sum, review) => sum + review.rating, 0) / mockReceivedReviews.length
  const totalReviews = mockReceivedReviews.length

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: mockReceivedReviews.filter(r => r.rating === rating).length
  }))

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const starSize = size === 'sm' ? '0.875rem' : size === 'md' ? '1rem' : '1.25rem'
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        style={{
          height: starSize,
          width: starSize,
          color: index < rating ? '#fbbf24' : '#d1d5db',
          fill: index < rating ? '#fbbf24' : 'transparent'
        }}
      />
    ))
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                Reviews & Portfolio
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                Build trust with verified reviews and showcase your best work
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Star style={{ height: '1.2rem', width: '1.2rem', fill: 'white' }} />
                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{averageRating.toFixed(1)}</span>
                <span style={{ fontWeight: '500' }}>({totalReviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#fef3c7',
              borderRadius: '12px',
              padding: '1rem',
              display: 'inline-flex',
              marginBottom: '1rem'
            }}>
              <Star style={{ height: '1.5rem', width: '1.5rem', color: '#d97706' }} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827', marginBottom: '0.25rem' }}>
              {averageRating.toFixed(1)}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Average Rating</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#dbeafe',
              borderRadius: '12px',
              padding: '1rem',
              display: 'inline-flex',
              marginBottom: '1rem'
            }}>
              <MessageSquare style={{ height: '1.5rem', width: '1.5rem', color: '#2563eb' }} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827', marginBottom: '0.25rem' }}>
              {totalReviews}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Total Reviews</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#dcfce7',
              borderRadius: '12px',
              padding: '1rem',
              display: 'inline-flex',
              marginBottom: '1rem'
            }}>
              <CheckCircle style={{ height: '1.5rem', width: '1.5rem', color: '#16a34a' }} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827', marginBottom: '0.25rem' }}>
              {mockPortfolio.length}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Portfolio Projects</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#f3e8ff',
              borderRadius: '12px',
              padding: '1rem',
              display: 'inline-flex',
              marginBottom: '1rem'
            }}>
              <Shield style={{ height: '1.5rem', width: '1.5rem', color: '#9333ea' }} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827', marginBottom: '0.25rem' }}>
              {mockCertifications.filter(c => c.verified).length}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Verified Certs</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            {[
              { key: 'received', label: 'Reviews Received', icon: Star, count: totalReviews },
              { key: 'portfolio', label: 'Portfolio', icon: Camera, count: mockPortfolio.length },
              { key: 'certifications', label: 'Certifications', icon: Award, count: mockCertifications.length },
              { key: 'given', label: 'Reviews Given', icon: MessageSquare, count: null }
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
                {tab.count !== null && (
                  <span style={{
                    backgroundColor: activeTab === tab.key ? '#f59e0b' : '#e5e7eb',
                    color: activeTab === tab.key ? 'white' : '#6b7280',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Received Tab */}
        {activeTab === 'received' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
            {/* Reviews List */}
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {/* Rating Distribution */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                  Rating Breakdown
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {ratingDistribution.map(({ rating, count }) => (
                    <div key={rating} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', minWidth: '100px' }}>
                        <span style={{ fontWeight: '600' }}>{rating}</span>
                        <Star style={{ height: '1rem', width: '1rem', color: '#fbbf24', fill: '#fbbf24' }} />
                      </div>
                      <div style={{ flex: 1, backgroundColor: '#f3f4f6', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                        <div style={{
                          backgroundColor: '#f59e0b',
                          height: '100%',
                          width: `${totalReviews > 0 ? (count / totalReviews) * 100 : 0}%`,
                          transition: 'width 0.3s'
                        }} />
                      </div>
                      <span style={{ minWidth: '30px', fontSize: '0.9rem', color: '#6b7280' }}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              {mockReceivedReviews.map(review => (
                <div key={review.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: '1.1rem'
                      }}>
                        {review.homeownerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>
                            {review.homeownerName}
                          </span>
                          {review.verified && (
                            <CheckCircle style={{ height: '1rem', width: '1rem', color: '#10b981' }} />
                          )}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                          {review.projectTitle}
                        </div>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', color: '#6b7280', fontSize: '0.85rem' }}>
                      {formatDate(review.date)}
                    </div>
                  </div>

                  <p style={{ 
                    color: '#374151', 
                    fontSize: '1rem', 
                    lineHeight: '1.6', 
                    marginBottom: review.images ? '1rem' : '0' 
                  }}>
                    {review.comment}
                  </p>

                  {review.images && review.images.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {review.images.map((image, index) => (
                        <div key={index} style={{
                          width: '80px',
                          height: '80px',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}>
                          <ImageIcon style={{ height: '2rem', width: '2rem', color: '#9ca3af' }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div style={{ display: 'grid', gap: '1.5rem', alignContent: 'start' }}>
              {/* Quick Stats */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Recent Performance
                </h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280' }}>This Month:</span>
                    <span style={{ fontWeight: '600' }}>3 reviews</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280' }}>Avg Rating:</span>
                    <span style={{ fontWeight: '600', color: '#10b981' }}>4.8★</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280' }}>Response Rate:</span>
                    <span style={{ fontWeight: '600', color: '#10b981' }}>100%</span>
                  </div>
                </div>
              </div>

              {/* Review Request */}
              <div style={{
                backgroundColor: '#f0f9ff',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #bae6fd'
              }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0369a1', marginBottom: '1rem' }}>
                  Request Reviews
                </h4>
                <p style={{ color: '#075985', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                  Ask satisfied customers to leave a review to build your reputation.
                </p>
                <button style={{
                  backgroundColor: '#0369a1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  width: '100%'
                }}>
                  Send Review Request
                </button>
              </div>

              {/* Tips */}
              <div style={{
                backgroundColor: '#fef3c7',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #fde68a'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400e', marginBottom: '1rem' }}>
                  💡 Review Tips
                </h4>
                <ul style={{ fontSize: '0.85rem', color: '#78350f', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Follow up within 24hrs of completion</li>
                  <li>Provide excellent customer service</li>
                  <li>Ask for feedback during the project</li>
                  <li>Respond to all reviews professionally</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Portfolio Showcase</h3>
              <button style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Plus style={{ height: '1rem', width: '1rem' }} />
                Add Project
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {mockPortfolio.map(project => (
                <div key={project.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s'
                }}>
                  {/* Project Images */}
                  <div style={{ 
                    height: '200px', 
                    backgroundColor: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <ImageIcon style={{ height: '3rem', width: '3rem', color: '#9ca3af' }} />
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px'
                    }}>
                      {project.category}
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
                      {project.title}
                    </h4>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                      {project.description}
                    </p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        Completed: {formatDate(project.completedAt)}
                      </div>
                      {project.value && (
                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>
                          {formatCurrency(project.value)}
                        </div>
                      )}
                    </div>

                    {project.clientTestimonial && (
                      <div style={{
                        backgroundColor: '#f8fafc',
                        borderLeft: '3px solid #f59e0b',
                        padding: '1rem',
                        borderRadius: '0 8px 8px 0',
                        marginBottom: '1rem'
                      }}>
                        <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#374151', margin: 0 }}>
                          "{project.clientTestimonial}"
                        </p>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{
                        flex: 1,
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Edit
                      </button>
                      <button style={{
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <ExternalLink style={{ height: '0.875rem', width: '0.875rem' }} />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Professional Certifications</h3>
              <button style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Plus style={{ height: '1rem', width: '1rem' }} />
                Add Certification
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {mockCertifications.map(cert => (
                <div key={cert.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: cert.verified ? '#dcfce7' : '#fef3c7',
                      borderRadius: '12px',
                      padding: '1rem',
                      display: 'flex'
                    }}>
                      <Award style={{ 
                        height: '1.5rem', 
                        width: '1.5rem', 
                        color: cert.verified ? '#16a34a' : '#d97706' 
                      }} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                          {cert.name}
                        </h4>
                        {cert.verified && (
                          <Shield style={{ height: '1rem', width: '1rem', color: '#10b981' }} />
                        )}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        Issued by: {cert.issuer}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                        {formatDate(cert.issueDate)}
                        {cert.expiryDate && ` • Expires: ${formatDate(cert.expiryDate)}`}
                        {cert.credentialId && ` • ID: ${cert.credentialId}`}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      cursor: 'pointer'
                    }}>
                      <Edit style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                    </button>
                    <button style={{
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      cursor: 'pointer'
                    }}>
                      <ExternalLink style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Given Tab */}
        {activeTab === 'given' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '3rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <MessageSquare style={{ height: '4rem', width: '4rem', color: '#d1d5db', margin: '0 auto 2rem' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
              No Reviews Given Yet
            </h3>
            <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Leave reviews for homeowners you've worked with to build community trust.
            </p>
            <button 
              onClick={() => setShowWriteReview(true)}
              style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem 2rem',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              Write Your First Review
            </button>
          </div>
        )}
      </div>
    </div>
  )
}