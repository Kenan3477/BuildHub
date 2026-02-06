// Database schema and types for BuildHub platform

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: 'customer' | 'contractor'
  verified: boolean
  phone?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface ContractorProfile {
  id: string
  userId: string
  companyName: string
  bio: string
  specialties: string[]
  location: string
  serviceRadius: number // km
  rating: number
  reviewCount: number
  projectsCompleted: number
  responseTime: string // e.g., "2 hours"
  memberSince: string
  certifications: Certification[]
  insurance: Insurance[]
  workingHours: WorkingHours
  pricing: PricingInfo
  portfolio: PortfolioItem[]
  availability: boolean
  backgroundCheckStatus: 'pending' | 'approved' | 'rejected'
  verificationStatus: 'pending' | 'verified' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

export interface Certification {
  id: string
  name: string
  issuingBody: string
  certificateNumber: string
  issueDate: Date
  expiryDate?: Date
  verified: boolean
  documentUrl?: string
}

export interface Insurance {
  id: string
  provider: string
  policyNumber: string
  type: 'public_liability' | 'professional_indemnity' | 'employers_liability'
  coverage: number
  expiryDate: Date
  documentUrl?: string
  verified: boolean
}

export interface WorkingHours {
  monday: { start: string; end: string; available: boolean }
  tuesday: { start: string; end: string; available: boolean }
  wednesday: { start: string; end: string; available: boolean }
  thursday: { start: string; end: string; available: boolean }
  friday: { start: string; end: string; available: boolean }
  saturday: { start: string; end: string; available: boolean }
  sunday: { start: string; end: string; available: boolean }
}

export interface PricingInfo {
  dayRate?: number
  hourlyRate?: number
  calloutFee?: number
  freeQuoteRadius: number // km
  minimumJobValue?: number
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  location: string
  budget: number
  completionDate: Date
  images: string[]
  clientRating?: number
  clientReview?: string
  featured: boolean
  tags: string[]
}

export interface Project {
  id: string
  customerId: string
  title: string
  description: string
  category: string
  location: string
  postcode: string
  budget: number
  budgetType: 'fixed' | 'hourly' | 'quote'
  urgency: 'asap' | 'this_week' | 'this_month' | 'flexible'
  timeline: string
  requirements: string[]
  images: string[]
  status: 'draft' | 'active' | 'in_progress' | 'completed' | 'cancelled'
  deadline?: Date
  postedAt: Date
  updatedAt: Date
  quotesReceived: number
  viewCount: number
  contactCount: number
  featured: boolean
  boostExpiryAt?: Date
}

export interface Quote {
  id: string
  projectId: string
  contractorId: string
  amount: number
  description: string
  timeframe: string
  includes: string[]
  excludes?: string[]
  validUntil: Date
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'expired'
  submittedAt: Date
  respondedAt?: Date
  message?: string
  attachments?: string[]
  breakdown?: QuoteBreakdown[]
  terms?: string
  warranty?: string
}

export interface QuoteBreakdown {
  item: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Contract {
  id: string
  projectId: string
  quoteId: string
  customerId: string
  contractorId: string
  amount: number
  status: 'pending' | 'active' | 'completed' | 'disputed' | 'cancelled'
  startDate: Date
  expectedCompletionDate: Date
  actualCompletionDate?: Date
  milestones: Milestone[]
  terms: string
  signedAt: Date
  updatedAt: Date
}

export interface Milestone {
  id: string
  title: string
  description: string
  amount: number
  dueDate: Date
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  completedAt?: Date
  paymentStatus: 'pending' | 'paid' | 'disputed'
  evidence?: string[] // photos, documents
}

export interface Payment {
  id: string
  contractId: string
  milestoneId?: string
  amount: number
  type: 'deposit' | 'milestone' | 'final' | 'refund'
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'disputed'
  paymentIntentId?: string // Stripe payment intent
  escrowReleaseDate?: Date
  platformFee: number
  contractorAmount: number
  createdAt: Date
  processedAt?: Date
  refundedAt?: Date
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  type: 'text' | 'image' | 'file' | 'system'
  attachments?: MessageAttachment[]
  readAt?: Date
  sentAt: Date
  edited: boolean
  editedAt?: Date
}

export interface MessageAttachment {
  id: string
  filename: string
  fileSize: number
  fileType: string
  url: string
  uploadedAt: Date
}

export interface Conversation {
  id: string
  projectId: string
  participants: string[] // user IDs
  lastMessage?: Message
  lastActivity: Date
  unreadCount: { [userId: string]: number }
  archived: boolean
  createdAt: Date
}

export interface Review {
  id: string
  projectId: string
  contractId: string
  reviewerId: string
  revieweeId: string
  reviewerType: 'customer' | 'contractor'
  rating: number
  title: string
  content: string
  categories: ReviewCategory[]
  images?: string[]
  helpful: number
  verified: boolean
  response?: ReviewResponse
  createdAt: Date
  updatedAt: Date
}

export interface ReviewCategory {
  category: string
  rating: number
}

export interface ReviewResponse {
  content: string
  submittedAt: Date
  updatedAt?: Date
}

export interface Lead {
  id: string
  projectId: string
  contractorId: string
  cost: number // credit cost
  status: 'available' | 'purchased' | 'contacted' | 'quoted' | 'won' | 'lost'
  purchasedAt?: Date
  contactedAt?: Date
  quotedAt?: Date
  outcome?: 'won' | 'lost' | 'no_response'
  createdAt: Date
}

export interface ContractorCredit {
  id: string
  contractorId: string
  amount: number
  type: 'purchase' | 'lead_cost' | 'refund' | 'bonus'
  description: string
  transactionId?: string
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  data?: any
  read: boolean
  actionUrl?: string
  createdAt: Date
  readAt?: Date
}

export interface AnalyticsEvent {
  id: string
  userId?: string
  event: string
  properties: Record<string, any>
  timestamp: Date
  sessionId: string
  userAgent?: string
  ipAddress?: string
}

// Mock data for development
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.customer@email.com',
    firstName: 'John',
    lastName: 'Smith',
    userType: 'customer',
    verified: true,
    phone: '+44 7700 900123',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'mike.builder@email.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    userType: 'contractor',
    verified: true,
    phone: '+44 7700 900456',
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2024-01-10')
  }
]

export const mockProjects: Project[] = [
  {
    id: '1',
    customerId: '1',
    title: 'Kitchen Extension and Renovation',
    description: 'Complete kitchen extension to include new island, granite countertops, premium appliances, and modernized electrical work.',
    category: 'Kitchen Renovation',
    location: 'Kensington, London',
    postcode: 'SW7 2AZ',
    budget: 25000,
    budgetType: 'fixed',
    urgency: 'this_month',
    timeline: '4-6 weeks',
    requirements: ['Planning permission handled', 'High-end finishes', 'Modern design', 'Energy efficient appliances'],
    images: [],
    status: 'active',
    deadline: new Date('2026-03-15'),
    postedAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-01-20'),
    quotesReceived: 8,
    viewCount: 45,
    contactCount: 12,
    featured: true
  }
]

export const mockContractorProfiles: ContractorProfile[] = [
  {
    id: '1',
    userId: '2',
    companyName: 'Elite Kitchen Specialists',
    bio: 'Award-winning kitchen renovation specialists with over 15 years of experience in London. We pride ourselves on exceptional craftsmanship and attention to detail.',
    specialties: ['Kitchen Renovation', 'Bathroom Renovation', 'Home Extensions'],
    location: 'London',
    serviceRadius: 25,
    rating: 4.9,
    reviewCount: 127,
    projectsCompleted: 89,
    responseTime: '2 hours',
    memberSince: '2023',
    certifications: [
      {
        id: '1',
        name: 'Gas Safe Registration',
        issuingBody: 'Gas Safe Register',
        certificateNumber: 'GS12345678',
        issueDate: new Date('2023-01-15'),
        expiryDate: new Date('2026-01-15'),
        verified: true
      }
    ],
    insurance: [
      {
        id: '1',
        provider: 'Zurich Insurance',
        policyNumber: 'ZUR123456789',
        type: 'public_liability',
        coverage: 2000000,
        expiryDate: new Date('2026-12-31'),
        verified: true
      }
    ],
    workingHours: {
      monday: { start: '08:00', end: '18:00', available: true },
      tuesday: { start: '08:00', end: '18:00', available: true },
      wednesday: { start: '08:00', end: '18:00', available: true },
      thursday: { start: '08:00', end: '18:00', available: true },
      friday: { start: '08:00', end: '18:00', available: true },
      saturday: { start: '09:00', end: '17:00', available: true },
      sunday: { start: '00:00', end: '00:00', available: false }
    },
    pricing: {
      dayRate: 450,
      calloutFee: 75,
      freeQuoteRadius: 15,
      minimumJobValue: 500
    },
    portfolio: [],
    availability: true,
    backgroundCheckStatus: 'approved',
    verificationStatus: 'verified',
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2026-01-10')
  }
]