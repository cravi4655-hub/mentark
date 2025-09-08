import { NextRequest, NextResponse } from 'next/server'

// Enhanced psychology profile interface
interface EnhancedPsychologyProfile {
  profile: {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
    motivationType: 'intrinsic' | 'extrinsic' | 'mixed'
    riskTolerance: 'conservative' | 'moderate' | 'aggressive' | 'calculated'
    decisionStyle: 'analytical' | 'intuitive' | 'collaborative' | 'research-based'
    stressResponse: 'thrives' | 'processes' | 'calm' | 'overwhelmed'
    workStyle: 'structured' | 'flexible' | 'collaborative' | 'problem-solving'
    socialPreference: 'solo' | 'small-team' | 'large-group' | 'mixed'
    communicationStyle: 'direct' | 'detailed' | 'storytelling' | 'inquisitive'
    feedbackPreference: 'direct' | 'encouraging' | 'actionable' | 'ongoing'
    coreValues: 'growth' | 'family' | 'achievement' | 'impact'
    timeManagement: 'scheduled' | 'flexible' | 'prioritized' | 'burst'
    challengeApproach: 'analytical' | 'support-seeking' | 'break-taking' | 'determined'
    learningPace: 'deep' | 'fast' | 'mixed' | 'repetitive'
    motivationSources: 'progress' | 'accountability' | 'learning' | 'helping'
    successDefinition: 'personal' | 'recognition' | 'impact' | 'authentic'
  }
  insights: string
  roadmapPreferences: {
    preferredFormat: string
    supportLevel: string
    milestoneStyle: string
    challengeHandling: string
    learningResources: string
    motivationStrategy: string
    communicationApproach: string
    feedbackStyle: string
    progressTracking: string
    socialIntegration: string
  }
  behavioralPatterns: {
    optimalWorkTimes: string[]
    preferredContentTypes: string[]
    responseToPressure: string
    learningTriggers: string[]
    demotivationFactors: string[]
  }
}

export async function POST(request: NextRequest) {
  try {
    const { assessmentData } = await request.json()
    
    if (!assessmentData || !assessmentData.responses) {
      return NextResponse.json({ error: 'No assessment data provided' }, { status: 400 })
    }
    
    const profile = analyzeEnhancedResponses(assessmentData.responses)
    const insights = generateEnhancedInsights(profile)
    const roadmapPreferences = generateEnhancedRoadmapPreferences(profile)
    const behavioralPatterns = generateBehavioralPatterns(profile)
    
    const enhancedProfile: EnhancedPsychologyProfile = {
      profile,
      insights,
      roadmapPreferences,
      behavioralPatterns
    }
    
    return NextResponse.json(enhancedProfile)
  } catch (error) {
    console.error('Psychology analysis error:', error)
    return NextResponse.json({ error: 'Failed to analyze psychology profile' }, { status: 500 })
  }
}

// Enhanced analysis function
function analyzeEnhancedResponses(responses: Record<string, string>): EnhancedPsychologyProfile['profile'] {
  const profile: any = {}
  
  // Learning Style Analysis
  if (responses.learning_style) {
    const learningMap: Record<string, string> = {
      'See diagrams, charts, and visual examples': 'visual',
      'Listen to explanations and discussions': 'auditory',
      'Try it hands-on and practice': 'kinesthetic',
      'Read detailed instructions and take notes': 'reading'
    }
    profile.learningStyle = learningMap[responses.learning_style] || 'visual'
  }
  
  // Motivation Type Analysis
  if (responses.motivation_type) {
    const motivationMap: Record<string, string> = {
      'Personal satisfaction and growth': 'intrinsic',
      'Recognition and praise from others': 'extrinsic',
      'Financial rewards and security': 'extrinsic',
      'Helping others and making a difference': 'intrinsic'
    }
    profile.motivationType = motivationMap[responses.motivation_type] || 'mixed'
  }
  
  // Risk Tolerance Analysis
  if (responses.risk_tolerance) {
    const riskMap: Record<string, string> = {
      'Take calculated risks after thorough research': 'calculated',
      'Start small and gradually increase difficulty': 'moderate',
      'Jump in headfirst and learn as you go': 'aggressive',
      'Avoid risks and stick to proven methods': 'conservative'
    }
    profile.riskTolerance = riskMap[responses.risk_tolerance] || 'moderate'
  }
  
  // Decision Style Analysis
  if (responses.decision_style) {
    const decisionMap: Record<string, string> = {
      'Analyze all data and pros/cons carefully': 'analytical',
      'Trust your gut feeling and intuition': 'intuitive',
      'Discuss with others and seek consensus': 'collaborative',
      'Research extensively before deciding': 'research-based'
    }
    profile.decisionStyle = decisionMap[responses.decision_style] || 'analytical'
  }
  
  // Stress Response Analysis
  if (responses.stress_response) {
    const stressMap: Record<string, string> = {
      'Thrive and perform at your best': 'thrives',
      'Need time to process before acting': 'processes',
      'Prefer a calm, structured environment': 'calm',
      'Get overwhelmed and need support': 'overwhelmed'
    }
    profile.stressResponse = stressMap[responses.stress_response] || 'processes'
  }
  
  // Work Style Analysis
  if (responses.work_style) {
    const workMap: Record<string, string> = {
      'You have clear deadlines and structure': 'structured',
      'You can work at your own pace': 'flexible',
      'You\'re collaborating with others': 'collaborative',
      'You\'re solving complex problems': 'problem-solving'
    }
    profile.workStyle = workMap[responses.work_style] || 'flexible'
  }
  
  // Social Preference Analysis
  if (responses.social_preference) {
    const socialMap: Record<string, string> = {
      'Alone, with complete focus': 'solo',
      'In small teams with close collaboration': 'small-team',
      'In large groups with diverse perspectives': 'large-group',
      'With a mix of solo and team work': 'mixed'
    }
    profile.socialPreference = socialMap[responses.social_preference] || 'mixed'
  }
  
  // Communication Style Analysis
  if (responses.communication_style) {
    const commMap: Record<string, string> = {
      'Be direct and to the point': 'direct',
      'Explain things in detail with examples': 'detailed',
      'Use stories and analogies': 'storytelling',
      'Ask questions and listen actively': 'inquisitive'
    }
    profile.communicationStyle = commMap[responses.communication_style] || 'direct'
  }
  
  // Feedback Preference Analysis
  if (responses.feedback_preference) {
    const feedbackMap: Record<string, string> = {
      'Direct and honest, even if harsh': 'direct',
      'Constructive and encouraging': 'encouraging',
      'Specific and actionable': 'actionable',
      'Regular and ongoing': 'ongoing'
    }
    profile.feedbackPreference = feedbackMap[responses.feedback_preference] || 'encouraging'
  }
  
  // Core Values Analysis
  if (responses.core_values) {
    const valuesMap: Record<string, string> = {
      'Personal growth and self-improvement': 'growth',
      'Family and relationships': 'family',
      'Career success and achievement': 'achievement',
      'Making a positive impact on others': 'impact'
    }
    profile.coreValues = valuesMap[responses.core_values] || 'growth'
  }
  
  // Time Management Analysis
  if (responses.time_management) {
    const timeMap: Record<string, string> = {
      'Creating detailed schedules and lists': 'scheduled',
      'Going with the flow and being flexible': 'flexible',
      'Setting priorities and focusing on what\'s important': 'prioritized',
      'Working in bursts of high energy': 'burst'
    }
    profile.timeManagement = timeMap[responses.time_management] || 'flexible'
  }
  
  // Challenge Approach Analysis
  if (responses.challenge_approach) {
    const challengeMap: Record<string, string> = {
      'Analyze the problem and find solutions': 'analytical',
      'Ask for help and support': 'support-seeking',
      'Take a break and come back later': 'break-taking',
      'Push through with determination': 'determined'
    }
    profile.challengeApproach = challengeMap[responses.challenge_approach] || 'analytical'
  }
  
  // Learning Pace Analysis
  if (responses.learning_pace) {
    const paceMap: Record<string, string> = {
      'Take your time to understand deeply': 'deep',
      'Move quickly through material': 'fast',
      'Have a mix of fast and slow learning': 'mixed',
      'Can revisit and review multiple times': 'repetitive'
    }
    profile.learningPace = paceMap[responses.learning_pace] || 'mixed'
  }
  
  // Motivation Sources Analysis
  if (responses.motivation_sources) {
    const sourcesMap: Record<string, string> = {
      'Seeing progress and results': 'progress',
      'Having accountability partners': 'accountability',
      'Learning new things constantly': 'learning',
      'Helping others succeed': 'helping'
    }
    profile.motivationSources = sourcesMap[responses.motivation_sources] || 'progress'
  }
  
  // Success Definition Analysis
  if (responses.success_definition) {
    const successMap: Record<string, string> = {
      'Achieving your personal goals': 'personal',
      'Being recognized by others': 'recognition',
      'Making a difference in the world': 'impact',
      'Living authentically and happily': 'authentic'
    }
    profile.successDefinition = successMap[responses.success_definition] || 'personal'
  }
  
  return profile
}

// Enhanced roadmap preferences generation
function generateEnhancedRoadmapPreferences(profile: EnhancedPsychologyProfile['profile']) {
  return {
    preferredFormat: profile.learningStyle === 'visual' ? 'Visual charts and progress bars' : 
                   profile.learningStyle === 'auditory' ? 'Audio explanations and discussions' :
                   profile.learningStyle === 'kinesthetic' ? 'Hands-on exercises and projects' : 'Detailed written guides',
    
    supportLevel: profile.socialPreference === 'solo' ? 'Minimal guidance, self-directed' :
                 profile.socialPreference === 'small-team' ? 'Small group support and collaboration' :
                 profile.socialPreference === 'large-group' ? 'Community support and peer learning' : 'Mixed approach',
    
    milestoneStyle: profile.workStyle === 'structured' ? 'Clear deadlines and structured phases' :
                   profile.workStyle === 'flexible' ? 'Flexible timeline with adaptable milestones' :
                   profile.workStyle === 'collaborative' ? 'Team-based milestones and checkpoints' : 'Problem-solving focused milestones',
    
    challengeHandling: profile.challengeApproach === 'analytical' ? 'Detailed problem analysis and solutions' :
                      profile.challengeApproach === 'support-seeking' ? 'Community support and mentorship' :
                      profile.challengeApproach === 'break-taking' ? 'Gentle pacing with breaks' : 'Determined push-through approach',
    
    learningResources: profile.learningStyle === 'visual' ? 'Infographics, videos, and visual guides' :
                      profile.learningStyle === 'auditory' ? 'Podcasts, audio courses, and discussions' :
                      profile.learningStyle === 'kinesthetic' ? 'Hands-on projects and interactive exercises' : 'Comprehensive written materials',
    
    motivationStrategy: profile.motivationType === 'intrinsic' ? 'Focus on personal growth and satisfaction' :
                      profile.motivationType === 'extrinsic' ? 'External rewards and recognition' : 'Mixed intrinsic and extrinsic motivation',
    
    communicationApproach: profile.communicationStyle === 'direct' ? 'Straightforward, no-nonsense communication' :
                          profile.communicationStyle === 'detailed' ? 'Comprehensive explanations with examples' :
                          profile.communicationStyle === 'storytelling' ? 'Stories and analogies to illustrate points' : 'Interactive questioning and listening',
    
    feedbackStyle: profile.feedbackPreference === 'direct' ? 'Honest, direct feedback' :
                  profile.feedbackPreference === 'encouraging' ? 'Constructive and supportive feedback' :
                  profile.feedbackPreference === 'actionable' ? 'Specific, actionable feedback' : 'Regular, ongoing feedback',
    
    progressTracking: profile.workStyle === 'structured' ? 'Detailed metrics and KPIs' :
                    profile.workStyle === 'flexible' ? 'Flexible progress indicators' :
                    profile.workStyle === 'collaborative' ? 'Team progress and peer comparisons' : 'Problem-solving milestones',
    
    socialIntegration: profile.socialPreference === 'solo' ? 'Minimal social features' :
                      profile.socialPreference === 'small-team' ? 'Small group features and collaboration' :
                      profile.socialPreference === 'large-group' ? 'Community features and social learning' : 'Mixed social and solo features'
  }
}

// Enhanced behavioral patterns analysis
function generateBehavioralPatterns(profile: EnhancedPsychologyProfile['profile']) {
  return {
    optimalWorkTimes: profile.workStyle === 'structured' ? ['Morning', 'Afternoon'] :
                     profile.workStyle === 'flexible' ? ['Any time'] :
                     profile.workStyle === 'collaborative' ? ['Morning', 'Afternoon'] : ['Morning', 'Evening'],
    
    preferredContentTypes: profile.learningStyle === 'visual' ? ['Infographics', 'Videos', 'Charts'] :
                          profile.learningStyle === 'auditory' ? ['Podcasts', 'Audio', 'Discussions'] :
                          profile.learningStyle === 'kinesthetic' ? ['Projects', 'Exercises', 'Hands-on'] : ['Articles', 'Guides', 'Text'],
    
    responseToPressure: profile.stressResponse === 'thrives' ? 'Performs better under pressure' :
                       profile.stressResponse === 'processes' ? 'Needs time to process under pressure' :
                       profile.stressResponse === 'calm' ? 'Prefers calm, low-pressure environment' : 'Gets overwhelmed, needs support',
    
    learningTriggers: profile.motivationSources === 'progress' ? ['Visible progress', 'Milestones', 'Achievements'] :
                     profile.motivationSources === 'accountability' ? ['Deadlines', 'Check-ins', 'Peer pressure'] :
                     profile.motivationSources === 'learning' ? ['New information', 'Challenges', 'Discovery'] : ['Helping others', 'Teaching', 'Mentoring'],
    
    demotivationFactors: profile.stressResponse === 'overwhelmed' ? ['Too much pressure', 'Unclear expectations', 'Lack of support'] :
                        profile.stressResponse === 'calm' ? ['High stress', 'Tight deadlines', 'Chaos'] :
                        profile.stressResponse === 'processes' ? ['Rushed decisions', 'No time to think', 'Immediate pressure'] : ['Boredom', 'Lack of challenge', 'Repetition']
  }
}

function generateEnhancedInsights(profile: EnhancedPsychologyProfile['profile']): string {
  const insights = []
  
  // Learning style insights
  if (profile.learningStyle === 'visual') {
    insights.push("You're a visual learner who benefits from diagrams, charts, and visual representations.")
  } else if (profile.learningStyle === 'auditory') {
    insights.push("You're an auditory learner who learns best through listening and discussions.")
  } else if (profile.learningStyle === 'kinesthetic') {
    insights.push("You're a hands-on learner who needs to practice and experience things directly.")
  } else {
    insights.push("You're a reading/writing learner who prefers detailed written materials.")
  }
  
  // Motivation insights
  if (profile.motivationType === 'intrinsic') {
    insights.push("You're internally motivated by personal growth and satisfaction.")
  } else if (profile.motivationType === 'extrinsic') {
    insights.push("You're externally motivated by rewards, recognition, and external validation.")
  } else {
    insights.push("You're motivated by a combination of internal and external factors.")
  }
  
  // Risk tolerance insights
  if (profile.riskTolerance === 'conservative') {
    insights.push("You prefer safe, proven approaches and avoid unnecessary risks.")
  } else if (profile.riskTolerance === 'aggressive') {
    insights.push("You're comfortable taking risks and jumping into new challenges.")
  } else if (profile.riskTolerance === 'calculated') {
    insights.push("You take calculated risks after thorough research and analysis.")
  } else {
    insights.push("You prefer moderate risks with gradual increases in difficulty.")
  }
  
  // Decision making insights
  if (profile.decisionStyle === 'analytical') {
    insights.push("You make decisions through careful analysis of data and pros/cons.")
  } else if (profile.decisionStyle === 'intuitive') {
    insights.push("You trust your gut feelings and intuition when making decisions.")
  } else if (profile.decisionStyle === 'collaborative') {
    insights.push("You prefer to make decisions through discussion and consensus.")
  } else {
    insights.push("You make decisions through extensive research and information gathering.")
  }
  
  // Stress response insights
  if (profile.stressResponse === 'thrives') {
    insights.push("You perform at your best under pressure and thrive in challenging situations.")
  } else if (profile.stressResponse === 'processes') {
    insights.push("You need time to process information before acting under pressure.")
  } else if (profile.stressResponse === 'calm') {
    insights.push("You prefer calm, structured environments and perform best without pressure.")
  } else {
    insights.push("You can get overwhelmed under pressure and benefit from support and guidance.")
  }
  
  // Social preference insights
  if (profile.socialPreference === 'solo') {
    insights.push("You work most effectively alone with complete focus and minimal distractions.")
  } else if (profile.socialPreference === 'small-team') {
    insights.push("You thrive in small, close-knit teams with collaborative work.")
  } else if (profile.socialPreference === 'large-group') {
    insights.push("You enjoy working in large groups with diverse perspectives and ideas.")
  } else {
    insights.push("You work well in a mix of solo and team environments.")
  }
  
  return insights.join(' ')
}
