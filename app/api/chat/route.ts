import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, category, timeframe, isCreatingArk } = await request.json()
    
    if (isCreatingArk && category) {
      const analysis = analyzeGoalFromConversation(conversationHistory, category, timeframe)
      
      if (analysis.isComplete) {
        // Extract goal data and create roadmap immediately
        const goalData = extractGoalData(conversationHistory, conversationHistory[conversationHistory.length - 1]?.text || '', category, timeframe)
        
        return NextResponse.json({
          response: `Excellent! I have everything I need to create your personalized ${category} roadmap. Let me generate your detailed learning plan now...`,
          chatCompleted: true,
          goalData: goalData
        })
      } else {
        // Ask only for missing information
        const followUp = generateFollowUpQuestion(analysis.missingInfo, category, conversationHistory.map(m => m.text).join(' '))
        
        return NextResponse.json({
          response: followUp,
          chatCompleted: false
        })
      }
    }
    
    // Regular chat logic...
    const response = await generateContextAwareChatResponse(message, psychologyProfile, mentorName, conversationHistory, personalProfile)
    
    return NextResponse.json({ 
      response: response,
      modelsUsed: ['chatgpt'],
      personality: 'friend',
      context: 'general',
      chatCompleted: false
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 })
  }
}

// Helper functions
function analyzeQuestion(message: string) {
  const lowerMessage = message.toLowerCase()
  
  // Mood detection
  const emotionalKeywords = ['feel', 'sad', 'happy', 'stressed', 'anxious', 'excited', 'worried', 'confused', 'lost']
  const planningKeywords = ['plan', 'goal', 'roadmap', 'strategy', 'organize', 'schedule', 'timeline']
  const patternKeywords = ['always', 'never', 'keep', 'repeat', 'habit', 'pattern', 'trend']
  
  const isEmotional = emotionalKeywords.some(keyword => lowerMessage.includes(keyword))
  const isPlanning = planningKeywords.some(keyword => lowerMessage.includes(keyword))
  const isPattern = patternKeywords.some(keyword => lowerMessage.includes(keyword))
  
  return {
    isEmotional,
    isPlanning,
    isPattern,
    complexity: message.length > 100 ? 'high' : 'low'
  }
}

function selectModels(analysis: any) {
  const models = []
  
  if (analysis.isEmotional) models.push('chatgpt')
  if (analysis.isPlanning) models.push('claude')
  if (analysis.isPattern) models.push('gemini')
  if (analysis.complexity === 'high') models.push('chatgpt', 'claude')
  
  // Default to ChatGPT if no specific model selected
  if (models.length === 0) models.push('chatgpt')
  
  return Array.from(new Set(models)) // Remove duplicates
}

async function getModelResponses(message: string, models: string[], personality: string, history: any[]) {
  const responses = []
  
  for (const model of models) {
    try {
      let response = ''
      
      if (model === 'chatgpt') {
        response = await callChatGPT(message, personality, history)
      } else if (model === 'claude') {
        response = await callClaude(message, personality, history)
      } else if (model === 'gemini') {
        response = await callGemini(message, personality, history)
      }
      
      responses.push({
        model: model,
        response: response
      })
    } catch (error) {
      console.error(`Error calling ${model}:`, error)
      // Fallback response
      responses.push({
        model: model,
        response: `I'm having trouble responding right now. Please try again.`
      })
    }
  }
  
  return responses
}

async function callChatGPT(message: string, personality: string, history: any[]) {
  const prompt = `You are Mentark, a ${personality} AI mentor. The user is asking: "${message}". 
  
  Respond as a ${personality} would - be supportive, understanding, and helpful. Keep your response conversational and personal.`
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150
    })
  })

  if (response.ok) {
    const data = await response.json()
    return data.choices[0].message.content
  } else {
    throw new Error('ChatGPT API failed')
  }
}

async function callClaude(message: string, personality: string, history: any[]) {
  const prompt = `You are Mentark, a ${personality} AI mentor. The user is asking: "${message}". 
  
  Respond as a ${personality} would - be structured, logical, and provide clear guidance.`
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  if (response.ok) {
    const data = await response.json()
    return data.content[0].text
  } else {
    throw new Error('Claude API failed')
  }
}

async function callGemini(message: string, personality: string, history: any[]) {
  const prompt = `You are Mentark, a ${personality} AI mentor. The user is asking: "${message}". 
  
  Respond as a ${personality} would - be insightful, pattern-aware, and provide long-term perspective.`
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_GENAI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 150 }
    })
  })

  if (response.ok) {
    const data = await response.json()
    return data.candidates[0].content.parts[0].text
  } else {
    throw new Error('Gemini API failed')
  }
}

function combineResponses(responses: any[], analysis: any) {
  if (responses.length === 1) {
    return responses[0].response
  }
  
  // Combine multiple responses intelligently
  return responses.map(r => r.response).join(' ')
}