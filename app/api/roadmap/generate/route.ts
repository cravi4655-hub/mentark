import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let goal = 'Your Goal'
  
  try {
    const { goal: requestGoal, goalType, timeframe, personalProfile, chatContext, psychologyProfile, contextualIntelligence, homepageData } = await request.json()
    goal = requestGoal || 'Your Goal'
    
    console.log('Generating roadmap with full context:', { 
      goal, 
      goalType, 
      psychologyProfile: !!psychologyProfile,
      contextualIntelligence: !!contextualIntelligence,
      homepageData: !!homepageData,
      personalProfile: !!personalProfile
    })
    
    // Generate roadmap using all available context
    const roadmap = await generateContextualRoadmap(goal, goalType, psychologyProfile, contextualIntelligence, homepageData, personalProfile, chatContext)
    
    return NextResponse.json(roadmap)
  } catch (error) {
    console.error('Roadmap generation error:', error)
    
    // Return a fallback roadmap if generation fails
    const fallbackRoadmap = {
      title: goal || 'Your Goal',
      description: `A personalized roadmap for ${goal || 'your goal'}`,
      phases: [
        {
          title: "Foundation Phase",
          description: "Build the foundation for your goal",
          duration: "2 weeks",
          xp: 200,
          milestones: [
            {
              title: "Define Success Metrics",
              description: "Clearly define what success looks like",
              tasks: [
                {
                  title: "Write down 3 specific success criteria",
                  type: "exercise",
                  duration: "30 minutes",
                  xp: 50,
                  resources: [
                    { title: "SMART Goals Guide", url: "#", type: "article" }
                  ]
                }
              ]
            }
          ]
        }
      ],
      totalXP: 1000,
      estimatedDuration: '6 weeks',
      difficulty: 'Medium'
    }
    
    return NextResponse.json(fallbackRoadmap)
  }
}

async function generateContextualRoadmap(goal: string, goalType: string, psychologyProfile: any, contextualIntelligence: any, homepageData: any, personalProfile: any, chatContext: any) {
  // Build comprehensive user context
  const userContext = buildComprehensiveContext(psychologyProfile, contextualIntelligence, homepageData, personalProfile, chatContext)
  
  // Generate roadmap based on user's learning style and preferences
  if (psychologyProfile?.profile?.learningStyle === 'visual') {
    return generateVisualRoadmap(goal, goalType, userContext)
  } else if (psychologyProfile?.profile?.personalityType === 'analytical') {
    return generateAnalyticalRoadmap(goal, goalType, userContext)
  } else if (psychologyProfile?.profile?.personalityType === 'intuitive') {
    return generateIntuitiveRoadmap(goal, goalType, userContext)
  } else {
    return generateStandardRoadmap(goal, goalType, userContext)
  }
}

function buildComprehensiveContext(psychologyProfile: any, contextualIntelligence: any, homepageData: any, personalProfile: any, chatContext: any) {
  return {
    psychology: psychologyProfile?.profile || {},
    context: contextualIntelligence || {},
    homepage: homepageData || {},
    personal: personalProfile || {},
    chat: chatContext || []
  }
}

async function generateVisualRoadmap(goal: string, goalType: string, userContext: any) {
  return {
    title: goal,
    description: `A visual learning roadmap for ${goal}`,
    phases: [
      {
        title: "Visual Foundation",
        description: "Build your visual understanding and create visual progress tracking",
        duration: "2 weeks",
        xp: 200,
        milestones: [
          {
            title: "Create Vision Board",
            description: "Design a visual representation of your goal",
            tasks: [
              {
                title: "Gather inspiration images",
                type: "project",
                duration: "2 hours",
                xp: 50,
                resources: [
                  { title: "Pinterest for inspiration", url: "https://pinterest.com", type: "tool" },
                  { title: "Canva for design", url: "https://canva.com", type: "tool" }
                ]
              }
            ]
          }
        ]
      }
    ],
    totalXP: 1000,
    estimatedDuration: '6 weeks',
    difficulty: 'Medium'
  }
}

async function generateAnalyticalRoadmap(goal: string, goalType: string, userContext: any) {
  return {
    title: goal,
    description: `An analytical roadmap for ${goal}`,
    phases: [
      {
        title: "Data Analysis Phase",
        description: "Analyze your goal with detailed metrics and research",
        duration: "2 weeks",
        xp: 200,
        milestones: [
          {
            title: "Research and Data Collection",
            description: "Gather comprehensive data about your goal",
            tasks: [
              {
                title: "Market research analysis",
                type: "project",
                duration: "8 hours",
                xp: 100,
                resources: [
                  { title: "Industry reports", url: "#", type: "article" },
                  { title: "Data analysis tools", url: "#", type: "tool" }
                ]
              }
            ]
          }
        ]
      }
    ],
    totalXP: 1000,
    estimatedDuration: '6 weeks',
    difficulty: 'Medium'
  }
}

async function generateIntuitiveRoadmap(goal: string, goalType: string, userContext: any) {
  return {
    title: goal,
    description: `An intuitive roadmap for ${goal}`,
    phases: [
      {
        title: "Exploration Phase",
        description: "Explore different approaches and discover what works for you",
        duration: "3 weeks",
        xp: 300,
        milestones: [
          {
            title: "Try Multiple Approaches",
            description: "Experiment with different methods to find your path",
            tasks: [
              {
                title: "Rapid prototyping",
                type: "project",
                duration: "6 hours",
                xp: 75,
                resources: [
                  { title: "Design thinking guide", url: "#", type: "article" }
                ]
              }
            ]
          }
        ]
      }
    ],
    totalXP: 1000,
    estimatedDuration: '6 weeks',
    difficulty: 'Medium'
  }
}

async function generateStandardRoadmap(goal: string, goalType: string, userContext: any) {
  return {
    title: goal,
    description: `A personalized roadmap for ${goal}`,
    phases: [
      {
        title: "Foundation Phase",
        description: "Build the foundation for your goal",
        duration: "2 weeks",
        xp: 200,
        milestones: [
          {
            title: "Define Success Metrics",
            description: "Clearly define what success looks like",
            tasks: [
              {
                title: "Write down 3 specific success criteria",
                type: "exercise",
                duration: "30 minutes",
                xp: 50,
                resources: [
                  { title: "SMART Goals Guide", url: "#", type: "article" }
                ]
              }
            ]
          }
        ]
      },
      {
        title: "Development Phase",
        description: "Work towards your goal systematically",
        duration: "4 weeks",
        xp: 400,
        milestones: [
          {
            title: "Take Action",
            description: "Start working on your goal",
            tasks: [
              {
                title: "Complete your first milestone",
                type: "project",
                duration: "2 hours",
                xp: 100,
                resources: [
                  { title: "Progress tracking template", url: "#", type: "tool" }
                ]
              }
            ]
          }
        ]
      }
    ],
    totalXP: 1000,
    estimatedDuration: '6 weeks',
    difficulty: 'Medium'
  }
}