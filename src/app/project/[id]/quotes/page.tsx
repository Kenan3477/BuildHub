'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import buildHubAPI from '../../../../lib/api'
import { 
  PoundSterling, 
  Clock, 
  MapPin, 
  User,
  Star,
  MessageSquare,
  FileText,
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  Send,
  Paperclip,
  Phone,
  Video
} from "lucide-react"

interface Quote {
  id: string
  contractorName: string
  contractorRating: number
  amount: number
  timeframe: string
  description: string
  includes: string[]
  submittedAt: Date
  validUntil: Date
  status: 'pending' | 'accepted' | 'rejected'
  contractorId: string
  contractorAvatar?: string
  responseTime: string
}

export default function QuoteManagementPage() {
  const { user } = useAuth()
  const [activeProject, setActiveProject] = useState<string>('1')
  const [activeTab, setActiveTab] = useState<'quotes' | 'messages' | 'progress'>('quotes')
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [showQuoteModal, setShowQuoteModal] = useState(false)

  // Mock data - replace with real API calls
  const mockProject = {
    id: '1',
    title: 'Kitchen Extension and Renovation',
    description: 'Complete kitchen extension with island, granite countertops, and modern appliances',
    budget: 25000,
    location: 'Kensington, London',
    status: 'active' as const,
    postedAt: new Date('2026-01-20'),
    deadline: new Date('2026-03-15')
  }

  const mockQuotes: Quote[] = [
    {
      id: '1',
      contractorName: 'Elite Kitchen Specialists',
      contractorRating: 4.9,
      amount: 24500,
      timeframe: '4-5 weeks',
      description: 'Complete kitchen extension including structural work, electrical, plumbing, and high-end finishes.',
      includes: ['Planning permission assistance', 'Structural calculations', 'Premium granite countertops', 'Bosch appliances package', '2-year warranty'],
      submittedAt: new Date('2026-01-21'),
      validUntil: new Date('2026-02-05'),
      status: 'pending',
      contractorId: '2',
      responseTime: '2 hours'
    },
    {
      id: '2',
      contractorName: 'London Home Builders',
      contractorRating: 4.7,
      amount: 22800,
      timeframe: '5-6 weeks', 
      description: 'Professional kitchen extension with focus on maximizing space and natural light.',
      includes: ['Structural work', 'Electrical and plumbing', 'Quartz countertops', 'Integrated appliances', '1-year warranty'],
      submittedAt: new Date('2026-01-22'),
      validUntil: new Date('2026-02-06'),
      status: 'pending',
      contractorId: '3',
      responseTime: '4 hours'
    },
    {
      id: '3',
      contractorName: 'Premium Construction Co',
      contractorRating: 4.8,
      amount: 26200,
      timeframe: '3-4 weeks',
      description: 'Luxury kitchen extension with premium materials and express timeline.',
      includes: ['Express service', 'Premium marble countertops', 'Miele appliances', 'Underfloor heating', '3-year warranty'],
      submittedAt: new Date('2026-01-23'),
      validUntil: new Date('2026-02-07'),
      status: 'pending',
      contractorId: '4',
      responseTime: '1 hour'
    }
  ]

  const handleAcceptQuote = async (quoteId: string) => {
    try {
      // Update quote status
      await buildHubAPI.updateQuoteStatus(quoteId, 'accepted')
      
      // This would trigger contract creation
      setSelectedQuote(null)
      setShowQuoteModal(false)
      
      // Show success message
      alert('Quote accepted! A contract will be created and you can proceed with payment.')
    } catch (error) {
      console.error('Error accepting quote:', error)
    }
  }

  const handleRejectQuote = async (quoteId: string, message?: string) => {
    try {
      await buildHubAPI.updateQuoteStatus(quoteId, 'rejected', message)
      setSelectedQuote(null)
      setShowQuoteModal(false)
    } catch (error) {
      console.error('Error rejecting quote:', error)
    }
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const getQuoteStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b'
      case 'accepted': return '#10b981'
      case 'rejected': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const calculateTimeLeft = (validUntil: Date): string => {
    const now = new Date()
    const diff = validUntil.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days} days left`
    if (hours > 0) return `${hours} hours left`
    return 'Expired'
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                {mockProject.title}
              </h1>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', color: '#6b7280' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin style={{ height: '1rem', width: '1rem' }} />
                  <span>{mockProject.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PoundSterling style={{ height: '1rem', width: '1rem' }} />
                  <span>{formatCurrency(mockProject.budget)} budget</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar style={{ height: '1rem', width: '1rem' }} />
                  <span>Deadline: {mockProject.deadline.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <TrendingUp style={{ height: '1rem', width: '1rem' }} />
              {mockQuotes.length} Quotes Received
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            {[
              { key: 'quotes', label: 'Quotes', icon: FileText, count: mockQuotes.length },
              { key: 'messages', label: 'Messages', icon: MessageSquare, count: 3 },
              { key: 'progress', label: 'Progress', icon: TrendingUp, count: null }
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
                {tab.count && (
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

        {/* Quotes Tab */}
        {activeTab === 'quotes' && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Quote Comparison Summary */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#111827' }}>
                Quote Comparison
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#10b981', marginBottom: '0.25rem' }}>
                    {formatCurrency(Math.min(...mockQuotes.map(q => q.amount)))}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Lowest Quote</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#f59e0b', marginBottom: '0.25rem' }}>
                    {formatCurrency(mockQuotes.reduce((sum, q) => sum + q.amount, 0) / mockQuotes.length)}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Average Quote</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ef4444', marginBottom: '0.25rem' }}>
                    {formatCurrency(Math.max(...mockQuotes.map(q => q.amount)))}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Highest Quote</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#8b5cf6', marginBottom: '0.25rem' }}>
                    {Math.min(...mockQuotes.map(q => parseInt(q.timeframe.split('-')[0])))} weeks
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Fastest Timeline</div>
                </div>
              </div>
            </div>

            {/* Individual Quotes */}
            {mockQuotes.map(quote => (
              <div key={quote.id} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '1.2rem'
                    }}>
                      {quote.contractorName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.25rem' }}>
                        {quote.contractorName}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Star style={{ height: '1rem', width: '1rem', color: '#fbbf24', fill: '#fbbf24' }} />
                          <span style={{ fontWeight: '600', color: '#111827' }}>{quote.contractorRating}</span>
                          <span style={{ color: '#6b7280' }}>(127 reviews)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                          <span style={{ color: '#6b7280' }}>Responds in {quote.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', marginBottom: '0.25rem' }}>
                      {formatCurrency(quote.amount)}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                      Valid until {quote.validUntil.toLocaleDateString()}
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: quote.validUntil > new Date() ? '#10b981' : '#ef4444',
                      fontWeight: '600'
                    }}>
                      {calculateTimeLeft(quote.validUntil)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '2rem', marginBottom: '1.5rem' }}>
                  <div>
                    <p style={{ color: '#374151', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                      {quote.description}
                    </p>
                    
                    <div>
                      <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                        What's included:
                      </h5>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {quote.includes.map((item, index) => (
                          <li key={index} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem',
                            marginBottom: '0.25rem',
                            color: '#374151'
                          }}>
                            <CheckCircle style={{ height: '1rem', width: '1rem', color: '#10b981' }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ 
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Estimated Timeline
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>
                        {quote.timeframe}
                      </div>
                    </div>
                    
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      Quote submitted: {quote.submittedAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                  <button 
                    onClick={() => {
                      setSelectedQuote(quote)
                      setShowQuoteModal(true)
                    }}
                    style={{
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 2rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <CheckCircle style={{ height: '1rem', width: '1rem' }} />
                    Accept Quote
                  </button>
                  
                  <button style={{
                    backgroundColor: 'white',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <MessageSquare style={{ height: '1rem', width: '1rem' }} />
                    Message
                  </button>
                  
                  <button style={{
                    backgroundColor: 'white',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <User style={{ height: '1rem', width: '1rem' }} />
                    View Profile
                  </button>
                  
                  <button 
                    onClick={() => handleRejectQuote(quote.id)}
                    style={{
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      border: '1px solid #fecaca',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            height: '600px',
            display: 'flex'
          }}>
            {/* Conversation List */}
            <div style={{ width: '300px', borderRight: '1px solid #e5e7eb' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Conversations</h3>
              </div>
              <div style={{ overflowY: 'auto', height: 'calc(600px - 60px)' }}>
                {/* Mock conversations */}
                {mockQuotes.map(quote => (
                  <div key={quote.id} style={{
                    padding: '1rem',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <div style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}>
                        {quote.contractorName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}>
                          {quote.contractorName}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                          Quote submitted
                        </div>
                      </div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#f59e0b'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Elite Kitchen Specialists</h3>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Online now</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    cursor: 'pointer'
                  }}>
                    <Phone style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                  </button>
                  <button style={{
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    cursor: 'pointer'
                  }}>
                    <Video style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                  </button>
                </div>
              </div>
              
              <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: '#6b7280' }}>
                  <MessageSquare style={{ height: '3rem', width: '3rem', margin: '0 auto 1rem', opacity: 0.3 }} />
                  <p>Start a conversation about your project</p>
                </div>
              </div>
              
              <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                  <button style={{
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    cursor: 'pointer'
                  }}>
                    <Paperclip style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                  </button>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <textarea 
                      placeholder="Type your message..."
                      style={{
                        width: '100%',
                        minHeight: '50px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        resize: 'none',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
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
                    <Send style={{ height: '1.2rem', width: '1.2rem' }} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <AlertCircle style={{ height: '4rem', width: '4rem', color: '#f59e0b', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
              No Contract Yet
            </h3>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              Accept a quote to start tracking project progress and milestones.
            </p>
          </div>
        )}
      </div>

      {/* Quote Acceptance Modal */}
      {showQuoteModal && selectedQuote && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90%',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              Accept Quote
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              You're about to accept the quote from <strong>{selectedQuote.contractorName}</strong> for <strong>{formatCurrency(selectedQuote.amount)}</strong>.
            </p>
            
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '1rem', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>What happens next:</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#6b7280' }}>
                <li>A contract will be created</li>
                <li>You'll be asked to pay a 10% deposit ({formatCurrency(selectedQuote.amount * 0.1)})</li>
                <li>Work can begin once deposit is confirmed</li>
                <li>Remaining payment released upon completion</li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => handleAcceptQuote(selectedQuote.id)}
                style={{
                  flex: 1,
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Accept & Continue
              </button>
              <button 
                onClick={() => setShowQuoteModal(false)}
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  padding: '1rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}