import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, category, timeframe, isCreatingArk } = await request.json()
    
    if (isCreatingArk && category) {
      const analysis = analyzeGoalFromConversation(conversationHistory, category, timeframe)
      
      if (analysis.isComplete) {
        // Extract goal data and create roadmap immediately
        const goalData = extractGoalData(conversationHistory, category, timeframe)
        
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

// Update the analyzeGoalFromConversation function to be more intelligent
function analyzeGoalFromConversation(messages: any[], category: string, timeframe: string) {
  const conversation = messages.map(m => m.text).join(' ').toLowerCase()
  
  // For learning goals, we need: goal, approach/method, and timeframe
  const hasGoal = conversation.includes('learn') || conversation.includes('develop') || conversation.includes('app')
  const hasApproach = conversation.includes('trial') || conversation.includes('practice') || conversation.includes('project') || conversation.includes('hands-on')
  const hasTimeframe = timeframe && timeframe !== ''
  
  // Check if we have enough information
  if (hasGoal && hasApproach && hasTimeframe) {
    return {
      isComplete: true,
      missingInfo: []
    }
  }
  
  // Determine what's missing
  const missingInfo = []
  if (!hasGoal) missingInfo.push('specific goal')
  if (!hasApproach) missingInfo.push('learning approach')
  if (!hasTimeframe) missingInfo.push('timeframe')
  
  return {
    isComplete: false,
    missingInfo
  }
}

// Update generateFollowUpQuestion to ask more specific questions
function generateFollowUpQuestion(missingInfo: string[], category: string, conversation: string) {
  if (missingInfo.includes('learning approach')) {
    return "Great! I can see you want to learn app development. What's your preferred learning style - do you prefer structured courses, hands-on projects, or a mix of both?"
  }
  
  if (missingInfo.includes('specific goal')) {
    return "What specific type of app would you like to develop? (e.g., mobile app, web app, desktop app)"
  }
  
  if (missingInfo.includes('timeframe')) {
    return "What's your target timeline for this learning goal? (e.g., 3 months, 6 months, 1 year)"
  }
  
  // If we have everything, ask for final confirmation
  return "Perfect! I have all the information I need. Let me create your personalized learning roadmap for app development."
}

function extractGoalData(conversationHistory: any[], currentMessage: string, category: string, timeframe: string) {
  const userMessages = conversationHistory.filter(msg => msg.sender === 'user')
  const allMessages = [...userMessages.map(msg => msg.text), currentMessage]
  const fullText = allMessages.join(' ')
  
  // Extract key information
  const amountMatch = fullText.match(/(\d+)\s*(lakh|thousand|million|k|m|rupees?|rs|₹)/i)
  const targetMatch = fullText.match(/(\d+)\s*(monthly|per month|month)/i)
  const methodMatch = fullText.match(/(crypto|trading|investing|staking|futures|swing|binance)/i)
  
  let goalName = "My Goal"
  let description = fullText
  
  // Create a smart goal name and description
  if (category === 'finance') {
    if (amountMatch && targetMatch) {
      goalName = `Earn ${targetMatch[1]} monthly through ${methodMatch ? methodMatch[1] : 'investing'}`
      description = `Invest ${amountMatch[1]} ${amountMatch[2]} to earn ${targetMatch[1]} monthly through ${methodMatch ? methodMatch[1] : 'crypto trading'}`
    } else if (amountMatch) {
      goalName = `Invest ${amountMatch[1]} ${amountMatch[2]} in crypto`
      description = `Start investing ${amountMatch[1]} ${amountMatch[2]} in cryptocurrency trading and staking`
    } else {
      goalName = "Start Crypto Investing"
      description = "Begin cryptocurrency investing and trading"
    }
  } else {
    // Extract from the first meaningful message
    const firstGoal = userMessages.find(msg => 
      msg.text.toLowerCase().includes('want') || 
      msg.text.toLowerCase().includes('goal') ||
      msg.text.toLowerCase().includes('achieve')
    )
    
    if (firstGoal) {
      goalName = firstGoal.text
      description = firstGoal.text
    }
  }
  
  return {
    name: goalName,
    type: category,
    description: description,
    timeframe: timeframe
  }
}

async function generateContextAwareChatResponse(message: string, psychologyProfile: any, mentorName: string, history: any[], personalProfile: any) {
  // Build minimal context for main chat
  const contextInfo = buildMinimalContext(psychologyProfile, personalProfile)
  
  const systemPrompt = `You are ${mentorName}, a helpful AI mentor. You have some context about this user:

${contextInfo}

Keep responses helpful and concise. Reference their context when relevant but don't over-explain.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.slice(-5).map((msg: any) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          { role: 'user', content: message }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    })

    if (response.ok) {
      const data = await response.json()
      return data.choices[0].message.content
    } else {
      return 'I understand. How can I help you further?'
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    return 'I understand. How can I help you further?'
  }
}

function buildMinimalContext(psychologyProfile: any, personalProfile: any) {
  let context = "User Context:\n"
  
  if (psychologyProfile?.profile) {
    context += `- Learning Style: ${psychologyProfile.profile.learningStyle || 'Not specified'}\n`
    context += `- Motivation Type: ${psychologyProfile.profile.motivationType || 'Not specified'}\n`
  }
  
  if (personalProfile) {
    context += `- Life Stage: ${personalProfile.lifeStage || 'Not specified'}\n`
    context += `- Goals: ${personalProfile.goals?.join(', ') || 'Not specified'}\n`
  }
  
  return context
}