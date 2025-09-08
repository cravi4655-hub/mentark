import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let goal = 'Your Goal'
  
  try {
    const { goal: requestGoal, goalType, timeframe, personalProfile, chatContext, psychologyProfile, contextualIntelligence, homepageData } = await request.json()
    goal = requestGoal || 'Your Goal'
    
    console.log('Generating detailed roadmap for:', { goal, goalType, timeframe })
    
    // Generate detailed roadmap with micro-tasks
    const roadmap = await generateDetailedRoadmap(goal, goalType, timeframe, psychologyProfile, personalProfile, chatContext)
    
    return NextResponse.json(roadmap)
  } catch (error) {
    console.error('Roadmap generation error:', error)
    
    // Return a detailed fallback roadmap
    const fallbackRoadmap = createFallbackRoadmap(goal, goalType)
    return NextResponse.json(fallbackRoadmap)
  }
}

async function generateDetailedRoadmap(goal: string, goalType: string, timeframe: string, psychologyProfile: any, personalProfile: any, chatContext: any) {
  // Analyze goal complexity and extract key information
  const goalAnalysis = analyzeGoalComplexity(goal, goalType, chatContext)
  
  // Generate phases based on goal type and complexity
  const phases = generatePhasesForGoal(goal, goalType, timeframe, goalAnalysis, psychologyProfile)
  
  const roadmap = {
    title: goal,
    description: `A personalized roadmap for ${goal}`,
    phases: phases,
    totalXP: calculateTotalXP(phases),
    estimatedDuration: calculateDuration(phases),
    difficulty: goalAnalysis.difficulty,
    category: goalType,
    personalization: {
      learningStyle: psychologyProfile?.profile?.learningStyle || 'mixed',
      motivationType: psychologyProfile?.profile?.motivationType || 'mixed',
      workStyle: psychologyProfile?.profile?.workStyle || 'flexible'
    }
  }
  
  return roadmap
}

function analyzeGoalComplexity(goal: string, goalType: string, chatContext: any[]) {
  const goalText = goal.toLowerCase()
  const chatText = chatContext.map(msg => msg.text).join(' ').toLowerCase()
  const fullText = `${goalText} ${chatText}`
  
  // Analyze complexity indicators
  const hasAmount = /\d+/.test(fullText)
  const hasTimeline = /monthly|weekly|daily|year|month|week|day/.test(fullText)
  const hasMethod = /invest|trade|crypto|stake|learn|build|create/.test(fullText)
  const hasTarget = /earn|make|achieve|reach|get/.test(fullText)
  
  // Determine difficulty
  let difficulty = 'Medium'
  if (goalType === 'finance' && (fullText.includes('crypto') || fullText.includes('trade'))) {
    difficulty = 'Hard'
  } else if (goalType === 'learning' && fullText.includes('language')) {
    difficulty = 'Medium'
  } else if (hasAmount && hasTimeline && hasMethod) {
    difficulty = 'Hard'
  } else if (hasMethod && hasTarget) {
    difficulty = 'Medium'
  } else {
    difficulty = 'Easy'
  }
  
  return {
    difficulty,
    hasAmount,
    hasTimeline,
    hasMethod,
    hasTarget,
    complexity: hasAmount && hasTimeline && hasMethod ? 'high' : 'medium'
  }
}

function generatePhasesForGoal(goal: string, goalType: string, timeframe: string, goalAnalysis: any, psychologyProfile: any) {
  if (goalType === 'finance' && goal.toLowerCase().includes('crypto')) {
    return generateCryptoTradingPhases(goal, goalAnalysis, psychologyProfile)
  } else if (goalType === 'learning') {
    return generateLearningPhases(goal, goalAnalysis, psychologyProfile)
  } else if (goalType === 'health') {
    return generateHealthPhases(goal, goalAnalysis, psychologyProfile)
  } else if (goalType === 'career') {
    return generateCareerPhases(goal, goalAnalysis, psychologyProfile)
  } else {
    return generateGenericPhases(goal, goalAnalysis, psychologyProfile)
  }
}

function generateCryptoTradingPhases(goal: string, goalAnalysis: any, psychologyProfile: any) {
  const learningStyle = psychologyProfile?.profile?.learningStyle || 'mixed'
  const isVisual = learningStyle === 'visual'
  const isAnalytical = psychologyProfile?.profile?.personalityType === 'analytical'
  
  return [
    {
      title: "Foundation & Education",
      description: "Build your crypto knowledge and set up your trading environment",
      duration: "2 weeks",
      xp: 300,
      milestones: [
        {
          title: "Crypto Basics Mastery",
          description: "Understand blockchain, wallets, and market fundamentals",
          tasks: [
            {
              title: "Research top 10 cryptocurrencies",
              description: "Study Bitcoin, Ethereum, and 8 other major coins",
              type: "research",
              duration: "45 minutes",
              xp: 50,
              difficulty: "Easy",
              resources: [
                { 
                  title: "CoinMarketCap - Market Overview", 
                  url: "https://coinmarketcap.com", 
                  type: "tool",
                  description: "Real-time crypto prices and market data"
                },
                { 
                  title: "Binance Academy - Crypto Basics", 
                  url: "https://academy.binance.com/en/articles", 
                  type: "course",
                  description: "Free educational content about cryptocurrency"
                }
              ],
              instructions: isVisual ? 
                "Create a visual comparison chart of the top 10 cryptocurrencies" :
                "Write detailed notes about each cryptocurrency's key features"
            },
            {
              title: "Set up secure wallet",
              description: "Create and secure your cryptocurrency wallet",
              type: "setup",
              duration: "30 minutes",
              xp: 40,
              difficulty: "Easy",
              resources: [
                { 
                  title: "MetaMask Wallet Setup", 
                  url: "https://metamask.io", 
                  type: "tool",
                  description: "Browser extension wallet for Ethereum"
                },
                { 
                  title: "Hardware Wallet Guide", 
                  url: "https://ledger.com/academy", 
                  type: "article",
                  description: "Guide to using hardware wallets for security"
                }
              ],
              instructions: "Download MetaMask, create wallet, write down seed phrase, and enable 2FA"
            },
            {
              title: "Binance account setup",
              description: "Create and verify your trading account",
              type: "setup",
              duration: "20 minutes",
              xp: 30,
              difficulty: "Easy",
              resources: [
                { 
                  title: "Binance Registration", 
                  url: "https://binance.com", 
                  type: "tool",
                  description: "World's largest crypto exchange"
                }
              ],
              instructions: "Register, complete KYC verification, and enable 2FA"
            }
          ]
        },
        {
          title: "Risk Management Setup",
          description: "Implement proper risk management strategies",
          tasks: [
            {
              title: "Calculate position sizes",
              description: "Determine how much to risk per trade",
              type: "planning",
              duration: "25 minutes",
              xp: 45,
              difficulty: "Medium",
              resources: [
                { 
                  title: "Position Size Calculator", 
                  url: "https://www.babypips.com/tools/position-size-calculator", 
                  type: "tool",
                  description: "Calculate optimal position sizes"
                },
                { 
                  title: "Risk Management Guide", 
                  url: "https://www.investopedia.com/articles/trading/09/risk-management.asp", 
                  type: "article",
                  description: "Comprehensive risk management strategies"
                }
              ],
              instructions: isAnalytical ? 
                "Create a detailed spreadsheet with position size calculations for different risk levels" :
                "Use the calculator to determine your position sizes and write them down"
            },
            {
              title: "Set stop-loss rules",
              description: "Define your risk tolerance and stop-loss strategy",
              type: "planning",
              duration: "20 minutes",
              xp: 35,
              difficulty: "Medium",
              resources: [
                { 
                  title: "Stop-Loss Strategies", 
                  url: "https://www.tradingview.com/education/stop-loss/", 
                  type: "article",
                  description: "Different stop-loss strategies explained"
                }
              ],
              instructions: "Decide on your stop-loss percentage (1-3%) and create a rule document"
            }
          ]
        }
      ]
    },
    {
      title: "Strategy Development & Practice",
      description: "Develop and test your trading strategies with paper trading",
      duration: "3 weeks",
      xp: 500,
      milestones: [
        {
          title: "Paper Trading Practice",
          description: "Practice trading with virtual money before risking real capital",
          tasks: [
            {
              title: "Start paper trading on Binance",
              description: "Use Binance testnet to practice trading strategies",
              type: "practice",
              duration: "2 hours",
              xp: 80,
              difficulty: "Medium",
              resources: [
                { 
                  title: "Binance Testnet", 
                  url: "https://testnet.binance.vision", 
                  type: "tool",
                  description: "Practice trading with virtual money"
                },
                { 
                  title: "Trading Strategies Guide", 
                  url: "https://www.binance.com/en/blog/421499824684900352", 
                  type: "article",
                  description: "Common crypto trading strategies"
                }
              ],
              instructions: "Start with $10,000 virtual money and practice 5 different trading strategies"
            },
            {
              title: "Create trading journal",
              description: "Track your trades and analyze performance",
              type: "setup",
              duration: "30 minutes",
              xp: 40,
              difficulty: "Easy",
              resources: [
                { 
                  title: "Trading Journal Template", 
                  url: "https://docs.google.com/spreadsheets/d/1example", 
                  type: "tool",
                  description: "Free Google Sheets trading journal template"
                }
              ],
              instructions: "Set up a trading journal to record all your trades, reasons, and outcomes"
            },
            {
              title: "Analyze first week results",
              description: "Review your paper trading performance and identify patterns",
              type: "analysis",
              duration: "45 minutes",
              xp: 60,
              difficulty: "Medium",
              resources: [
                { 
                  title: "Performance Analysis Guide", 
                  url: "https://www.investopedia.com/articles/trading/08/trading-performance-analysis.asp", 
                  type: "article",
                  description: "How to analyze trading performance"
                }
              ],
              instructions: isAnalytical ? 
                "Create detailed performance metrics and charts" :
                "Write a summary of what worked and what didn't"
            }
          ]
        },
        {
          title: "Live Trading Start",
          description: "Begin live trading with small amounts",
          tasks: [
            {
              title: "Start with 10% of budget",
              description: "Begin live trading with a small portion of your capital",
              type: "trading",
              duration: "1 hour",
              xp: 100,
              difficulty: "Hard",
              resources: [
                { 
                  title: "Live Trading Checklist", 
                  url: "https://www.binance.com/en/blog/421499824684900352", 
                  type: "article",
                  description: "Checklist for starting live trading"
                }
              ],
              instructions: "Start with only 10% of your total budget and focus on one strategy"
            },
            {
              title: "Monitor first trades closely",
              description: "Watch your first live trades and adjust strategy",
              type: "monitoring",
              duration: "2 hours",
              xp: 70,
              difficulty: "Medium",
              resources: [
                { 
                  title: "Trading Alerts Setup", 
                  url: "https://www.tradingview.com/features/alerts/", 
                  type: "tool",
                  description: "Set up price alerts for your trades"
                }
              ],
              instructions: "Set up alerts and monitor your trades closely for the first week"
            }
          ]
        }
      ]
    },
    {
      title: "Scale & Optimize",
      description: "Scale your successful strategies and work towards your income target",
      duration: "4 weeks",
      xp: 400,
      milestones: [
        {
          title: "Full Capital Deployment",
          description: "Scale up to your full trading budget",
          tasks: [
            {
              title: "Increase position sizes gradually",
              description: "Scale up your successful strategies",
              type: "trading",
              duration: "1 hour",
              xp: 80,
              difficulty: "Hard",
              resources: [
                { 
                  title: "Scaling Strategies", 
                  url: "https://www.investopedia.com/articles/trading/08/scaling-in-out.asp", 
                  type: "article",
                  description: "How to scale trading positions"
                }
              ],
              instructions: "Increase your position sizes by 25% each week if profitable"
            },
            {
              title: "Track monthly performance",
              description: "Monitor progress towards your monthly income target",
              type: "tracking",
              duration: "30 minutes",
              xp: 50,
              difficulty: "Medium",
              resources: [
                { 
                  title: "Performance Dashboard", 
                  url: "https://www.tradingview.com/features/", 
                  type: "tool",
                  description: "Create a performance dashboard"
                }
              ],
              instructions: "Create a monthly performance report and track progress to your 30k target"
            }
          ]
        }
      ]
    }
  ]
}

function generateLearningPhases(goal: string, goalAnalysis: any, psychologyProfile: any) {
  // Similar detailed structure for learning goals
  return [
    {
      title: "Foundation Learning",
      description: "Build fundamental knowledge and skills",
      duration: "3 weeks",
      xp: 400,
      milestones: [
        {
          title: "Basic Concepts Mastery",
          description: "Understand core concepts and terminology",
          tasks: [
            {
              title: "Complete beginner course",
              description: "Take a comprehensive beginner course",
              type: "course",
              duration: "10 hours",
              xp: 100,
              difficulty: "Easy",
              resources: [
                { title: "Coursera Course", url: "#", type: "course", description: "Structured learning path" }
              ],
              instructions: "Complete all modules and take notes"
            }
          ]
        }
      ]
    }
  ]
}

function generateHealthPhases(goal: string, goalAnalysis: any, psychologyProfile: any) {
  // Similar detailed structure for health goals
  return [
    {
      title: "Health Assessment & Planning",
      description: "Assess current health and create personalized plan",
      duration: "1 week",
      xp: 200,
      milestones: [
        {
          title: "Health Baseline",
          description: "Establish your starting point",
          tasks: [
            {
              title: "Health checkup",
              description: "Get comprehensive health assessment",
              type: "appointment",
              duration: "2 hours",
              xp: 50,
              difficulty: "Easy",
              resources: [
                { title: "Health Tracking App", url: "#", type: "app", description: "Track your health metrics" }
              ],
              instructions: "Schedule and complete a full health checkup"
            }
          ]
        }
      ]
    }
  ]
}

function generateCareerPhases(goal: string, goalAnalysis: any, psychologyProfile: any) {
  // Similar detailed structure for career goals
  return [
    {
      title: "Skill Development",
      description: "Develop the skills needed for your career goal",
      duration: "4 weeks",
      xp: 500,
      milestones: [
        {
          title: "Identify Required Skills",
          description: "Research and identify skills needed for your goal",
          tasks: [
            {
              title: "Job market research",
              description: "Analyze job postings and requirements",
              type: "research",
              duration: "2 hours",
              xp: 60,
              difficulty: "Easy",
              resources: [
                { title: "LinkedIn Jobs", url: "https://linkedin.com/jobs", type: "tool", description: "Research job requirements" }
              ],
              instructions: "Find 10 job postings for your target role and list required skills"
            }
          ]
        }
      ]
    }
  ]
}

function generateGenericPhases(goal: string, goalAnalysis: any, psychologyProfile: any) {
  return [
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
              description: "Define measurable success metrics",
              type: "exercise",
              duration: "30 minutes",
              xp: 50,
              difficulty: "Easy",
              resources: [
                { title: "SMART Goals Guide", url: "#", type: "article", description: "Learn to set SMART goals" }
              ],
              instructions: "Write down 3 specific, measurable success criteria for your goal"
            }
          ]
        }
      ]
    }
  ]
}

function calculateTotalXP(phases: any[]) {
  return phases.reduce((total, phase) => {
    return total + phase.xp
  }, 0)
}

function calculateDuration(phases: any[]) {
  const totalWeeks = phases.reduce((total, phase) => {
    const weeks = parseInt(phase.duration.split(' ')[0])
    return total + weeks
  }, 0)
  
  if (totalWeeks < 4) return `${totalWeeks} weeks`
  if (totalWeeks < 12) return `${Math.round(totalWeeks / 4)} months`
  return `${Math.round(totalWeeks / 52)} years`
}

function createFallbackRoadmap(goal: string, goalType: string) {
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
                description: "Define measurable success metrics",
                type: "exercise",
                duration: "30 minutes",
                xp: 50,
                difficulty: "Easy",
                resources: [
                  { title: "SMART Goals Guide", url: "#", type: "article", description: "Learn to set SMART goals" }
                ],
                instructions: "Write down 3 specific, measurable success criteria for your goal"
              }
            ]
          }
        ]
      }
    ],
    totalXP: 200,
    estimatedDuration: '2 weeks',
    difficulty: 'Medium',
    category: goalType
  }
}