'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Target, Calendar, CheckCircle, Star, Zap, Brain, Heart, DollarSign, BookOpen, Users, Activity } from 'lucide-react'

export default function ArkCreationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedGoalType, setSelectedGoalType] = useState('')
  const [selectedTimeframe, setSelectedTimeframe] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  
  // Goal factors
  const [goalUrgency, setGoalUrgency] = useState('medium')
  const [goalPriority, setGoalPriority] = useState('high')
  const [goalComplexity, setGoalComplexity] = useState('medium')
  const [goalMotivation, setGoalMotivation] = useState('personal')

  // AI Chat states
  const [aiChatMode, setAiChatMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatCompleted, setChatCompleted] = useState(false)
  const [goalData, setGoalData] = useState<any>(null)
  const [creatingArk, setCreatingArk] = useState(false)

  // Psychology profile state
  const [psychologyProfile, setPsychologyProfile] = useState<any>(null)

  // Message interface
  interface Message {
    id: number
    text: string
    sender: 'user' | 'ai'
    timestamp: Date
  }

  // Load psychology profile on component mount
  useState(() => {
    const profile = localStorage.getItem('psychologyProfile')
    if (profile) {
      setPsychologyProfile(JSON.parse(profile))
    }
  }, [])

  // Get personalized templates based on psychology profile
  const getPersonalizedTemplates = () => {
    if (!psychologyProfile) return templates[selectedGoalType] || []

    const baseTemplates = templates[selectedGoalType] || []
    const profile = psychologyProfile.profile || {}

    return baseTemplates.map(template => ({
      ...template,
      matchReason: getMatchReason(template, profile)
    }))
  }

  const getMatchReason = (template: any, profile: any) => {
    const reasons = []
    
    if (profile.learningStyle === 'visual' && template.difficulty === 'Easy') {
      reasons.push('Perfect for visual learners')
    }
    if (profile.motivationType === 'intrinsic' && template.difficulty === 'Hard') {
      reasons.push('Matches your intrinsic motivation')
    }
    if (profile.riskTolerance === 'conservative' && template.difficulty === 'Easy') {
      reasons.push('Aligns with your conservative approach')
    }
    if (profile.riskTolerance === 'aggressive' && template.difficulty === 'Hard') {
      reasons.push('Challenges your ambitious nature')
    }
    
    return reasons.length > 0 ? reasons.join(', ') : 'Recommended for you'
  }

  // Initialize category chat
  const initializeCategoryChat = (category: string) => {
    const categoryExperts = {
      career: {
        name: "Career Coach AI",
        greeting: "Hi! I'm your Career Coach AI. I specialize in helping people advance their careers, switch jobs, develop skills, and achieve professional goals. What career goal would you like to work on?",
        expertise: "career development, job searching, skill building, professional growth"
      },
      finance: {
        name: "Finance Expert AI", 
        greeting: "Hello! I'm your Finance Expert AI. I help people with budgeting, investing, debt management, financial planning, and wealth building. What financial goal can I help you achieve?",
        expertise: "financial planning, investing, budgeting, debt management"
      },
      health: {
        name: "Health & Wellness AI",
        greeting: "Hey there! I'm your Health & Wellness AI. I specialize in fitness, nutrition, mental health, and overall wellness. What health goal would you like to focus on?",
        expertise: "fitness, nutrition, mental health, wellness"
      },
      personal: {
        name: "Personal Development AI",
        greeting: "Hi! I'm your Personal Development AI. I help with self-improvement, habit building, productivity, and personal growth. What personal goal are you working towards?",
        expertise: "personal growth, habit building, productivity, self-improvement"
      },
      relationships: {
        name: "Relationships AI",
        greeting: "Hello! I'm your Relationships AI. I specialize in communication, dating, family dynamics, and building meaningful connections. What relationship goal can I help you with?",
        expertise: "communication, dating, family, social skills"
      },
      learning: {
        name: "Learning Specialist AI",
        greeting: "Hey! I'm your Learning Specialist AI. I help with skill acquisition, education planning, and knowledge development. What would you like to learn?",
        expertise: "skill development, education, knowledge acquisition"
      },
      custom: {
        name: "Mentark AI",
        greeting: "Hi! I'm Mentark, your personal AI mentor. I can help you with any goal across all areas of life. What would you like to achieve?",
        expertise: "comprehensive goal setting and achievement"
      }
    }

    const expert = categoryExperts[category as keyof typeof categoryExperts]
    
    setChatMessages([{
      id: 1,
      text: expert.greeting,
      sender: 'ai',
      timestamp: new Date()
    }])
  }

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!chatInput.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now(),
      text: chatInput,
      sender: 'user',
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: chatInput,
          conversationHistory: chatMessages,
          category: selectedCategory,
          timeframe: selectedTimeframe,
          isCreatingArk: true,
          psychologyProfile: psychologyProfile,
          personalProfile: JSON.parse(localStorage.getItem('personalProfile') || '{}')
        })
      })

      if (response.ok) {
        const data = await response.json()
        
        const aiMessage: Message = {
          id: Date.now() + 1,
          text: data.response,
          sender: 'ai',
          timestamp: new Date()
        }

        setChatMessages(prev => [...prev, aiMessage])

        // Check if chat is completed
        if (data.chatCompleted) {
          setChatCompleted(true)
          setGoalData(data.goalData)
        }
      } else {
        throw new Error('Chat failed')
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble right now. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  // Handle creating Ark from chat
  const handleCreateArkFromChat = async () => {
    if (!goalData) return

    try {
      setCreatingArk(true)
      
      // Load all context data
      const contextualIntelligence = localStorage.getItem('contextualIntelligence')
      const personalProfile = localStorage.getItem('personalProfile')
      const homepageData = localStorage.getItem('homepageData')
      
      const response = await fetch('/api/roadmap/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-psychology-profile': JSON.stringify(psychologyProfile || {}),
          'x-contextual-intelligence': contextualIntelligence || '{}',
          'x-homepage-data': homepageData || '{}'
        },
        body: JSON.stringify({
          goal: goalData.description,
          goalType: goalData.type,
          timeframe: goalData.timeframe || 'medium',
          personalProfile: personalProfile ? JSON.parse(personalProfile) : {},
          chatContext: chatMessages,
          psychologyProfile: psychologyProfile || {},
          contextualIntelligence: contextualIntelligence ? JSON.parse(contextualIntelligence) : {},
          homepageData: homepageData ? JSON.parse(homepageData) : {}
        })
      })

      if (response.ok) {
        const roadmap = await response.json()
        
        const newArk = {
          id: Date.now(),
          name: goalData.name,
          type: goalData.type,
          description: goalData.description,
          roadmap: roadmap,
          progress: 0,
          status: 'active',
          createdAt: new Date().toISOString(),
          nextMilestone: roadmap.phases?.[0]?.milestones?.[0]?.title || 'Start your journey',
          chatContext: chatMessages,
          psychologyProfile: psychologyProfile || {},
          contextualIntelligence: contextualIntelligence ? JSON.parse(contextualIntelligence) : {},
          homepageData: homepageData ? JSON.parse(homepageData) : {},
          // Add goal factors
          urgency: goalUrgency,
          priority: goalPriority,
          complexity: goalComplexity,
          motivation: goalMotivation,
          timeframe: selectedTimeframe
        }

        // Save to localStorage
        const existingArks = JSON.parse(localStorage.getItem('activeArks') || '[]')
        const updatedArks = [...existingArks, newArk]
        localStorage.setItem('activeArks', JSON.stringify(updatedArks))

        // Redirect to roadmap
        window.location.href = `/roadmap/${newArk.id}`
      } else {
        throw new Error('Failed to generate roadmap')
      }
    } catch (error) {
      console.error('Ark creation error:', error)
      alert('Failed to create Ark. Please try again.')
    } finally {
      setCreatingArk(false)
    }
  }

  // Render AI Chat
  const renderAIChat = () => {
    const userMessageCount = chatMessages.filter(m => m.sender === 'user').length
    const maxQuestions = selectedTimeframe === 'short' ? 4 : selectedTimeframe === 'medium' ? 6 : 8
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">AI Expert Chat</h2>
          <p className="text-gray-300 text-lg">
            Let our AI expert guide you through creating your perfect {selectedTimeframe}-term {selectedCategory} Ark
          </p>
          
          {/* Smart Progress Bar */}
          {userMessageCount > 0 && (
            <div className="mt-4 max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{Math.min(userMessageCount, maxQuestions)}/{maxQuestions}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Math.min(userMessageCount, maxQuestions) / maxQuestions) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {selectedTimeframe === 'short' ? 'Quick questions for short-term goals' : 
                 selectedTimeframe === 'medium' ? 'Detailed questions for mid-term goals' : 
                 'Comprehensive questions for long-term goals'}
              </p>
            </div>
          )}
        </div>

        {/* Chat Interface */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 h-96 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex space-x-4">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!chatInput.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-600 text-gray-900 font-bold rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        {chatCompleted && (
          <div className="text-center space-y-4">
            <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
              <p className="text-green-400 font-semibold">
                ✅ Great! I have all the information I need to create your personalized Ark.
              </p>
            </div>
            <button
              onClick={handleCreateArkFromChat}
              disabled={creatingArk}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creatingArk ? 'Creating Your Ark...' : 'Create My Ark'}
            </button>
          </div>
        )}
      </div>
    )
  }

  // Render current step
  const renderCurrentStep = () => {
    if (aiChatMode) {
      return renderAIChat()
    }
    
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      default: return renderStep1()
    }
  }

  const goalTypes = [
    { 
      id: 'career', 
      name: 'Career', 
      icon: <Target className="w-8 h-8" />, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Professional growth and development',
      examples: ['Get promoted', 'Start a business', 'Learn new skills', 'Change careers']
    },
    { 
      id: 'finance', 
      name: 'Finance', 
      icon: <DollarSign className="w-8 h-8" />, 
      color: 'from-green-500 to-emerald-500',
      description: 'Money management and wealth building',
      examples: ['Save $10k', 'Pay off debt', 'Invest wisely', 'Buy a house']
    },
    { 
      id: 'personal', 
      name: 'Personal', 
      icon: <Star className="w-8 h-8" />, 
      color: 'from-purple-500 to-pink-500',
      description: 'Self-improvement and life skills',
      examples: ['Build confidence', 'Find purpose', 'Better habits', 'Life balance']
    },
    { 
      id: 'health', 
      name: 'Health', 
      icon: <Activity className="w-8 h-8" />, 
      color: 'from-red-500 to-orange-500',
      description: 'Physical and mental wellness',
      examples: ['Lose weight', 'Get fit', 'Mental health', 'Better sleep']
    },
    { 
      id: 'relationships', 
      name: 'Relationships', 
      icon: <Users className="w-8 h-8" />, 
      color: 'from-pink-500 to-rose-500',
      description: 'Building meaningful connections',
      examples: ['Find love', 'Better friendships', 'Family bonds', 'Networking']
    },
    { 
      id: 'learning', 
      name: 'Learning', 
      icon: <BookOpen className="w-8 h-8" />, 
      color: 'from-indigo-500 to-blue-500',
      description: 'Acquiring new knowledge and skills',
      examples: ['Learn language', 'New hobby', 'Certification', 'Master skill']
    }
  ]

  const timeframes = [
    { 
      id: 'short', 
      name: 'Short-term', 
      duration: '1-3 months', 
      icon: <Zap className="w-6 h-6" />,
      description: 'Quick wins and immediate goals',
      color: 'from-yellow-400 to-orange-500'
    },
    { 
      id: 'mid', 
      name: 'Mid-term', 
      duration: '3-12 months', 
      icon: <Calendar className="w-6 h-6" />,
      description: 'Substantial progress and growth',
      color: 'from-blue-400 to-purple-500'
    },
    { 
      id: 'long', 
      name: 'Long-term', 
      duration: '1-5 years', 
      icon: <Star className="w-6 h-6" />,
      description: 'Life-changing transformations',
      color: 'from-purple-400 to-pink-500'
    }
  ]

  const templates = {
    career: [
      { id: 'promotion', name: 'Get Promoted', description: 'Advance to the next level in your career', difficulty: 'Medium', duration: '6-12 months' },
      { id: 'entrepreneur', name: 'Start a Business', description: 'Launch your own company or side hustle', difficulty: 'Hard', duration: '12-24 months' },
      { id: 'skills', name: 'Learn New Skills', description: 'Master in-demand skills for your field', difficulty: 'Easy', duration: '3-6 months' },
      { id: 'career-change', name: 'Change Careers', description: 'Transition to a completely new field', difficulty: 'Hard', duration: '12-18 months' }
    ],
    finance: [
      { id: 'emergency-fund', name: 'Emergency Fund', description: 'Build a 3-6 month safety net', difficulty: 'Easy', duration: '6-12 months' },
      { id: 'debt-free', name: 'Become Debt-Free', description: 'Eliminate all high-interest debt', difficulty: 'Medium', duration: '12-24 months' },
      { id: 'investment', name: 'Start Investing', description: 'Build long-term wealth through investments', difficulty: 'Medium', duration: 'Ongoing' },
      { id: 'house', name: 'Buy a House', description: 'Save for and purchase your first home', difficulty: 'Hard', duration: '24-36 months' }
    ],
    personal: [
      { id: 'confidence', name: 'Build Confidence', description: 'Develop unshakeable self-confidence', difficulty: 'Medium', duration: '6-12 months' },
      { id: 'habits', name: 'Better Habits', description: 'Replace bad habits with good ones', difficulty: 'Hard', duration: '3-6 months' },
      { id: 'purpose', name: 'Find Purpose', description: 'Discover your life mission and passion', difficulty: 'Hard', duration: '6-12 months' },
      { id: 'balance', name: 'Work-Life Balance', description: 'Create harmony between work and personal life', difficulty: 'Medium', duration: '3-6 months' }
    ],
    health: [
      { id: 'weight-loss', name: 'Lose Weight', description: 'Achieve your ideal body weight', difficulty: 'Medium', duration: '6-12 months' },
      { id: 'fitness', name: 'Get Fit', description: 'Build strength and endurance', difficulty: 'Medium', duration: '3-6 months' },
      { id: 'mental-health', name: 'Mental Health', description: 'Improve your mental wellbeing', difficulty: 'Hard', duration: '6-12 months' },
      { id: 'nutrition', name: 'Better Nutrition', description: 'Develop healthy eating habits', difficulty: 'Medium', duration: '3-6 months' }
    ],
    relationships: [
      { id: 'find-love', name: 'Find Love', description: 'Meet your perfect partner', difficulty: 'Hard', duration: '6-18 months' },
      { id: 'friendships', name: 'Better Friendships', description: 'Build deeper connections', difficulty: 'Medium', duration: '3-6 months' },
      { id: 'family', name: 'Family Bonds', description: 'Strengthen family relationships', difficulty: 'Medium', duration: '6-12 months' },
      { id: 'networking', name: 'Professional Network', description: 'Build your professional connections', difficulty: 'Easy', duration: '3-6 months' }
    ],
    learning: [
      { id: 'language', name: 'Learn Language', description: 'Master a new language', difficulty: 'Hard', duration: '12-24 months' },
      { id: 'skill', name: 'New Skill', description: 'Master a specific skill', difficulty: 'Medium', duration: '6-12 months' },
      { id: 'certification', name: 'Get Certified', description: 'Earn a professional certification', difficulty: 'Medium', duration: '3-9 months' },
      { id: 'hobby', name: 'New Hobby', description: 'Develop a new hobby or interest', difficulty: 'Easy', duration: '3-6 months' }
    ]
  }

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/30">
          <Target className="w-10 h-10 text-gray-900" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Choose Your Ark Type</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          What area of your life do you want to transform? Select the category that resonates most with your current goals.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {goalTypes.map((goal) => (
          <button
            key={goal.id}
            onClick={() => {
              setSelectedGoalType(goal.id)
              setCurrentStep(2)
            }}
            className={`group p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
              selectedGoalType === goal.id
                ? 'border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/20'
                : 'border-gray-600 hover:border-yellow-400 bg-gray-800/50'
            }`}
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${goal.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
              <div className="text-white">{goal.icon}</div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{goal.name}</h3>
            <p className="text-gray-400 text-sm mb-3">{goal.description}</p>
            <div className="space-y-1">
              {goal.examples.map((example, index) => (
                <div key={index} className="text-xs text-gray-500">• {example}</div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
          <Calendar className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Set Your Timeline</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          How long do you want to commit to this transformation? Choose a timeframe that feels both challenging and achievable.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe.id}
            onClick={() => {
              setSelectedTimeframe(timeframe.id)
              setCurrentStep(3)
            }}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-102 ${
              selectedTimeframe === timeframe.id
                ? 'border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/20'
                : 'border-gray-600 hover:border-yellow-400 bg-gray-800/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${timeframe.color} rounded-xl flex items-center justify-center`}>
                  <div className="text-white">{timeframe.icon}</div>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white">{timeframe.name}</h3>
                  <p className="text-yellow-400 font-semibold">{timeframe.duration}</p>
                  <p className="text-gray-400 text-sm">{timeframe.description}</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-yellow-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
          <Star className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Set Goal Factors</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Help us understand your goal better by setting these important factors.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Urgency */}
        <div>
          <label className="block text-white font-semibold mb-3">How urgent is this goal?</label>
          <div className="grid grid-cols-3 gap-3">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setGoalUrgency(level)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  goalUrgency === level
                    ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                    : 'border-gray-600 text-gray-300 hover:border-yellow-400'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-white font-semibold mb-3">What's your priority level?</label>
          <div className="grid grid-cols-3 gap-3">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setGoalPriority(level)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  goalPriority === level
                    ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                    : 'border-gray-600 text-gray-300 hover:border-yellow-400'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity */}
        <div>
          <label className="block text-white font-semibold mb-3">How complex is this goal?</label>
          <div className="grid grid-cols-3 gap-3">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setGoalComplexity(level)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  goalComplexity === level
                    ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                    : 'border-gray-600 text-gray-300 hover:border-yellow-400'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div>
          <label className="block text-white font-semibold mb-3">What's your main motivation?</label>
          <div className="grid grid-cols-2 gap-3">
            {['personal', 'professional', 'financial', 'health'].map((type) => (
              <button
                key={type}
                onClick={() => setGoalMotivation(type)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  goalMotivation === type
                    ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                    : 'border-gray-600 text-gray-300 hover:border-yellow-400'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentStep(2)}
            className="flex-1 px-6 py-3 border-2 border-gray-600 rounded-xl text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button
            onClick={() => setCurrentStep(4)}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 flex items-center justify-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => {
    const personalizedTemplates = getPersonalizedTemplates()
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Template</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select a personalized template that matches your profile, or create a custom one with our AI expert.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Personalized Templates */}
          {psychologyProfile && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                Personalized for You
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalizedTemplates.slice(0, 2).map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id)
                      setSelectedCategory(selectedGoalType)
                      setAiChatMode(true)
                      initializeCategoryChat(selectedGoalType)
                      setChatInput(template.description)
                    }}
                    className="p-6 rounded-2xl border-2 border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">{template.name}</h4>
                      <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                        Recommended
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3">{template.description}</p>
                    <p className="text-xs text-yellow-400">{template.matchReason}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Default Templates */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Popular Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates[selectedGoalType]?.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template.id)
                    setSelectedCategory(selectedGoalType)
                    setAiChatMode(true)
                    initializeCategoryChat(selectedGoalType)
                    setChatInput(template.description)
                  }}
                  className="p-6 rounded-2xl border-2 border-gray-600 hover:border-yellow-400 bg-gray-800/50 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-bold text-white">{template.name}</h4>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      template.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      template.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {template.difficulty}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3">{template.description}</p>
                  <p className="text-xs text-gray-500">Duration: {template.duration}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Option */}
          <div className="text-center">
            <button
              onClick={() => {
                setSelectedCategory('custom')
                setAiChatMode(true)
                initializeCategoryChat('custom')
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/30"
            >
              <Brain className="w-6 h-6 inline mr-2" />
              Chat with Mentark AI
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(250,204,21,0.1),transparent_50%)]"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 border-b border-yellow-500/20 bg-gray-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-400/50 transition-all duration-300 group-hover:scale-105">
              <span className="text-gray-900 font-bold text-xl">M</span>
            </div>
            <span className="text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
              MENTARK
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-yellow-400 text-xl font-semibold">
              Create Your Ark
            </div>
            <button
              onClick={() => window.location.href = '/chat'}
              className="px-4 py-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              Back to Chat
            </button>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="relative z-10 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Step {currentStep} of 4</span>
            <span className="text-sm text-gray-400">{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {renderCurrentStep()}
        </div>
      </section>
    </div>
  )
}