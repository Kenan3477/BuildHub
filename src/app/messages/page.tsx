'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import buildHubAPI from '../../lib/api'
import {
  MessageSquare,
  Send,
  Paperclip,
  Image as ImageIcon,
  Phone,
  Video,
  MoreVertical,
  Search,
  Star,
  Clock,
  CheckCircle2,
  Archive,
  AlertCircle,
  FileText,
  Download,
  X,
  Plus,
  Smile
} from "lucide-react"

interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar?: string
  participantType: 'homeowner' | 'contractor'
  projectTitle?: string
  lastMessage: {
    content: string
    timestamp: Date
    senderId: string
  }
  unreadCount: number
  status: 'online' | 'offline' | 'away'
  isArchived: boolean
}

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  type: 'text' | 'image' | 'file' | 'quote' | 'contract'
  timestamp: Date
  attachments?: Array<{
    name: string
    url: string
    type: 'image' | 'file'
  }>
  readBy: string[]
  metadata?: {
    quoteAmount?: number
    fileName?: string
    fileSize?: number
  }
}

interface QuickReply {
  id: string
  text: string
  category: 'greeting' | 'scheduling' | 'pricing' | 'completion'
}

export default function MessagingSystemPage() {
  const { user } = useAuth()
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all')

  // Mock data - replace with real API calls
  const mockConversations: Conversation[] = [
    {
      id: '1',
      participantId: 'user_123',
      participantName: 'Sarah Johnson',
      participantType: 'homeowner',
      projectTitle: 'Kitchen Extension and Renovation',
      lastMessage: {
        content: 'Thanks for the update! When do you think the kitchen island will be installed?',
        timestamp: new Date('2026-01-24T14:30:00'),
        senderId: 'user_123'
      },
      unreadCount: 2,
      status: 'online',
      isArchived: false
    },
    {
      id: '2',
      participantId: 'contractor_456',
      participantName: 'Elite Kitchen Specialists',
      participantType: 'contractor',
      projectTitle: 'Bathroom Renovation',
      lastMessage: {
        content: 'I can start the tiling work tomorrow morning. Would 8 AM work for you?',
        timestamp: new Date('2026-01-24T12:15:00'),
        senderId: 'contractor_456'
      },
      unreadCount: 0,
      status: 'away',
      isArchived: false
    },
    {
      id: '3',
      participantId: 'user_789',
      participantName: 'Michael Chen',
      participantType: 'homeowner',
      projectTitle: 'Garden Landscaping',
      lastMessage: {
        content: 'Could you send me some photos of your previous landscaping work?',
        timestamp: new Date('2026-01-24T10:45:00'),
        senderId: 'user_789'
      },
      unreadCount: 1,
      status: 'offline',
      isArchived: false
    }
  ]

  const mockMessages: Message[] = [
    {
      id: '1',
      senderId: 'user_123',
      senderName: 'Sarah Johnson',
      content: 'Hi! I wanted to check on the progress of the kitchen extension. How are things going?',
      type: 'text',
      timestamp: new Date('2026-01-24T14:00:00'),
      readBy: [user?.id?.toString() || '']
    },
    {
      id: '2',
      senderId: user?.id?.toString() || '',
      senderName: user?.email || 'You',
      content: 'Hello Sarah! The structural work is complete and we\'re moving on to the electrical and plumbing phase. Everything is on schedule.',
      type: 'text',
      timestamp: new Date('2026-01-24T14:05:00'),
      readBy: ['user_123']
    },
    {
      id: '3',
      senderId: user?.id?.toString() || '',
      senderName: user?.email || 'You',
      content: 'Here are some progress photos from today:',
      type: 'image',
      timestamp: new Date('2026-01-24T14:10:00'),
      attachments: [
        { name: 'kitchen_progress_1.jpg', url: '/placeholder-image.jpg', type: 'image' },
        { name: 'kitchen_progress_2.jpg', url: '/placeholder-image.jpg', type: 'image' }
      ],
      readBy: ['user_123']
    },
    {
      id: '4',
      senderId: 'user_123',
      senderName: 'Sarah Johnson',
      content: 'Wow, this looks amazing! I love how the space is opening up. The island placement looks perfect.',
      type: 'text',
      timestamp: new Date('2026-01-24T14:25:00'),
      readBy: []
    },
    {
      id: '5',
      senderId: 'user_123',
      senderName: 'Sarah Johnson',
      content: 'Thanks for the update! When do you think the kitchen island will be installed?',
      type: 'text',
      timestamp: new Date('2026-01-24T14:30:00'),
      readBy: []
    }
  ]

  const quickReplies: QuickReply[] = [
    { id: '1', text: 'I\'ll be there at 9 AM', category: 'scheduling' },
    { id: '2', text: 'Work is progressing well', category: 'completion' },
    { id: '3', text: 'Let me check and get back to you', category: 'greeting' },
    { id: '4', text: 'That would be an additional cost', category: 'pricing' },
    { id: '5', text: 'Photos attached as requested', category: 'completion' },
    { id: '6', text: 'Thanks for your patience', category: 'greeting' }
  ]

  const selectedConversationData = mockConversations.find(c => c.id === selectedConversation)

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    
    switch (filter) {
      case 'unread': return matchesSearch && conv.unreadCount > 0
      case 'archived': return matchesSearch && conv.isArchived
      default: return matchesSearch && !conv.isArchived
    }
  })

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return
    
    setLoading(true)
    try {
      // Create message through API
      await buildHubAPI.sendMessage({
        senderId: user?.id?.toString() || '',
        conversationId: selectedConversation,
        content: newMessage,
        type: 'text'
      })
      
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
    setLoading(false)
  }

  const handleQuickReply = (reply: QuickReply) => {
    setNewMessage(reply.text)
    setShowQuickReplies(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload
      console.log('File uploaded:', e.target.files[0].name)
    }
  }

  const formatTimestamp = (date: Date): string => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#10b981', borderRadius: '50%' }} />
      case 'away': return <Clock style={{ height: '0.5rem', width: '0.5rem', color: '#f59e0b' }} />
      case 'offline': return null
      default: return null
    }
  }

  return (
    <div style={{ height: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '0.25rem' }}>
              Messages
            </h1>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              Real-time communication with your project team
            </p>
          </div>
          <div style={{
            backgroundColor: '#f59e0b',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <MessageSquare style={{ height: '1rem', width: '1rem' }} />
            {mockConversations.filter(c => c.unreadCount > 0).length} Unread
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        {/* Conversations Sidebar */}
        <div style={{ width: '400px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
          {/* Search and Filters */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Search style={{ 
                position: 'absolute', 
                left: '0.75rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                height: '1rem', 
                width: '1rem', 
                color: '#9ca3af' 
              }} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['all', 'unread', 'archived'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: filter === f ? 'none' : '1px solid #d1d5db',
                    backgroundColor: filter === f ? '#f59e0b' : 'white',
                    color: filter === f ? 'white' : '#6b7280',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                style={{
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid #f3f4f6',
                  cursor: 'pointer',
                  backgroundColor: selectedConversation === conversation.id ? '#fef3c7' : 'white',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      background: conversation.participantType === 'contractor' ? 
                        'linear-gradient(135deg, #f59e0b, #ea580c)' : 
                        'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '1rem'
                    }}>
                      {conversation.participantName.split(' ').map(n => n[0]).join('')}
                    </div>
                    {conversation.status === 'online' && (
                      <div style={{
                        position: 'absolute',
                        bottom: '0.125rem',
                        right: '0.125rem',
                        width: '0.75rem',
                        height: '0.75rem',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        border: '2px solid white'
                      }} />
                    )}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {conversation.participantName}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {getStatusIcon(conversation.status)}
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                          {formatTimestamp(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    {conversation.projectTitle && (
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        {conversation.projectTitle}
                      </div>
                    )}
                    
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {conversation.lastMessage.content}
                    </div>
                  </div>

                  {conversation.unreadCount > 0 && (
                    <div style={{
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      borderRadius: '50%',
                      minWidth: '1.25rem',
                      height: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedConversationData ? (
            <>
              {/* Chat Header */}
              <div style={{ 
                backgroundColor: 'white', 
                borderBottom: '1px solid #e5e7eb', 
                padding: '1rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      background: selectedConversationData.participantType === 'contractor' ? 
                        'linear-gradient(135deg, #f59e0b, #ea580c)' : 
                        'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '0.9rem'
                    }}>
                      {selectedConversationData.participantName.split(' ').map(n => n[0]).join('')}
                    </div>
                    {selectedConversationData.status === 'online' && (
                      <div style={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        width: '0.75rem',
                        height: '0.75rem',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        border: '2px solid white'
                      }} />
                    )}
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>
                      {selectedConversationData.participantName}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
                      {selectedConversationData.status === 'online' && <span>Online now</span>}
                      {selectedConversationData.status === 'away' && <span>Away</span>}
                      {selectedConversationData.status === 'offline' && <span>Last seen 2 hours ago</span>}
                      {selectedConversationData.projectTitle && (
                        <>
                          <span>•</span>
                          <span>{selectedConversationData.projectTitle}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}>
                    <Phone style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                  </button>
                  <button style={{
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}>
                    <Video style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                  </button>
                  <button style={{
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}>
                    <MoreVertical style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div style={{ 
                flex: 1, 
                padding: '1rem', 
                overflowY: 'auto',
                backgroundColor: '#f8fafc'
              }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {mockMessages.map(message => {
                    const isOwn = message.senderId === user?.id?.toString()
                    return (
                      <div key={message.id} style={{
                        display: 'flex',
                        justifyContent: isOwn ? 'flex-end' : 'flex-start'
                      }}>
                        <div style={{
                          maxWidth: '70%',
                          padding: '0.75rem 1rem',
                          borderRadius: isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          backgroundColor: isOwn ? '#f59e0b' : 'white',
                          color: isOwn ? 'white' : '#111827',
                          border: isOwn ? 'none' : '1px solid #e5e7eb',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                          {message.attachments && message.attachments.length > 0 && (
                            <div style={{ marginBottom: '0.5rem' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                                {message.attachments.map((attachment, index) => (
                                  <div key={index} style={{
                                    position: 'relative',
                                    backgroundColor: isOwn ? 'rgba(255, 255, 255, 0.1)' : '#f3f4f6',
                                    borderRadius: '8px',
                                    padding: '0.5rem',
                                    fontSize: '0.8rem'
                                  }}>
                                    {attachment.type === 'image' ? (
                                      <div>
                                        <ImageIcon style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                                        {attachment.name}
                                      </div>
                                    ) : (
                                      <div>
                                        <FileText style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                                        {attachment.name}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                            {message.content}
                          </div>
                          
                          <div style={{ 
                            fontSize: '0.75rem', 
                            marginTop: '0.5rem',
                            opacity: 0.7,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span>{formatTimestamp(message.timestamp)}</span>
                            {isOwn && message.readBy.length > 0 && (
                              <CheckCircle2 style={{ height: '0.875rem', width: '0.875rem' }} />
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick Replies */}
              {showQuickReplies && (
                <div style={{ 
                  backgroundColor: 'white', 
                  borderTop: '1px solid #e5e7eb',
                  padding: '1rem 1.5rem'
                }}>
                  <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#6b7280' }}>
                    Quick Replies:
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {quickReplies.map(reply => (
                      <button
                        key={reply.id}
                        onClick={() => handleQuickReply(reply)}
                        style={{
                          backgroundColor: '#f3f4f6',
                          border: '1px solid #d1d5db',
                          borderRadius: '16px',
                          padding: '0.5rem 1rem',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div style={{ 
                backgroundColor: 'white', 
                borderTop: '1px solid #e5e7eb',
                padding: '1rem 1.5rem'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                      style={{
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <Paperclip style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                    </button>
                    
                    {showAttachmentMenu && (
                      <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: 0,
                        marginBottom: '0.5rem',
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        padding: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        minWidth: '150px'
                      }}>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                          style={{ display: 'none' }}
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem',
                          cursor: 'pointer',
                          borderRadius: '6px',
                          fontSize: '0.85rem'
                        }}>
                          <ImageIcon style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                          Photos
                        </label>
                        
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          style={{ display: 'none' }}
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem',
                          cursor: 'pointer',
                          borderRadius: '6px',
                          fontSize: '0.85rem'
                        }}>
                          <FileText style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                          Files
                        </label>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setShowQuickReplies(!showQuickReplies)}
                    style={{
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <Smile style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                  </button>
                  
                  <div style={{ flex: 1, position: 'relative' }}>
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      placeholder="Type your message..."
                      style={{
                        width: '100%',
                        minHeight: '50px',
                        maxHeight: '120px',
                        border: '1px solid #d1d5db',
                        borderRadius: '12px',
                        padding: '0.75rem 1rem',
                        resize: 'none',
                        fontFamily: 'inherit',
                        fontSize: '0.95rem',
                        lineHeight: '1.4'
                      }}
                      rows={1}
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={loading || !newMessage.trim()}
                    style={{
                      backgroundColor: loading || !newMessage.trim() ? '#9ca3af' : '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem 1.5rem',
                      cursor: loading || !newMessage.trim() ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <Send style={{ height: '1.2rem', width: '1.2rem' }} />
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Conversation Selected */
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white'
            }}>
              <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                <MessageSquare style={{ 
                  height: '4rem', 
                  width: '4rem', 
                  color: '#d1d5db', 
                  margin: '0 auto 2rem' 
                }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
                  Select a Conversation
                </h3>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Choose a conversation from the sidebar to start messaging with homeowners and contractors about your projects.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}