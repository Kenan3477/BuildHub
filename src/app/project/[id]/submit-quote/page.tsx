'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../../context/AuthContext'
import buildHubAPI from '../../../../lib/api'
import { 
  ArrowLeft,
  MapPin, 
  PoundSterling, 
  Calendar,
  Clock,
  User,
  FileText,
  ImageIcon,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle,
  Upload,
  X
} from "lucide-react"

interface ProjectRequirement {
  id: string
  category: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

interface QuoteItem {
  id: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  total: number
}

export default function SubmitQuotePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  
  // Form state
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    { id: '1', description: '', quantity: 1, unit: 'item', unitPrice: 0, total: 0 }
  ])
  const [totalAmount, setTotalAmount] = useState(0)
  const [timeframe, setTimeframe] = useState('')
  const [description, setDescription] = useState('')
  const [includes, setIncludes] = useState<string[]>([''])
  const [validUntil, setValidUntil] = useState('')
  const [depositPercentage, setDepositPercentage] = useState(10)
  const [warranty, setWarranty] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])

  // Mock project data - replace with real API call
  const mockProject = {
    id: params.id,
    title: 'Kitchen Extension and Renovation',
    description: 'Complete kitchen extension with island, granite countertops, and modern appliances. Looking for high-quality work with attention to detail.',
    location: 'Kensington, London',
    budget: 25000,
    homeownerName: 'Sarah Johnson',
    postedAt: new Date('2026-01-20'),
    deadline: new Date('2026-03-15'),
    requirements: [
      { id: '1', category: 'Structural', description: 'Single-story extension 4m x 6m', priority: 'high' as const },
      { id: '2', category: 'Kitchen', description: 'L-shaped kitchen with island', priority: 'high' as const },
      { id: '3', category: 'Electrical', description: 'New wiring for appliances and lighting', priority: 'high' as const },
      { id: '4', category: 'Plumbing', description: 'Relocate and install new plumbing', priority: 'medium' as const },
      { id: '5', category: 'Finishes', description: 'Granite countertops, tile flooring', priority: 'medium' as const }
    ]
  }

  const addQuoteItem = () => {
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unit: 'item',
      unitPrice: 0,
      total: 0
    }
    setQuoteItems([...quoteItems, newItem])
  }

  const removeQuoteItem = (id: string) => {
    if (quoteItems.length > 1) {
      setQuoteItems(quoteItems.filter(item => item.id !== id))
      calculateTotal(quoteItems.filter(item => item.id !== id))
    }
  }

  const updateQuoteItem = (id: string, field: string, value: string | number) => {
    const updatedItems = quoteItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        updated.total = updated.quantity * updated.unitPrice
        return updated
      }
      return item
    })
    setQuoteItems(updatedItems)
    calculateTotal(updatedItems)
  }

  const calculateTotal = (items: QuoteItem[]) => {
    const total = items.reduce((sum, item) => sum + item.total, 0)
    setTotalAmount(total)
  }

  const addIncludeItem = () => {
    setIncludes([...includes, ''])
  }

  const removeIncludeItem = (index: number) => {
    if (includes.length > 1) {
      setIncludes(includes.filter((_, i) => i !== index))
    }
  }

  const updateIncludeItem = (index: number, value: string) => {
    const updated = [...includes]
    updated[index] = value
    setIncludes(updated)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const handleSubmitQuote = async () => {
    setLoading(true)
    
    try {
      const quoteData = {
        projectId: params.id,
        contractorId: user?.id?.toString() || '',
        amount: totalAmount,
        status: 'pending' as const,
        timeframe,
        description,
        includes: includes.filter(item => item.trim() !== ''),
        validUntil: new Date(validUntil),
        depositPercentage,
        warranty,
        attachments: attachments.map(file => file.name) // Convert File objects to names
      }

      await buildHubAPI.createQuote(quoteData)
      
      // Success - redirect to projects page
      router.push('/projects')
      
    } catch (error) {
      console.error('Error submitting quote:', error)
      alert('Error submitting quote. Please try again.')
    }
    
    setLoading(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <button 
              onClick={() => router.back()}
              style={{
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ArrowLeft style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
            </button>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                Submit Quote
              </h1>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', color: '#6b7280' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User style={{ height: '1rem', width: '1rem' }} />
                  <span>{mockProject.homeownerName}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin style={{ height: '1rem', width: '1rem' }} />
                  <span>{mockProject.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PoundSterling style={{ height: '1rem', width: '1rem' }} />
                  <span>{formatCurrency(mockProject.budget)} budget</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Quote Form */}
          <div style={{ display: 'grid', gap: '2rem' }}>
            
            {/* Project Overview */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>
                Project Overview
              </h3>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
                {mockProject.title}
              </h4>
              <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {mockProject.description}
              </p>
              
              <div>
                <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Requirements:</h5>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {mockProject.requirements.map(req => (
                    <div key={req.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}>
                          {req.category}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                          {req.description}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'white',
                        backgroundColor: getPriorityColor(req.priority),
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px'
                      }}>
                        {req.priority.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote Breakdown */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Quote Breakdown</h3>
                <button 
                  onClick={addQuoteItem}
                  style={{
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
                    gap: '0.5rem'
                  }}
                >
                  <Plus style={{ height: '1rem', width: '1rem' }} />
                  Add Item
                </button>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                {quoteItems.map((item, index) => (
                  <div key={item.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 100px 100px 120px 120px 40px',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '1rem 0',
                    borderBottom: index < quoteItems.length - 1 ? '1px solid #f3f4f6' : 'none'
                  }}>
                    <input 
                      type="text"
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) => updateQuoteItem(item.id, 'description', e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '0.5rem',
                        fontSize: '0.9rem'
                      }}
                    />
                    <input 
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => updateQuoteItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '0.5rem',
                        fontSize: '0.9rem'
                      }}
                    />
                    <select 
                      value={item.unit}
                      onChange={(e) => updateQuoteItem(item.id, 'unit', e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '0.5rem',
                        fontSize: '0.9rem'
                      }}
                    >
                      <option value="item">Item</option>
                      <option value="m²">m²</option>
                      <option value="m">m</option>
                      <option value="hour">Hour</option>
                      <option value="day">Day</option>
                    </select>
                    <input 
                      type="number"
                      placeholder="Unit price"
                      value={item.unitPrice}
                      onChange={(e) => updateQuoteItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '0.5rem',
                        fontSize: '0.9rem'
                      }}
                    />
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}>
                      {formatCurrency(item.total)}
                    </div>
                    <button 
                      onClick={() => removeQuoteItem(item.id)}
                      disabled={quoteItems.length === 1}
                      style={{
                        backgroundColor: quoteItems.length === 1 ? '#f3f4f6' : '#fee2e2',
                        color: quoteItems.length === 1 ? '#9ca3af' : '#dc2626',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.25rem',
                        cursor: quoteItems.length === 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <Minus style={{ height: '1rem', width: '1rem' }} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                paddingTop: '1rem', 
                borderTop: '2px solid #e5e7eb' 
              }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
                    Total: {formatCurrency(totalAmount)}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                    Includes all materials and labor
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Details */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                Quote Details
              </h3>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {/* Timeline */}
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem', display: 'block' }}>
                    Estimated Timeline *
                  </label>
                  <select 
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      fontSize: '1rem'
                    }}
                    required
                  >
                    <option value="">Select timeframe</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="2-3 weeks">2-3 weeks</option>
                    <option value="3-4 weeks">3-4 weeks</option>
                    <option value="4-5 weeks">4-5 weeks</option>
                    <option value="5-6 weeks">5-6 weeks</option>
                    <option value="6-8 weeks">6-8 weeks</option>
                    <option value="8-10 weeks">8-10 weeks</option>
                    <option value="10-12 weeks">10-12 weeks</option>
                    <option value="12+ weeks">12+ weeks</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem', display: 'block' }}>
                    Detailed Description *
                  </label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a detailed description of your approach to this project, including methodology, materials, and quality standards..."
                    rows={4}
                    style={{
                      width: '100%',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                    required
                  />
                </div>

                {/* What's Included */}
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem', display: 'block' }}>
                    What's Included
                  </label>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {includes.map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input 
                          type="text"
                          value={item}
                          onChange={(e) => updateIncludeItem(index, e.target.value)}
                          placeholder="e.g., All materials, Clean-up, 2-year warranty"
                          style={{
                            flex: 1,
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            padding: '0.5rem',
                            fontSize: '0.9rem'
                          }}
                        />
                        <button 
                          onClick={() => removeIncludeItem(index)}
                          disabled={includes.length === 1}
                          style={{
                            backgroundColor: includes.length === 1 ? '#f3f4f6' : '#fee2e2',
                            color: includes.length === 1 ? '#9ca3af' : '#dc2626',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.25rem',
                            cursor: includes.length === 1 ? 'not-allowed' : 'pointer'
                          }}
                        >
                          <X style={{ height: '1rem', width: '1rem' }} />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={addIncludeItem}
                      style={{
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        border: '1px dashed #d1d5db',
                        borderRadius: '6px',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Plus style={{ height: '1rem', width: '1rem' }} />
                      Add item
                    </button>
                  </div>
                </div>

                {/* Valid Until */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem', display: 'block' }}>
                      Quote Valid Until *
                    </label>
                    <input 
                      type="date"
                      value={validUntil}
                      onChange={(e) => setValidUntil(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      style={{
                        width: '100%',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem', display: 'block' }}>
                      Deposit Required (%)
                    </label>
                    <select 
                      value={depositPercentage}
                      onChange={(e) => setDepositPercentage(parseInt(e.target.value))}
                      style={{
                        width: '100%',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        fontSize: '1rem'
                      }}
                    >
                      <option value={0}>No deposit</option>
                      <option value={10}>10%</option>
                      <option value={15}>15%</option>
                      <option value={20}>20%</option>
                      <option value={25}>25%</option>
                      <option value={30}>30%</option>
                    </select>
                  </div>
                </div>

                {/* Warranty */}
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem', display: 'block' }}>
                    Warranty Period
                  </label>
                  <select 
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">No warranty</option>
                    <option value="6 months">6 months</option>
                    <option value="1 year">1 year</option>
                    <option value="2 years">2 years</option>
                    <option value="3 years">3 years</option>
                    <option value="5 years">5 years</option>
                  </select>
                </div>

                {/* File Attachments */}
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem', display: 'block' }}>
                    Attachments (Portfolio, Certificates, etc.)
                  </label>
                  <div style={{ 
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: '#f9fafb'
                  }}>
                    <input 
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                      <Upload style={{ height: '2rem', width: '2rem', color: '#6b7280', margin: '0 auto 1rem' }} />
                      <div style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.25rem' }}>
                        Click to upload or drag and drop
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        PDF, JPG, PNG, DOC up to 10MB each
                      </div>
                    </label>
                  </div>
                  
                  {attachments.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Uploaded files:
                      </div>
                      <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {attachments.map((file, index) => (
                          <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.5rem',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '6px'
                          }}>
                            <span style={{ fontSize: '0.9rem', color: '#374151' }}>{file.name}</span>
                            <button 
                              onClick={() => removeAttachment(index)}
                              style={{
                                backgroundColor: '#fee2e2',
                                color: '#dc2626',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '0.25rem',
                                cursor: 'pointer'
                              }}
                            >
                              <X style={{ height: '0.75rem', width: '0.75rem' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div style={{ display: 'grid', gap: '1.5rem', alignContent: 'start' }}>
            {/* Quote Summary */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              position: 'sticky',
              top: '2rem'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                Quote Summary
              </h3>
              
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Total Amount:</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
                
                {depositPercentage > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280' }}>Deposit ({depositPercentage}%):</span>
                    <span style={{ fontWeight: '600', color: '#f59e0b' }}>
                      {formatCurrency(totalAmount * (depositPercentage / 100))}
                    </span>
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Timeline:</span>
                  <span style={{ fontWeight: '600', color: '#111827' }}>
                    {timeframe || 'Not set'}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Valid Until:</span>
                  <span style={{ fontWeight: '600', color: '#111827' }}>
                    {validUntil ? new Date(validUntil).toLocaleDateString() : 'Not set'}
                  </span>
                </div>
              </div>

              <div style={{ 
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <AlertCircle style={{ height: '1rem', width: '1rem', color: '#f59e0b' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}>
                    Quote Guidelines
                  </span>
                </div>
                <ul style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0, paddingLeft: '1rem' }}>
                  <li>Be detailed in your description</li>
                  <li>Include all materials and labor</li>
                  <li>Set realistic timelines</li>
                  <li>Provide portfolio examples</li>
                </ul>
              </div>

              <button 
                onClick={handleSubmitQuote}
                disabled={loading || !totalAmount || !timeframe || !description || !validUntil}
                style={{
                  width: '100%',
                  backgroundColor: loading || !totalAmount || !timeframe || !description || !validUntil ? '#9ca3af' : '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '1rem',
                  fontWeight: '600',
                  cursor: loading || !totalAmount || !timeframe || !description || !validUntil ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '1rem',
                      height: '1rem',
                      border: '2px solid #ffffff50',
                      borderTop: '2px solid #ffffff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle style={{ height: '1rem', width: '1rem' }} />
                    Submit Quote
                  </>
                )}
              </button>
            </div>

            {/* Tips */}
            <div style={{
              backgroundColor: '#f0f9ff',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #bae6fd'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#0369a1', marginBottom: '1rem' }}>
                Tips for Success
              </h4>
              <ul style={{ fontSize: '0.85rem', color: '#075985', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                <li>Respond quickly to show professionalism</li>
                <li>Include detailed breakdown of costs</li>
                <li>Attach portfolio examples of similar work</li>
                <li>Clearly explain your timeline and process</li>
                <li>Offer warranty for peace of mind</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for loading spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}