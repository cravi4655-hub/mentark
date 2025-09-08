import { NextRequest, NextResponse } from 'next/server'

const questionCategories = {
  day1: {
    title: "Learning Style & Motivation",
    questions: [
      {
        id: "learning_style",
        question: "When learning something new, you prefer to:",
        options: [
          "See diagrams, charts, and visual examples",
          "Listen to explanations and discussions",
          "Try it hands-on and practice",
          "Read detailed instructions and take notes"
        ]
      },
      {
        id: "motivation_type",
        question: "What motivates you most to achieve your goals?",
        options: [
          "Personal satisfaction and growth",
          "Recognition and praise from others",
          "Financial rewards and security",
          "Helping others and making a difference"
        ]
      },
      {
        id: "risk_tolerance",
        question: "When facing a new challenge, you prefer to:",
        options: [
          "Take calculated risks after thorough research",
          "Start small and gradually increase difficulty",
          "Jump in headfirst and learn as you go",
          "Avoid risks and stick to proven methods"
        ]
      }
    ]
  },
  day2: {
    title: "Decision Making & Stress Response",
    questions: [
      {
        id: "decision_style",
        question: "When making important decisions, you:",
        options: [
          "Analyze all data and pros/cons carefully",
          "Trust your gut feeling and intuition",
          "Discuss with others and seek consensus",
          "Research extensively before deciding"
        ]
      },
      {
        id: "stress_response",
        question: "Under pressure, you:",
        options: [
          "Thrive and perform at your best",
          "Need time to process before acting",
          "Prefer a calm, structured environment",
          "Get overwhelmed and need support"
        ]
      },
      {
        id: "work_style",
        question: "You work most effectively when:",
        options: [
          "You have clear deadlines and structure",
          "You can work at your own pace",
          "You're collaborating with others",
          "You're solving complex problems"
        ]
      }
    ]
  },
  day3: {
    title: "Social Preferences & Communication",
    questions: [
      {
        id: "social_preference",
        question: "You work best:",
        options: [
          "Alone, with complete focus",
          "In small teams with close collaboration",
          "In large groups with diverse perspectives",
          "With a mix of solo and team work"
        ]
      },
      {
        id: "communication_style",
        question: "When communicating, you prefer to:",
        options: [
          "Be direct and to the point",
          "Explain things in detail with examples",
          "Use stories and analogies",
          "Ask questions and listen actively"
        ]
      },
      {
        id: "feedback_preference",
        question: "You prefer feedback that is:",
        options: [
          "Direct and honest, even if harsh",
          "Constructive and encouraging",
          "Specific and actionable",
          "Regular and ongoing"
        ]
      }
    ]
  },
  day4: {
    title: "Values & Priorities",
    questions: [
      {
        id: "core_values",
        question: "What matters most to you in life?",
        options: [
          "Personal growth and self-improvement",
          "Family and relationships",
          "Career success and achievement",
          "Making a positive impact on others"
        ]
      },
      {
        id: "time_management",
        question: "You manage your time by:",
        options: [
          "Creating detailed schedules and lists",
          "Going with the flow and being flexible",
          "Setting priorities and focusing on what's important",
          "Working in bursts of high energy"
        ]
      },
      {
        id: "challenge_approach",
        question: "When you encounter obstacles, you:",
        options: [
          "Analyze the problem and find solutions",
          "Ask for help and support",
          "Take a break and come back later",
          "Push through with determination"
        ]
      }
    ]
  },
  day5: {
    title: "Learning & Growth Patterns",
    questions: [
      {
        id: "learning_pace",
        question: "You learn best when you:",
        options: [
          "Take your time to understand deeply",
          "Move quickly through material",
          "Have a mix of fast and slow learning",
          "Can revisit and review multiple times"
        ]
      },
      {
        id: "motivation_sources",
        question: "You stay motivated by:",
        options: [
          "Seeing progress and results",
          "Having accountability partners",
          "Learning new things constantly",
          "Helping others succeed"
        ]
      },
      {
        id: "success_definition",
        question: "Success means to you:",
        options: [
          "Achieving your personal goals",
          "Being recognized by others",
          "Making a difference in the world",
          "Living authentically and happily"
        ]
      }
    ]
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const day = searchParams.get('day') || '1'
    
    const category = questionCategories[day as keyof typeof questionCategories]
    if (!category) {
      return NextResponse.json({ error: 'Invalid day' }, { status: 400 })
    }

    return NextResponse.json({
      day: parseInt(day),
      totalDays: 5,
      category: category
    })
  } catch (error) {
    console.error('Assessment API error:', error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { day, responses } = await request.json()
    
    // Save responses to localStorage (this would be handled by the frontend)
    console.log(`Day ${day} responses:`, responses)
    
    return NextResponse.json({ 
      success: true, 
      message: `Day ${day} assessment completed`,
      nextDay: day < 5 ? day + 1 : null
    })
  } catch (error) {
    console.error('Assessment submission error:', error)
    return NextResponse.json({ error: 'Failed to submit assessment' }, { status: 500 })
  }
}

function getNextDay(currentDay: number): number | null {
  if (currentDay < 5) {
    return currentDay + 1
  }
  return null
}
