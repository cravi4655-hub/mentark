import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [], personalProfile, psychologyProfile, mentorName, activeCategory = 'general' } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 })
    }

    // Analyze the message and select appropriate AI models
    const analysis = analyzeMessage(message, conversationHistory, personalProfile, psychologyProfile, activeCategory)
    
    // Generate responses from different AI models
    const responses = await generateMultiModelResponse(message, analysis, personalProfile, psychologyProfile, mentorName, activeCategory)
    
    // Combine responses intelligently
    const finalResponse = await combineResponses(responses, analysis, personalProfile, psychologyProfile)
    
    return NextResponse.json({ 
      response: finalResponse.text,
      modelsUsed: finalResponse.modelsUsed,
      personality: finalResponse.personality,
      analysis: analysis
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}

function analyzeMessage(message: string, conversationHistory: any[], personalProfile: any, psychologyProfile: any, activeCategory: string) {
  const analysis = {
    category: activeCategory,
    urgency: 'normal',
    complexity: 'medium',
    emotionalTone: 'neutral',
    requiresResearch: false,
    preferredModels: ['chatgpt'],
    context: {
      hasPsychologyProfile: !!psychologyProfile,
      hasPersonalProfile: !!personalProfile,
      conversationLength: conversationHistory.length,
      lastMessage: conversationHistory[conversationHistory.length - 1]?.text || ''
    }
  }

  // Category-based model selection
  const categoryModels = {
    career: ['claude', 'chatgpt'],
    finance: ['claude', 'gemini'],
    health: ['chatgpt', 'gemini'],
    relationships: ['chatgpt', 'claude'],
    learning: ['gemini', 'chatgpt'],
    personal: ['chatgpt', 'claude']
  }
  
  analysis.preferredModels = categoryModels[activeCategory as keyof typeof categoryModels] || ['chatgpt']

  // Adjust based on psychology profile
  if (psychologyProfile) {
    if (psychologyProfile.profile?.learningStyle === 'visual') {
      analysis.preferredModels = ['gemini', ...analysis.preferredModels]
    }
    if (psychologyProfile.profile?.communicationStyle === 'storytelling') {
      analysis.preferredModels = ['chatgpt', ...analysis.preferredModels]
    }
    if (psychologyProfile.profile?.decisionStyle === 'analytical') {
      analysis.preferredModels = ['claude', ...analysis.preferredModels]
    }
  }

  // Check for urgency indicators
  if (message.toLowerCase().includes('urgent') || message.toLowerCase().includes('asap') || message.toLowerCase().includes('immediately')) {
    analysis.urgency = 'high'
  }

  // Check for emotional indicators
  if (message.toLowerCase().includes('stressed') || message.toLowerCase().includes('worried') || message.toLowerCase().includes('anxious')) {
    analysis.emotionalTone = 'stressed'
    analysis.preferredModels = ['chatgpt'] // ChatGPT is better for emotional support
  } else if (message.toLowerCase().includes('excited') || message.toLowerCase().includes('happy') || message.toLowerCase().includes('great')) {
    analysis.emotionalTone = 'positive'
  }

  // Check if research is needed
  if (message.toLowerCase().includes('current') || message.toLowerCase().includes('latest') || message.toLowerCase().includes('recent')) {
    analysis.requiresResearch = true
    analysis.preferredModels = ['perplexity', ...analysis.preferredModels]
  }

  return analysis
}

async function generateMultiModelResponse(message: string, analysis: any, personalProfile: any, psychologyProfile: any, mentorName: string, activeCategory: string) {
  const responses = []
  
  // Create context-aware prompt
  const contextPrompt = createContextPrompt(message, personalProfile, psychologyProfile, mentorName, activeCategory)
  
  // Generate responses from different models based on analysis
  for (const model of analysis.preferredModels.slice(0, 2)) { // Limit to 2 models for efficiency
    try {
      const response = await callAIModel(model, contextPrompt, analysis)
      if (response) {
      responses.push({
          model,
          response: response,
          quality: getModelQuality(model, analysis)
        })
      }
    } catch (error) {
      console.error(`Error calling ${model}:`, error)
    }
  }
  
  return responses
}

function createContextPrompt(message: string, personalProfile: any, psychologyProfile: any, mentorName: string, activeCategory: string) {
  const categoryMentors = {
    career: 'Career Coach',
    finance: 'Financial Advisor', 
    health: 'Wellness Coach',
    relationships: 'Relationship Expert',
    learning: 'Learning Specialist',
    personal: 'Life Coach'
  }
  
  let prompt = `You are ${mentorName}, a ${categoryMentors[activeCategory as keyof typeof categoryMentors] || 'AI mentor'} specializing in ${activeCategory} development. `
  
  // Add psychology profile context
  if (psychologyProfile) {
    prompt += `\n\nUser's Psychology Profile:
    - Learning Style: ${psychologyProfile.profile?.learningStyle || 'unknown'}
    - Motivation Type: ${psychologyProfile.profile?.motivationType || 'unknown'}
    - Risk Tolerance: ${psychologyProfile.profile?.riskTolerance || 'unknown'}
    - Communication Style: ${psychologyProfile.profile?.communicationStyle || 'unknown'}
    - Decision Style: ${psychologyProfile.profile?.decisionStyle || 'unknown'}
    - Stress Response: ${psychologyProfile.profile?.stressResponse || 'unknown'}
    - Core Values: ${psychologyProfile.profile?.coreValues || 'unknown'}
    `
    
    if (psychologyProfile.insights) {
      prompt += `\nKey Insights: ${psychologyProfile.insights}\n`
    }
  }
  
  // Add personal profile context
  if (personalProfile) {
    prompt += `\n\nUser's Personal Context:
    - Age: ${personalProfile.age || 'not specified'}
    - Location: ${personalProfile.location || 'not specified'}
    - Cultural Background: ${personalProfile.culturalBackground || 'not specified'}
    - Life Stage: ${personalProfile.lifeStage || 'not specified'}
    - Short-term Goals: ${personalProfile.shortTermGoals || 'not specified'}
    - Long-term Goals: ${personalProfile.longTermGoals || 'not specified'}
    - Biggest Challenges: ${personalProfile.biggestChallenges || 'not specified'}
    - Biggest Strengths: ${personalProfile.biggestStrengths || 'not specified'}
    `
  }
  
  prompt += `\n\nUser's message: "${message}"\n\nRespond as their personalized ${activeCategory} mentor, taking into account their psychology profile and personal context. Be helpful, encouraging, and specific to their situation.`
  
  return prompt
}

async function callAIModel(model: string, prompt: string, analysis: any) {
  const modelConfigs = {
    chatgpt: {
      model: 'gpt-4o',
      temperature: 0.7,
      maxTokens: 200
    },
    claude: {
      model: 'claude-3-5-sonnet-20241022',
      temperature: 0.7,
      maxTokens: 200
    },
    gemini: {
      model: 'gemini-pro',
      temperature: 0.7,
      maxTokens: 200
    },
    perplexity: {
      model: 'llama-3.1-sonar-small-128k-online',
      temperature: 0.7,
      maxTokens: 200
    }
  }
  
  const config = modelConfigs[model as keyof typeof modelConfigs]
  if (!config) return null
  
  // Simulate API call - replace with actual API calls
  return `This is a simulated response from ${model} for ${analysis.category} category. In production, this would call the actual ${model} API with the prompt: "${prompt.substring(0, 100)}..."`
}

function getModelQuality(model: string, analysis: any): number {
  const baseQuality = {
    chatgpt: 0.9,
    claude: 0.85,
    gemini: 0.8,
    perplexity: 0.75
  }
  
  let quality = baseQuality[model as keyof typeof baseQuality] || 0.5
  
  // Adjust quality based on analysis
  if (analysis.category === 'career' && model === 'claude') quality += 0.1
  if (analysis.category === 'finance' && model === 'gemini') quality += 0.1
  if (analysis.emotionalTone === 'stressed' && model === 'chatgpt') quality += 0.1
  if (analysis.requiresResearch && model === 'perplexity') quality += 0.1
  
  return Math.min(quality, 1.0)
}

async function combineResponses(responses: any[], analysis: any, personalProfile: any, psychologyProfile: any) {
  if (responses.length === 0) {
    return {
      text: "I'm sorry, I'm having trouble responding right now. Please try again.",
      modelsUsed: ['error'],
      personality: 'friend'
    }
  }
  
  // Sort responses by quality
  responses.sort((a, b) => b.quality - a.quality)
  
  // Use the best response
  const bestResponse = responses[0]
  
  // Determine personality based on psychology profile
  let personality = 'friend'
  if (psychologyProfile?.profile?.communicationStyle === 'direct') {
    personality = 'direct'
  } else if (psychologyProfile?.profile?.communicationStyle === 'storytelling') {
    personality = 'storyteller'
  } else if (psychologyProfile?.profile?.communicationStyle === 'inquisitive') {
    personality = 'curious'
  }
  
  return {
    text: bestResponse.response,
    modelsUsed: responses.map(r => r.model),
    personality: personality
  }
}