export interface JobData {
  id?: string
  category: string
  customCategory?: string
  postcode: string
  urgency: string
  budget: string
  title: string
  description: string
  photos: string[]
  name: string
  phone: string
  email: string
  contactPreferences: string[]
  createdAt?: Date
}

export interface LeadScore {
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | 'REJECT'
  factors: {
    budget: number
    urgency: number
    location: number
    quality: number
  }
  tier: 1 | 2 | 3 | 0
  price: number
  reasons: string[]
}

export interface ContractorProfile {
  id: string
  businessName: string
  specialties: string[]
  postcode: string
  serviceRadius: number
  rating: number
  totalJobs: number
  responseTime: number
  verified: boolean
}

export interface Quote {
  id: string
  jobId: string
  contractorId: string
  price: number
  timeline: string
  description: string
  materialsIncluded: boolean
  warranty: number
  createdAt: Date
  status: 'pending' | 'viewed' | 'accepted' | 'rejected'
}

export const jobCategories = [
  { id: "kitchen", name: "Kitchen", description: "Kitchen renovation, fitting, refurbishment" },
  { id: "bathroom", name: "Bathroom", description: "Bathroom installation, renovation, tiling" },
  { id: "extension", name: "Extension", description: "House extension, loft conversion, conservatory" },
  { id: "roofing", name: "Roofing", description: "Roof repair, replacement, guttering, fascias" },
  { id: "electrical", name: "Electrical", description: "Electrical installation, rewiring, fault finding" },
  { id: "plumbing", name: "Plumbing", description: "Plumbing installation, repair, boiler service" },
  { id: "painting", name: "Painting", description: "Interior/exterior painting, decorating" },
  { id: "building", name: "General Building", description: "General building work, repairs, maintenance" },
]

export const urgencyOptions = [
  { id: "emergency", label: "URGENT - This week", description: "Emergency repair needed", priority: "HIGH", color: "bg-red-500" },
  { id: "this_week", label: "This week", description: "Start within 7 days", priority: "HIGH", color: "bg-orange-500" },
  { id: "this_month", label: "Within a month", description: "Start within 30 days", priority: "MEDIUM", color: "bg-blue-500" },
  { id: "next_month", label: "Next 2-3 months", description: "Planning ahead", priority: "LOW", color: "bg-green-500" },
  { id: "next_quarter", label: "Next quarter", description: "Long-term planning", priority: "LOW", color: "bg-gray-500" },
  { id: "planning", label: "Just planning", description: "Getting quotes for future", priority: "LOW", color: "bg-gray-400" },
]

export const budgetOptions = [
  { id: "under_1k", label: "Under £1,000", description: "Small jobs & repairs", value: 750 },
  { id: "1k_5k", label: "£1,000 - £5,000", description: "Medium projects", value: 3000 },
  { id: "5k_15k", label: "£5,000 - £15,000", description: "Large renovations", value: 10000 },
  { id: "15k_50k", label: "£15,000 - £50,000", description: "Major projects", value: 30000 },
  { id: "50k_plus", label: "£50,000+", description: "Premium developments", value: 75000 },
  { id: "get_quotes", label: "Get quotes first", description: "Not sure on budget", value: 8000 },
]