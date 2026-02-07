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

export default function QuoteManagementPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const [activeProject, setActiveProject] = useState<string>(params.id || '1')
  const [activeTab, setActiveTab] = useState<'quotes' | 'messages' | 'progress'>('quotes')
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [showQuoteModal, setShowQuoteModal] = useState(false)

  // Mock data - replace with real API calls
  const mockProject = {
    id: params.id,
    title: params.id === '1' ? 'Kitchen Renovation' : `Project ${params.id}`,
    description: params.id === '1' ? 
      'Complete kitchen renovation including new cabinets, countertops, and appliances' :
      'Construction project details will be loaded here',
    budget: params.id === '1' ? 25000 : 20000,
    location: params.id === '1' ? 'Kensington, London' : 'London, UK',
    status: 'active' as const,
    postedAt: new Date('2026-01-20'),
    deadline: new Date('2026-03-15')
  }

  const mockQuotes: Quote[] = []

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
            {mockQuotes.length > 0 ? (
              <>
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
                    {/* Quote content would go here */}
                  </div>
                ))}
              </>
            ) : (
              /* Empty State for No Proposals */
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '4rem 2rem',
                textAlign: 'center',
                border: '2px dashed #e5e7eb',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📝</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
                  No Proposals Yet
                </h3>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                  Your project was just posted! Qualified contractors will start submitting proposals soon. 
                  You'll be notified when the first proposals arrive.
                </p>
                <div style={{
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  padding: '1rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  marginBottom: '2rem',
                  display: 'inline-block'
                }}>
                  💡 <strong>Tip:</strong> Most projects receive 3-8 proposals within 24-48 hours
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href="/professionals"
                    style={{
                      backgroundColor: '#f59e0b',
                      color: '#fff',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Browse Professionals
                  </a>
                  <a
                    href="/help"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#f59e0b',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      border: '2px solid #f59e0b'
                    }}
                  >
                    Need Help?
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div>
              <MessageSquare size={64} style={{ color: '#d1d5db', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
                No Messages Yet
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Once contractors submit proposals, you'll be able to message them directly here.
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                Messages will appear when you receive your first proposals.
              </p>
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