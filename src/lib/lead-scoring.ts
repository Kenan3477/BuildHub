import { jobCategories, urgencyOptions, budgetOptions } from './types'

interface LeadData {
  category: string
  postcode: string
  urgency: string
  budget: string
  description: string
  photos: string[]
  name: string
  phone: string
  email: string
}

interface ScoringFactors {
  budget: number
  urgency: number
  location: number
  quality: number
}

interface LeadScore {
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | 'REJECT'
  factors: ScoringFactors
  tier: 1 | 2 | 3 | 0
  price: number
  reasons: string[]
}

export class LeadScoringEngine {
  private yourPostcode: string
  private yourSpecialties: string[]

  constructor(yourPostcode = 'SW1A 1AA', yourSpecialties = ['kitchen', 'bathroom', 'extension']) {
    this.yourPostcode = yourPostcode
    this.yourSpecialties = yourSpecialties
  }

  /**
   * Calculate comprehensive lead score (0-100)
   * Based on proven construction lead analysis
   */
  scoreJob(jobData: LeadData): LeadScore {
    const factors: ScoringFactors = {
      budget: this.analyzeBudget(jobData.budget),
      urgency: this.analyzeUrgency(jobData.urgency), 
      location: this.analyzeLocation(jobData.postcode),
      quality: this.analyzeQuality(jobData)
    }

    // Weighted scoring algorithm
    const score = Math.round(
      factors.budget * 0.4 +      // Budget is most important (40%)
      factors.urgency * 0.3 +     // Urgency drives action (30%)
      factors.location * 0.2 +    // Location affects costs (20%)
      factors.quality * 0.1       // Quality indicates serious buyers (10%)
    )

    const grade = this.scoreToGrade(score)
    const priority = this.determinePriority(score, jobData)
    const { tier, price } = this.determineTierAndPrice(score, jobData)
    const reasons = this.generateReasons(factors, jobData)

    return {
      score: Math.min(score, 100),
      grade,
      priority,
      factors,
      tier,
      price,
      reasons
    }
  }

  private analyzeBudget(budgetRange: string): number {
    const budgetScores: { [key: string]: number } = {
      'under_1k': 15,     // Small jobs
      '1k_5k': 35,        // Medium projects  
      '5k_15k': 65,       // Large renovations
      '15k_50k': 85,      // Major projects
      '50k_plus': 100,    // Premium developments
      'get_quotes': 25    // Unknown budget
    }
    return budgetScores[budgetRange] || 20
  }

  private analyzeUrgency(urgency: string): number {
    const urgencyScores: { [key: string]: number } = {
      'emergency': 100,    // Emergency work
      'this_week': 85,     // Very urgent
      'this_month': 65,    // Good urgency
      'next_month': 45,    // Moderate urgency
      'next_quarter': 25,  // Low urgency
      'planning': 15       // Just browsing
    }
    return urgencyScores[urgency] || 30
  }

  private analyzeLocation(postcode: string): number {
    // Simplified distance calculation
    // In real implementation, use Google Maps Distance Matrix API
    const distance = this.calculateDistance(this.yourPostcode, postcode)
    
    if (distance <= 5) return 100      // Very close
    if (distance <= 15) return 80      // Close
    if (distance <= 30) return 60      // Moderate distance
    if (distance <= 50) return 40      // Far
    return 20                          // Very far
  }

  private analyzeQuality(jobData: LeadData): number {
    let qualityScore = 50 // Base score

    // Description quality
    if (jobData.description.length > 100) qualityScore += 20
    else if (jobData.description.length > 50) qualityScore += 10
    else if (jobData.description.length < 20) qualityScore -= 20

    // Photos provided
    if (jobData.photos.length > 2) qualityScore += 15
    else if (jobData.photos.length > 0) qualityScore += 10

    // Contact details completeness
    if (jobData.phone && jobData.email) qualityScore += 10
    
    // Professional description indicators
    const professionalKeywords = ['renovation', 'installation', 'replacement', 'upgrade', 'modern', 'quality']
    const keywordMatches = professionalKeywords.filter(keyword => 
      jobData.description.toLowerCase().includes(keyword)
    ).length
    qualityScore += keywordMatches * 5

    // Negative quality indicators
    const lowQualityWords = ['cheap', 'asap', 'quick fix', 'cash in hand', 'cash only']
    const negativeMatches = lowQualityWords.filter(word => 
      jobData.description.toLowerCase().includes(word)
    ).length
    qualityScore -= negativeMatches * 15

    return Math.max(0, Math.min(100, qualityScore))
  }

  private calculateDistance(postcode1: string, postcode2: string): number {
    // Simplified distance calculation
    // In production, integrate with Google Maps Distance Matrix API
    if (postcode1 === postcode2) return 0
    
    // Basic postcode area distance estimation
    const area1 = postcode1.substring(0, 2)
    const area2 = postcode2.substring(0, 2)
    
    if (area1 === area2) return Math.random() * 10 // Same area
    
    // London postcodes rough distance
    const londonAreas = ['SW', 'SE', 'NW', 'NE', 'N1', 'E1', 'EC', 'WC', 'W1', 'W2']
    if (londonAreas.includes(area1) && londonAreas.includes(area2)) {
      return 5 + Math.random() * 15 // Within London
    }
    
    return 20 + Math.random() * 30 // Different regions
  }

  private scoreToGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 85) return 'A'      // Excellent leads
    if (score >= 70) return 'B'      // Very good leads
    if (score >= 55) return 'C'      // Good leads
    if (score >= 40) return 'D'      // Poor leads
    return 'F'                       // Reject
  }

  private determinePriority(score: number, jobData: LeadData): 'HIGH' | 'MEDIUM' | 'LOW' | 'REJECT' {
    if (score >= 80) return 'HIGH'
    if (score >= 60) return 'MEDIUM'  
    if (score >= 40) return 'LOW'
    return 'REJECT'
  }

  private determineTierAndPrice(score: number, jobData: LeadData): { tier: 1 | 2 | 3 | 0, price: number } {
    const isYourSpecialty = this.yourSpecialties.includes(jobData.category)

    // Tier 1: YOUR COMPANY (Free for you, highest value leads)
    if (score >= 75 && isYourSpecialty) {
      return { tier: 1, price: 0 }
    }

    // Tier 2: PREMIUM PARTNERS (High-value leads)
    if (score >= 60) {
      const basePrice = score >= 80 ? 40 : score >= 70 ? 30 : 25
      return { tier: 2, price: basePrice }
    }

    // Tier 3: ALL CONTRACTORS (Standard leads)
    if (score >= 40) {
      const basePrice = score >= 55 ? 20 : 15
      return { tier: 3, price: basePrice }
    }

    // Tier 0: REJECT (Don't sell these)
    return { tier: 0, price: 0 }
  }

  private generateReasons(factors: ScoringFactors, jobData: LeadData): string[] {
    const reasons: string[] = []

    // Budget reasons
    if (factors.budget >= 80) reasons.push('💰 High value project')
    else if (factors.budget >= 50) reasons.push('💷 Good budget range')
    else if (factors.budget <= 25) reasons.push('⚠️ Limited budget')

    // Urgency reasons
    if (factors.urgency >= 80) reasons.push('🔥 Urgent timeline')
    else if (factors.urgency >= 50) reasons.push('📅 Good timing')
    else if (factors.urgency <= 25) reasons.push('⏰ Low urgency')

    // Location reasons
    if (factors.location >= 80) reasons.push('📍 Very close location')
    else if (factors.location >= 50) reasons.push('🚗 Reasonable distance')
    else if (factors.location <= 30) reasons.push('🛣️ Far location')

    // Quality reasons
    if (factors.quality >= 70) reasons.push('⭐ High quality enquiry')
    else if (factors.quality >= 50) reasons.push('✅ Standard enquiry')
    else reasons.push('⚠️ Poor quality details')

    // Specialty match
    if (this.yourSpecialties.includes(jobData.category)) {
      reasons.push('🎯 Matches your expertise')
    }

    return reasons
  }

  /**
   * Get all leads above minimum threshold, sorted by priority
   */
  getQualifiedLeads(leads: LeadData[], minScore = 40): Array<LeadData & { score: LeadScore }> {
    return leads
      .map(lead => ({ ...lead, score: this.scoreJob(lead) }))
      .filter(lead => lead.score.score >= minScore)
      .sort((a, b) => {
        // Sort by tier first (1 = highest priority for you)
        if (a.score.tier !== b.score.tier) {
          return a.score.tier - b.score.tier
        }
        // Then by score within tier
        return b.score.score - a.score.score
      })
  }

  /**
   * Calculate potential monthly revenue from leads
   */
  calculateRevenueProjection(leads: Array<LeadData & { score: LeadScore }>): {
    yourBusinessRevenue: number
    platformRevenue: number
    totalLeads: number
    yourLeads: number
    soldLeads: number
  } {
    const yourLeads = leads.filter(l => l.score.tier === 1)
    const soldLeads = leads.filter(l => l.score.tier >= 2)
    
    // Estimate your business revenue (conservative 25% win rate)
    const avgJobValue = this.estimateJobValue(yourLeads)
    const yourBusinessRevenue = yourLeads.length * avgJobValue * 0.25

    // Platform revenue from lead sales
    const platformRevenue = soldLeads.reduce((sum, lead) => sum + lead.score.price, 0)

    return {
      yourBusinessRevenue,
      platformRevenue,
      totalLeads: leads.length,
      yourLeads: yourLeads.length,
      soldLeads: soldLeads.length
    }
  }

  private estimateJobValue(leads: Array<LeadData & { score: LeadScore }>): number {
    // Estimate average job value based on budget ranges
    const budgetValues: { [key: string]: number } = {
      'under_1k': 750,
      '1k_5k': 3000,
      '5k_15k': 10000,
      '15k_50k': 30000,
      '50k_plus': 75000,
      'get_quotes': 8000 // Default estimate
    }

    if (leads.length === 0) return 8000

    const totalValue = leads.reduce((sum, lead) => {
      return sum + (budgetValues[lead.budget] || 8000)
    }, 0)

    return totalValue / leads.length
  }
}

// Export for use in the app
export const leadScorer = new LeadScoringEngine()