'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import buildHubAPI from '../../lib/api'
import {
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Download,
  MessageSquare,
  PoundSterling,
  Calendar,
  User,
  Award,
  Star,
  TrendingUp,
  BarChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

interface PaymentHistory {
  id: string
  amount: number
  type: 'deposit' | 'milestone' | 'final'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  date: Date
  description: string
  contractId: string
}

interface Contract {
  id: string
  projectTitle: string
  contractorName: string
  amount: number
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  startDate: Date
  completionDate?: Date
  milestones: Array<{
    id: string
    description: string
    amount: number
    status: 'pending' | 'completed' | 'paid'
    dueDate: Date
  }>
}

export default function PaymentSystemPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'contracts' | 'escrow'>('overview')
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data - replace with real API calls
  const mockPayments: PaymentHistory[] = [
    {
      id: '1',
      amount: 2500,
      type: 'deposit',
      status: 'completed',
      date: new Date('2026-01-22'),
      description: 'Kitchen Extension - Initial Deposit',
      contractId: 'CNT-001'
    },
    {
      id: '2',
      amount: 8000,
      type: 'milestone',
      status: 'processing',
      date: new Date('2026-01-24'),
      description: 'Structural Work Completed',
      contractId: 'CNT-001'
    },
    {
      id: '3',
      amount: 1200,
      type: 'deposit',
      status: 'completed',
      date: new Date('2026-01-20'),
      description: 'Bathroom Renovation - Deposit',
      contractId: 'CNT-002'
    }
  ]

  const mockContracts: Contract[] = [
    {
      id: 'CNT-001',
      projectTitle: 'Kitchen Extension and Renovation',
      contractorName: 'Elite Kitchen Specialists',
      amount: 24500,
      status: 'active',
      startDate: new Date('2026-01-23'),
      milestones: [
        {
          id: 'M1',
          description: 'Planning and permits',
          amount: 2500,
          status: 'paid',
          dueDate: new Date('2026-01-25')
        },
        {
          id: 'M2', 
          description: 'Structural work and foundation',
          amount: 8000,
          status: 'completed',
          dueDate: new Date('2026-02-05')
        },
        {
          id: 'M3',
          description: 'Kitchen installation',
          amount: 10000,
          status: 'pending',
          dueDate: new Date('2026-02-20')
        },
        {
          id: 'M4',
          description: 'Final finishing and cleanup',
          amount: 4000,
          status: 'pending',
          dueDate: new Date('2026-03-01')
        }
      ]
    },
    {
      id: 'CNT-002',
      projectTitle: 'Bathroom Renovation',
      contractorName: 'Premium Bath Co',
      amount: 8500,
      status: 'active',
      startDate: new Date('2026-01-21'),
      milestones: [
        {
          id: 'M1',
          description: 'Demolition and preparation',
          amount: 1200,
          status: 'paid',
          dueDate: new Date('2026-01-22')
        },
        {
          id: 'M2',
          description: 'Plumbing and electrical',
          amount: 3500,
          status: 'pending',
          dueDate: new Date('2026-02-01')
        },
        {
          id: 'M3',
          description: 'Tiling and fixtures',
          amount: 2800,
          status: 'pending',
          dueDate: new Date('2026-02-10')
        },
        {
          id: 'M4',
          description: 'Final installation',
          amount: 1000,
          status: 'pending',
          dueDate: new Date('2026-02-15')
        }
      ]
    }
  ]

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid': return '#10b981'
      case 'processing':
      case 'active': return '#f59e0b'
      case 'pending': return '#6b7280'
      case 'failed':
      case 'cancelled': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid': return CheckCircle
      case 'processing':
      case 'active': return Clock
      case 'pending': return Clock
      case 'failed':
      case 'cancelled': return AlertTriangle
      default: return Clock
    }
  }

  const handleMilestonePayment = async (contractId: string, milestoneId: string) => {
    setLoading(true)
    try {
      // Process payment through API
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      alert('Payment initiated successfully!')
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    }
    setLoading(false)
  }

  const totalSpent = mockPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPending = mockPayments
    .filter(p => p.status === 'processing')
    .reduce((sum, p) => sum + p.amount, 0)

  const activeContracts = mockContracts.filter(c => c.status === 'active').length

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                Payment Center
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                Secure payment processing with escrow protection
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Shield style={{ height: '1.2rem', width: '1.2rem' }} />
                <span style={{ fontWeight: '600' }}>Escrow Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: '#dbeafe',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex'
            }}>
              <PoundSterling style={{ height: '1.5rem', width: '1.5rem', color: '#2563eb' }} />
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827' }}>
                {formatCurrency(totalSpent)}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Total Spent</div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: '#fef3c7',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex'
            }}>
              <Clock style={{ height: '1.5rem', width: '1.5rem', color: '#d97706' }} />
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827' }}>
                {formatCurrency(totalPending)}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Pending Payments</div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: '#dcfce7',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex'
            }}>
              <FileText style={{ height: '1.5rem', width: '1.5rem', color: '#16a34a' }} />
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827' }}>
                {activeContracts}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Active Contracts</div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: '#f3e8ff',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex'
            }}>
              <TrendingUp style={{ height: '1.5rem', width: '1.5rem', color: '#9333ea' }} />
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827' }}>
                £34K
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Total Project Value</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            {[
              { key: 'overview', label: 'Overview', icon: BarChart },
              { key: 'payments', label: 'Payment History', icon: CreditCard },
              { key: 'contracts', label: 'Active Contracts', icon: FileText },
              { key: 'escrow', label: 'Escrow Protection', icon: Shield }
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Payment Summary Chart */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '2rem' }}>
                Payment Overview
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                  <div style={{ 
                    height: '200px', 
                    backgroundColor: '#f8fafc', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #d1d5db'
                  }}>
                    <div style={{ textAlign: 'center', color: '#6b7280' }}>
                      <BarChart style={{ height: '3rem', width: '3rem', margin: '0 auto 1rem' }} />
                      <p>Payment Analytics Chart</p>
                      <p style={{ fontSize: '0.85rem' }}>(Integration with Chart.js coming soon)</p>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                      {formatCurrency(totalSpent)}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Payments Completed</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f59e0b' }}>
                      {formatCurrency(totalPending)}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Payments Processing</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6b7280' }}>
                      £22,000
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Remaining to Pay</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                Recent Payment Activity
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {mockPayments.slice(0, 3).map(payment => {
                  const StatusIcon = getStatusIcon(payment.status)
                  return (
                    <div key={payment.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          padding: '0.75rem',
                          display: 'flex'
                        }}>
                          <StatusIcon style={{ 
                            height: '1.2rem', 
                            width: '1.2rem', 
                            color: getStatusColor(payment.status) 
                          }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: '600', color: '#111827' }}>
                            {payment.description}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                            {payment.date.toLocaleDateString()} • {payment.type}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>
                          {formatCurrency(payment.amount)}
                        </div>
                        <div style={{ 
                          fontSize: '0.8rem', 
                          fontWeight: '600',
                          color: getStatusColor(payment.status),
                          textTransform: 'capitalize'
                        }}>
                          {payment.status}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Payment History</h3>
                <button style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Download style={{ height: '1rem', width: '1rem' }} />
                  Export
                </button>
              </div>
            </div>
            
            <div style={{ padding: '0' }}>
              {mockPayments.map((payment, index) => {
                const StatusIcon = getStatusIcon(payment.status)
                return (
                  <div key={payment.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem 2rem',
                    borderBottom: index < mockPayments.length - 1 ? '1px solid #f3f4f6' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        backgroundColor: getStatusColor(payment.status) + '20',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        display: 'flex'
                      }}>
                        <StatusIcon style={{ 
                          height: '1.2rem', 
                          width: '1.2rem', 
                          color: getStatusColor(payment.status) 
                        }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#111827' }}>
                          {payment.description}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', gap: '1rem' }}>
                          <span>{payment.date.toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{payment.type}</span>
                          <span>•</span>
                          <span>Contract: {payment.contractId}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>
                          {formatCurrency(payment.amount)}
                        </div>
                        <div style={{ 
                          fontSize: '0.8rem', 
                          fontWeight: '600',
                          color: getStatusColor(payment.status),
                          textTransform: 'capitalize'
                        }}>
                          {payment.status}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{
                          backgroundColor: '#f3f4f6',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.5rem',
                          cursor: 'pointer'
                        }}>
                          <FileText style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                        </button>
                        <button style={{
                          backgroundColor: '#f3f4f6',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.5rem',
                          cursor: 'pointer'
                        }}>
                          <Download style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {mockContracts.map(contract => (
              <div key={contract.id} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden'
              }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.25rem' }}>
                        {contract.projectTitle}
                      </h4>
                      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', color: '#6b7280' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <User style={{ height: '1rem', width: '1rem' }} />
                          <span>{contract.contractorName}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Calendar style={{ height: '1rem', width: '1rem' }} />
                          <span>Started: {contract.startDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
                        {formatCurrency(contract.amount)}
                      </div>
                      <div style={{
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: getStatusColor(contract.status),
                        textTransform: 'capitalize'
                      }}>
                        {contract.status}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 2rem 2rem' }}>
                  <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                    Payment Milestones
                  </h5>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {contract.milestones.map((milestone, index) => {
                      const StatusIcon = getStatusIcon(milestone.status)
                      return (
                        <div key={milestone.id} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1rem',
                          backgroundColor: '#f8fafc',
                          borderRadius: '8px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                              width: '2rem',
                              height: '2rem',
                              borderRadius: '50%',
                              backgroundColor: getStatusColor(milestone.status),
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.85rem',
                              fontWeight: '600'
                            }}>
                              {index + 1}
                            </div>
                            <div>
                              <div style={{ fontSize: '1rem', fontWeight: '600', color: '#111827' }}>
                                {milestone.description}
                              </div>
                              <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                                Due: {milestone.dueDate.toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>
                                {formatCurrency(milestone.amount)}
                              </div>
                              <div style={{ 
                                fontSize: '0.8rem', 
                                fontWeight: '600',
                                color: getStatusColor(milestone.status),
                                textTransform: 'capitalize'
                              }}>
                                {milestone.status}
                              </div>
                            </div>
                            
                            {milestone.status === 'completed' && (
                              <button 
                                onClick={() => handleMilestonePayment(contract.id, milestone.id)}
                                disabled={loading}
                                style={{
                                  backgroundColor: '#f59e0b',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '8px',
                                  padding: '0.5rem 1rem',
                                  cursor: loading ? 'not-allowed' : 'pointer',
                                  fontWeight: '600',
                                  fontSize: '0.9rem',
                                  opacity: loading ? 0.6 : 1
                                }}
                              >
                                {loading ? 'Processing...' : 'Pay Now'}
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Escrow Tab */}
        {activeTab === 'escrow' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Escrow Explanation */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  backgroundColor: '#dcfce7',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex'
                }}>
                  <Shield style={{ height: '2rem', width: '2rem', color: '#16a34a' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '0.25rem' }}>
                    Escrow Protection
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                    Your payments are secured until work is completed to your satisfaction
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                  <div style={{
                    backgroundColor: '#dbeafe',
                    borderRadius: '50%',
                    padding: '1rem',
                    display: 'inline-flex',
                    marginBottom: '1rem'
                  }}>
                    <CreditCard style={{ height: '1.5rem', width: '1.5rem', color: '#2563eb' }} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    1. You Pay
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    Money is securely held in escrow when you make a payment
                  </p>
                </div>

                <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                  <div style={{
                    backgroundColor: '#fef3c7',
                    borderRadius: '50%',
                    padding: '1rem',
                    display: 'inline-flex',
                    marginBottom: '1rem'
                  }}>
                    <Award style={{ height: '1.5rem', width: '1.5rem', color: '#d97706' }} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    2. Work Completed
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    Contractor completes the milestone and requests payment
                  </p>
                </div>

                <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                  <div style={{
                    backgroundColor: '#dcfce7',
                    borderRadius: '50%',
                    padding: '1rem',
                    display: 'inline-flex',
                    marginBottom: '1rem'
                  }}>
                    <CheckCircle style={{ height: '1.5rem', width: '1.5rem', color: '#16a34a' }} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    3. You Approve
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    You review and approve the work, then funds are released
                  </p>
                </div>
              </div>
            </div>

            {/* Escrow Status */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                Current Escrow Holdings
              </h3>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.5rem',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '12px',
                  border: '1px solid #bae6fd'
                }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                      Kitchen Extension Project
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                      Awaiting milestone completion approval
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0369a1' }}>
                      {formatCurrency(8000)}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>In Escrow</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.5rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                      Total Protected Amount
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                      Across all active projects
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
                      {formatCurrency(22000)}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '600' }}>
                      <Shield style={{ height: '0.75rem', width: '0.75rem', display: 'inline', marginRight: '0.25rem' }} />
                      Protected
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                Why Choose Escrow Protection?
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {[
                  {
                    icon: Shield,
                    title: 'Money Back Guarantee',
                    description: 'Get your money back if work isn\'t completed as agreed'
                  },
                  {
                    icon: CheckCircle,
                    title: 'Quality Assurance',
                    description: 'Contractors are motivated to deliver high-quality work'
                  },
                  {
                    icon: Clock,
                    title: 'Dispute Resolution',
                    description: '24/7 support team to help resolve any project issues'
                  },
                  {
                    icon: Star,
                    title: 'Peace of Mind',
                    description: 'Focus on your project, not worrying about payments'
                  }
                ].map((benefit, index) => (
                  <div key={index} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{
                      backgroundColor: '#f59e0b20',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      height: 'fit-content'
                    }}>
                      <benefit.icon style={{ height: '1.2rem', width: '1.2rem', color: '#f59e0b' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                        {benefit.title}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {benefit.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}