import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('=== ANALYSIS API CALLED ===')
    const { responses, userType } = await request.json()
    console.log('Analysis data received:', { userType, responsesCount: Object.keys(responses).length })
    
    // Simulate analysis from all three models
    const analysis = {
      chatgpt: `Based on your responses, I can see you're a ${userType} with ${Object.keys(responses).length} responses. You show strong potential in your field and have clear goals for the future.`,
      claude: `Your roadmap should focus on building foundational skills first, then advancing to specialized areas. I recommend a 3-phase approach: Foundation (3 months), Development (6 months), and Mastery (ongoing).`,
      gemini: `Your profile shows you're a ${userType} who values growth and learning. You have a balanced approach to challenges and show resilience in your responses.`
    }
    
    console.log('Analysis completed:', analysis)
    return NextResponse.json({ analysis })
  } catch (error) {
    console.error('Analysis API error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}