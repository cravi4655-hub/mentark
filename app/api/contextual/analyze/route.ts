import { NextRequest, NextResponse } from 'next/server'

interface ContextualIntelligence {
  // Life Phase Analysis
  lifePhase: 'student' | 'early_career' | 'mid_career' | 'late_career' | 'transition' | 'retirement'
  lifePhaseConfidence: number
  
  // Resource Assessment
  availableTime: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high'
  financialCapacity: 'limited' | 'moderate' | 'comfortable' | 'abundant'
  supportLevel: 'minimal' | 'moderate' | 'strong' | 'excellent'
  energyLevel: 'low' | 'moderate' | 'high' | 'very_high'
  
  // Environmental Factors
  locationType: 'urban' | 'suburban' | 'rural' | 'remote'
  culturalContext: 'traditional' | 'modern' | 'mixed' | 'progressive'
  socialEnvironment: 'supportive' | 'neutral' | 'challenging' | 'isolated'
  
  // Personal Constraints
  timeConstraints: string[]
  financialConstraints: string[]
  socialConstraints: string[]
  skillConstraints: string[]
  
  // Opportunities
  localOpportunities: string[]
  onlineOpportunities: string[]
  networkingPotential: 'low' | 'moderate' | 'high' | 'excellent'
  
  // Recommendations
  optimalGoalTypes: string[]
  recommendedApproach: string
  potentialChallenges: string[]
  successFactors: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { questionnaireData, psychologyProfile } = await request.json()
    
    if (!questionnaireData) {
      return NextResponse.json({ error: 'Questionnaire data required' }, { status: 400 })
    }

    const contextualIntelligence = analyzeContextualIntelligence(questionnaireData, psychologyProfile)
    
    return NextResponse.json({
      contextualIntelligence,
      insights: generateContextualInsights(contextualIntelligence),
      recommendations: generateContextualRecommendations(contextualIntelligence)
    })
  } catch (error) {
    console.error('Contextual intelligence analysis error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}

function analyzeContextualIntelligence(questionnaireData: any, psychologyProfile: any): ContextualIntelligence {
  const responses = questionnaireData.responses || {}
  const userType = questionnaireData.userType || 'professional'
  
  // Life Phase Analysis
  const lifePhase = determineLifePhase(responses, userType)
  
  // Resource Assessment
  const availableTime = assessAvailableTime(responses)
  const financialCapacity = assessFinancialCapacity(responses)
  const supportLevel = assessSupportLevel(responses)
  const energyLevel = assessEnergyLevel(responses, psychologyProfile)
  
  // Environmental Factors
  const locationType = determineLocationType(responses)
  const culturalContext = determineCulturalContext(responses)
  const socialEnvironment = assessSocialEnvironment(responses)
  
  // Personal Constraints
  const timeConstraints = identifyTimeConstraints(responses)
  const financialConstraints = identifyFinancialConstraints(responses)
  const socialConstraints = identifySocialConstraints(responses)
  const skillConstraints = identifySkillConstraints(responses)
  
  // Opportunities
  const localOpportunities = identifyLocalOpportunities(responses, locationType)
  const onlineOpportunities = identifyOnlineOpportunities(responses)
  const networkingPotential = assessNetworkingPotential(responses, socialEnvironment)
  
  // Recommendations
  const optimalGoalTypes = determineOptimalGoalTypes(responses, psychologyProfile, lifePhase)

  // Create the full contextualIntelligence object first
  const contextualIntelligence: ContextualIntelligence = {
    lifePhase,
    lifePhaseConfidence: 0.85,
    availableTime,
    financialCapacity,
    supportLevel,
    energyLevel,
    locationType,
    culturalContext,
    socialEnvironment,
    timeConstraints,
    financialConstraints,
    socialConstraints,
    skillConstraints,
    localOpportunities,
    onlineOpportunities,
    networkingPotential,
    optimalGoalTypes: optimalGoalTypes, // Use the calculated value directly
    recommendedApproach: '', // Will be set below
    potentialChallenges: [], // Will be set below
    successFactors: [] // Will be set below
  }

  const recommendedApproach = determineRecommendedApproach(responses, psychologyProfile, contextualIntelligence)
  const potentialChallenges = identifyPotentialChallenges(responses, psychologyProfile, contextualIntelligence)
  const successFactors = identifySuccessFactors(responses, psychologyProfile, contextualIntelligence)

  // Update the object with calculated values
  contextualIntelligence.optimalGoalTypes = optimalGoalTypes
  contextualIntelligence.recommendedApproach = recommendedApproach
  contextualIntelligence.potentialChallenges = potentialChallenges
  contextualIntelligence.successFactors = successFactors
  
  return contextualIntelligence
}

function determineLifePhase(responses: any, userType: string): ContextualIntelligence['lifePhase'] {
  if (userType === 'student') {
    const classLevel = responses.class
    if (['7th', '8th', '9th'].includes(classLevel)) return 'student'
    if (['10th', '11th', '12th'].includes(classLevel)) return 'student'
    return 'student'
  }
  
  const age = parseInt(responses.age) || 25
  const experience = responses.years_experience || 0
  
  if (age < 25 || experience < 2) return 'early_career'
  if (age < 40 && experience < 10) return 'mid_career'
  if (age < 55) return 'late_career'
  return 'transition'
}

function assessAvailableTime(responses: any): ContextualIntelligence['availableTime'] {
  const workHours = responses.work_hours_per_week || 40
  const familyTime = responses.family_commitments || 'moderate'
  const hobbies = responses.hobbies_time || 'moderate'
  
  if (workHours > 50 || familyTime === 'high') return 'very_low'
  if (workHours > 40 || familyTime === 'moderate') return 'low'
  if (workHours < 35 && familyTime === 'low') return 'high'
  return 'moderate'
}

function assessFinancialCapacity(responses: any): ContextualIntelligence['financialCapacity'] {
  const income = responses.income_level || 'moderate'
  const savings = responses.savings || 'moderate'
  const debt = responses.debt_level || 'moderate'
  
  if (income === 'high' && savings === 'high' && debt === 'low') return 'abundant'
  if (income === 'high' || (savings === 'high' && debt === 'low')) return 'comfortable'
  if (income === 'low' || debt === 'high') return 'limited'
  return 'moderate'
}

function assessSupportLevel(responses: any): ContextualIntelligence['supportLevel'] {
  const familySupport = responses.family_support || 'moderate'
  const friendSupport = responses.friend_support || 'moderate'
  const mentorSupport = responses.mentor_available || false
  
  if (familySupport === 'high' && friendSupport === 'high' && mentorSupport) return 'excellent'
  if ((familySupport === 'high' || friendSupport === 'high') && mentorSupport) return 'strong'
  if (familySupport === 'moderate' && friendSupport === 'moderate') return 'moderate'
  return 'minimal'
}

function assessEnergyLevel(responses: any, psychologyProfile: any): ContextualIntelligence['energyLevel'] {
  const motivation = responses.motivation_level || 'moderate'
  const stress = responses.stress_level || 'moderate'
  const health = responses.health_status || 'good'
  const personality = psychologyProfile?.personalityType || 'balanced'
  
  if (motivation === 'high' && stress === 'low' && health === 'excellent') return 'very_high'
  if (motivation === 'high' && stress === 'moderate' && health === 'good') return 'high'
  if (motivation === 'moderate' && stress === 'moderate') return 'moderate'
  return 'low'
}

function determineLocationType(responses: any): ContextualIntelligence['locationType'] {
  const location = responses.location || 'city'
  if (location === 'City') return 'urban'
  if (location === 'Town') return 'suburban'
  if (location === 'Village') return 'rural'
  return 'urban'
}

function determineCulturalContext(responses: any): ContextualIntelligence['culturalContext'] {
  const values = responses.core_values || 'mixed'
  const traditions = responses.traditional_values || 'moderate'
  
  if (values === 'traditional' && traditions === 'high') return 'traditional'
  if (values === 'modern' && traditions === 'low') return 'modern'
  if (values === 'progressive') return 'progressive'
  return 'mixed'
}

function assessSocialEnvironment(responses: any): ContextualIntelligence['socialEnvironment'] {
  const familySupport = responses.family_support || 'moderate'
  const peerSupport = responses.peer_support || 'moderate'
  const communitySupport = responses.community_support || 'moderate'
  
  if (familySupport === 'high' && peerSupport === 'high' && communitySupport === 'high') return 'supportive'
  if (familySupport === 'low' && peerSupport === 'low' && communitySupport === 'low') return 'isolated'
  if (familySupport === 'low' || peerSupport === 'low') return 'challenging'
  return 'neutral'
}

function identifyTimeConstraints(responses: any): string[] {
  const constraints = []
  
  if (responses.work_hours_per_week > 45) constraints.push('High work hours')
  if (responses.family_commitments === 'high') constraints.push('Family responsibilities')
  if (responses.health_issues) constraints.push('Health limitations')
  if (responses.commute_time > 60) constraints.push('Long commute')
  
  return constraints
}

function identifyFinancialConstraints(responses: any): string[] {
  const constraints = []
  
  if (responses.income_level === 'low') constraints.push('Limited income')
  if (responses.debt_level === 'high') constraints.push('High debt burden')
  if (responses.financial_obligations === 'high') constraints.push('Financial obligations')
  if (responses.savings === 'low') constraints.push('Limited savings')
  
  return constraints
}

function identifySocialConstraints(responses: any): string[] {
  const constraints = []
  
  if (responses.family_support === 'low') constraints.push('Limited family support')
  if (responses.peer_support === 'low') constraints.push('Limited peer support')
  if (responses.social_anxiety) constraints.push('Social anxiety')
  if (responses.cultural_barriers) constraints.push('Cultural barriers')
  
  return constraints
}

function identifySkillConstraints(responses: any): string[] {
  const constraints = []
  
  if (responses.technical_skills === 'low') constraints.push('Limited technical skills')
  if (responses.communication_skills === 'low') constraints.push('Communication challenges')
  if (responses.leadership_experience === 'none') constraints.push('No leadership experience')
  if (responses.education_level === 'low') constraints.push('Limited education')
  
  return constraints
}

function identifyLocalOpportunities(responses: any, locationType: string): string[] {
  const opportunities = []
  
  if (locationType === 'urban') {
    opportunities.push('Networking events', 'Professional meetups', 'Industry conferences')
  } else if (locationType === 'suburban') {
    opportunities.push('Local business groups', 'Community events', 'Online networking')
  } else {
    opportunities.push('Online communities', 'Virtual events', 'Remote opportunities')
  }
  
  return opportunities
}

function identifyOnlineOpportunities(responses: any): string[] {
  return [
    'Online courses and certifications',
    'Virtual mentorship programs',
    'Remote work opportunities',
    'Digital networking platforms',
    'Online communities and forums'
  ]
}

function assessNetworkingPotential(responses: any, socialEnvironment: string): ContextualIntelligence['networkingPotential'] {
  if (socialEnvironment === 'supportive') return 'excellent'
  if (socialEnvironment === 'neutral') return 'high'
  if (socialEnvironment === 'challenging') return 'moderate'
  return 'low'
}

function determineOptimalGoalTypes(responses: any, psychologyProfile: any, lifePhase: string): string[] {
  const goalTypes = []
  
  // Based on life phase
  if (lifePhase === 'student') {
    goalTypes.push('learning', 'personal', 'career')
  } else if (lifePhase === 'early_career') {
    goalTypes.push('career', 'learning', 'finance')
  } else if (lifePhase === 'mid_career') {
    goalTypes.push('career', 'finance', 'health', 'relationships')
  } else {
    goalTypes.push('personal', 'health', 'relationships')
  }
  
  // Based on psychology profile
  if (psychologyProfile?.personalityType === 'analytical') {
    goalTypes.push('learning', 'career')
  } else if (psychologyProfile?.personalityType === 'creative') {
    goalTypes.push('personal', 'learning')
  }
  
  return Array.from(new Set(goalTypes))
}

function determineRecommendedApproach(responses: any, psychologyProfile: any, contextualIntelligence: ContextualIntelligence): string {
  const { availableTime, supportLevel, energyLevel } = contextualIntelligence
  
  if (availableTime === 'very_low' && supportLevel === 'minimal') {
    return 'Micro-learning approach with self-paced modules and minimal external dependencies'
  } else if (availableTime === 'high' && supportLevel === 'excellent') {
    return 'Comprehensive approach with mentorship, community engagement, and structured milestones'
  } else if (energyLevel === 'low') {
    return 'Gentle, sustainable approach with regular breaks and motivation support'
  } else {
    return 'Balanced approach with flexible scheduling and adaptive support'
  }
}

function identifyPotentialChallenges(responses: any, psychologyProfile: any, contextualIntelligence: ContextualIntelligence): string[] {
  const challenges = []
  
  if (contextualIntelligence.availableTime === 'very_low') {
    challenges.push('Time management and prioritization')
  }
  if (contextualIntelligence.financialCapacity === 'limited') {
    challenges.push('Resource constraints and budget management')
  }
  if (contextualIntelligence.supportLevel === 'minimal') {
    challenges.push('Lack of external support and accountability')
  }
  if (psychologyProfile?.stressResponse === 'overwhelmed') {
    challenges.push('Stress management and overwhelm prevention')
  }
  
  return challenges
}

function identifySuccessFactors(responses: any, psychologyProfile: any, contextualIntelligence: ContextualIntelligence): string[] {
  const factors = []
  
  if (contextualIntelligence.energyLevel === 'very_high') {
    factors.push('High energy and motivation')
  }
  if (contextualIntelligence.supportLevel === 'excellent') {
    factors.push('Strong support system')
  }
  if (psychologyProfile?.learningStyle === 'visual') {
    factors.push('Visual learning preferences')
  }
  if (contextualIntelligence.networkingPotential === 'excellent') {
    factors.push('Strong networking opportunities')
  }
  
  return factors
}

function generateContextualInsights(contextualIntelligence: ContextualIntelligence): string {
  const { lifePhase, availableTime, financialCapacity, supportLevel, energyLevel } = contextualIntelligence
  
  return `Based on your profile, you're in the ${lifePhase} phase with ${availableTime} available time, ${financialCapacity} financial capacity, and ${supportLevel} support level. Your energy level is ${energyLevel}, which suggests you'll benefit from a ${contextualIntelligence.recommendedApproach.toLowerCase()}.`
}

function generateContextualRecommendations(contextualIntelligence: ContextualIntelligence): string[] {
  const recommendations = []
  
  if (contextualIntelligence.availableTime === 'very_low') {
    recommendations.push('Focus on micro-learning and bite-sized goals')
    recommendations.push('Use time-blocking techniques for maximum efficiency')
  }
  
  if (contextualIntelligence.financialCapacity === 'limited') {
    recommendations.push('Prioritize free and low-cost resources')
    recommendations.push('Look for scholarships, grants, or employer support')
  }
  
  if (contextualIntelligence.supportLevel === 'minimal') {
    recommendations.push('Join online communities for peer support')
    recommendations.push('Consider finding a mentor or accountability partner')
  }
  
  return recommendations
}
