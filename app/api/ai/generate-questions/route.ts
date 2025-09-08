import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('=== AI QUESTIONS API CALLED ===')
    
    const { goalType, timeframe, description, template } = await request.json()
    
    console.log('Question generation data:', { goalType, timeframe, description: description.substring(0, 50) + '...', template })
    
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not found')
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
    }
    
    const prompt = `You are Mentark, an intelligent AI mentor. Based on the user's goal, generate 3-5 follow-up questions to better understand their needs and create a more personalized roadmap.

User's Goal:
- Type: ${goalType}
- Timeframe: ${timeframe}
- Description: ${description}
- Template: ${template}

Generate questions that will help you understand:
1. Their current situation/starting point
2. Specific challenges they face
3. Resources they have access to
4. Their learning style or preferences
5. Any constraints or limitations

Make questions specific to their goal type and timeframe. Keep them conversational and easy to understand.

Respond in JSON format with an array of question objects:
[
  {
    "id": "question_1",
    "question": "What's your current experience with...?"
  },
  {
    "id": "question_2", 
    "question": "What specific challenges do you face when...?"
  }
]`

    console.log('Calling OpenAI API...')
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000
      })
    })

    console.log('OpenAI response status:', response.status)

    if (response.ok) {
      const data = await response.json()
      console.log('OpenAI response received')
      
      try {
        const questions = JSON.parse(data.choices[0].message.content)
        console.log('Questions generated:', questions.length)
        return NextResponse.json({ questions })
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError)
        // Fallback questions if parsing fails
        const fallbackQuestions = [
          { id: 'current_situation', question: 'What is your current situation regarding this goal?' },
          { id: 'main_challenges', question: 'What are the main challenges you face?' },
          { id: 'available_resources', question: 'What resources do you have available?' },
          { id: 'learning_preferences', question: 'How do you prefer to learn new things?' },
          { id: 'time_constraints', question: 'What are your time constraints or limitations?' }
        ]
        return NextResponse.json({ questions: fallbackQuestions })
      }
    } else {
      const errorData = await response.text()
      console.error('OpenAI API error:', response.status, errorData)
      throw new Error(`OpenAI API failed: ${response.status}`)
    }
  } catch (error) {
    console.error('Error generating questions:', error)
    
    // Return fallback questions if everything fails
    const fallbackQuestions = [
      { id: 'current_situation', question: 'What is your current situation regarding this goal?' },
      { id: 'main_challenges', question: 'What are the main challenges you face?' },
      { id: 'available_resources', question: 'What resources do you have available?' },
      { id: 'learning_preferences', question: 'How do you prefer to learn new things?' },
      { id: 'time_constraints', question: 'What are your time constraints or limitations?' }
    ]
    
    return NextResponse.json({ questions: fallbackQuestions })
  }
}