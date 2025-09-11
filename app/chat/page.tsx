'use client'

import { useState, useEffect } from 'react'
import { Send, MessageCircle, Plus, Target, Calendar, CheckCircle, Brain, Zap, ArrowRight, User, Settings, Heart, DollarSign, Globe, Users, BookOpen, Activity, Star } from 'lucide-react'
import AssessmentWidget from '../components/AssessmentWidget'

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      text: "Hello! I'm Mentark. What Ark would you like to start today?",
      sender: 'ai',
      personality: 'friend',
      modelsUsed: []
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const [personality, setPersonality] = useState('friend')
  const [conversationHistory, setConversationHistory] = useState<any[]>([])
  
  // Tab management
  const [activeTab, setActiveTab] = useState('chat') // 'chat', 'personalize', 'assessment', 'arks'
  
  // Personalization states
  const [personalProfile, setPersonalProfile] = useState({
    // Demographic Profile
    age: '',
    location: '',
    culturalBackground: '',
    familyStructure: '',
    
    // Socioeconomic Status
    incomeLevel: '',
    familyWealth: '',
    financialObligations: '',
    
    // Life Stage
    lifeStage: '',
    
    // Cultural Context
    values: '',
    traditions: '',
    societalExpectations: '',
    localOpportunities: '',
    
    // Motivational Drivers
    primaryMotivation: '',
    secondaryMotivation: '',
    
    // Support System
    supportSystem: '',
    familySupport: '',
    communitySupport: '',
    
    // Goals and Aspirations
    shortTermGoals: '',
    longTermGoals: '',
    biggestChallenges: '',
    biggestStrengths: ''
  })

  // Psychology Profile state
  const [psychologyProfile, setPsychologyProfile] = useState(null)
  const [mentorName, setMentorName] = useState('Mentark')

  // Category-based AI mentors
  const [activeCategory, setActiveCategory] = useState('general')
  const [categoryMentors] = useState({
    career: { name: 'Career Coach', icon: '💼', color: 'from-blue-500 to-cyan-500' },
    finance: { name: 'Financial Advisor', icon: '💰', color: 'from-green-500 to-emerald-500' },
    health: { name: 'Wellness Coach', icon: '💪', color: 'from-red-500 to-orange-500' },
    relationships: { name: 'Relationship Expert', icon: '❤️', color: 'from-pink-500 to-rose-500' },
    learning: { name: 'Learning Specialist', icon: '📚', color: 'from-indigo-500 to-blue-500' },
    personal: { name: 'Life Coach', icon: '🌟', color: 'from-purple-500 to-pink-500' }
  })

  // Load psychology profile and mentor name on component mount
  useEffect(() => {
    const profile = localStorage.getItem('psychologyProfile')
    const name = localStorage.getItem('mentorName')
    const personal = localStorage.getItem('personalProfile')
    
    if (profile) {
      setPsychologyProfile(JSON.parse(profile))
    }
    if (name) {
      setMentorName(name)
    }
    if (personal) {
      setPersonalProfile(JSON.parse(personal))
    }
  }, [])

  // Enhanced Ark Management with profile matching
  const [activeArks, setActiveArks] = useState([
    {
      id: 1,
      name: 'Career Growth',
      type: 'career',
      progress: 65,
      status: 'active',
      createdAt: '2024-01-15',
      nextMilestone: 'Complete skill assessment',
      personalizedFor: 'Visual learner with analytical decision style',
      aiMentor: 'Career Coach',
      difficulty: 'medium',
      estimatedTime: '3-6 months'
    },
    {
      id: 2,
      name: 'Financial Freedom',
      type: 'finance',
      progress: 30,
      status: 'active',
      createdAt: '2024-02-01',
      nextMilestone: 'Set up emergency fund',
      personalizedFor: 'Conservative risk tolerance with structured approach',
      aiMentor: 'Financial Advisor',
      difficulty: 'high',
      estimatedTime: '6-12 months'
    }
  ])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      modelsUsed: [],
      personality: personality
    }

    setMessages(prev => [...prev, userMessage])
    setConversationHistory(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory: conversationHistory,
          personalProfile: personalProfile,
          psychologyProfile: psychologyProfile,
          mentorName: mentorName,
          activeCategory: activeCategory
        })
      })

      if (response.ok) {
        const data = await response.json()
        const aiMessage = {
          id: Date.now() + 1,
          text: data.response,
          sender: 'ai',
          modelsUsed: data.modelsUsed,
          personality: data.personality
        }
        setMessages(prev => [...prev, aiMessage])
        setConversationHistory(prev => [...prev, aiMessage])
      } else {
        throw new Error('Chat API failed')
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try again.",
        sender: 'ai',
        modelsUsed: ['error'],
        personality: personality
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const getModelIcon = (model: string) => {
    switch (model) {
      case 'chatgpt': return <Brain className="w-4 h-4 text-green-400" />
      case 'claude': return <Target className="w-4 h-4 text-purple-400" />
      case 'gemini': return <Zap className="w-4 h-4 text-blue-400" />
      default: return <MessageCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getArkTypeIcon = (type: string) => {
    switch (type) {
      case 'career': return '💼'
      case 'finance': return '💰'
      case 'personal': return '🌟'
      case 'health': return '💪'
      case 'relationships': return '❤️'
      case 'learning': return '📚'
      default: return '🎯'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-400 to-green-500'
    if (progress >= 60) return 'from-yellow-400 to-yellow-500'
    if (progress >= 40) return 'from-orange-400 to-orange-500'
    return 'from-red-400 to-red-500'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'hard': return 'text-orange-400'
      case 'high': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const renderPersonalizeTab = () => (
    <div className="space-y-8">
      {/* Psychology Profile Display */}
      {psychologyProfile && (
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Your Psychology Profile</h2>
          </div>
          
          {/* Profile Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {psychologyProfile && (psychologyProfile as any).profile && Object.entries((psychologyProfile as any).profile).map(([key, value]) => (
              <div key={key} className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-yellow-400 font-semibold capitalize text-sm mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <p className="text-white text-sm">{String(value)}</p>
              </div>
            ))}
          </div>

          {/* Insights */}
          {(psychologyProfile as any)?.insights && (
            <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
              <h3 className="text-yellow-400 font-semibold mb-2">Key Insights</h3>
              <p className="text-gray-300 text-sm">{(psychologyProfile as any).insights}</p>
            </div>
          )}

          {/* Roadmap Preferences */}
          {(psychologyProfile as any)?.roadmapPreferences && (
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h3 className="text-yellow-400 font-semibold mb-3">Your Roadmap Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries((psychologyProfile as any).roadmapPreferences).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-600">
                    <span className="text-gray-300 text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-white text-sm">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mentor Name Customization */}
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Customize Your Mentor</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-2">Mentor Name</label>
            <input
              type="text"
              value={mentorName}
              onChange={(e) => {
                setMentorName(e.target.value)
                localStorage.setItem('mentorName', e.target.value)
              }}
              placeholder="Enter your mentor's name..."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Personal Profile Form */}
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Personal Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-semibold mb-2">Age</label>
            <input
              type="number"
              value={personalProfile.age}
              onChange={(e) => setPersonalProfile(prev => ({ ...prev, age: e.target.value }))}
              placeholder="25"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Location</label>
            <input
              type="text"
              value={personalProfile.location}
              onChange={(e) => setPersonalProfile(prev => ({ ...prev, location: e.target.value }))}
              placeholder="New York, USA"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Cultural Background</label>
            <input
              type="text"
              value={personalProfile.culturalBackground}
              onChange={(e) => setPersonalProfile(prev => ({ ...prev, culturalBackground: e.target.value }))}
              placeholder="Indian-American, Hindu family"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Family Structure</label>
            <select
              value={personalProfile.familyStructure}
              onChange={(e) => setPersonalProfile(prev => ({ ...prev, familyStructure: e.target.value }))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="single">Single, living alone</option>
              <option value="couple">Couple, no children</option>
              <option value="nuclear">Nuclear family (spouse + children)</option>
              <option value="extended">Extended family (parents, siblings, etc.)</option>
              <option value="single-parent">Single parent with children</option>
            </select>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Income Level</label>
            <select
              value={personalProfile.incomeLevel}
              onChange={(e) => setPersonalProfile(prev => ({ ...prev, incomeLevel: e.target.value }))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="low">Low income</option>
              <option value="lower-middle">Lower middle class</option>
              <option value="middle">Middle class</option>
              <option value="upper-middle">Upper middle class</option>
              <option value="high">High income</option>
            </select>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Life Stage</label>
            <select
              value={personalProfile.lifeStage}
              onChange={(e) => setPersonalProfile(prev => ({ ...prev, lifeStage: e.target.value }))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="student">Student</option>
              <option value="early-career">Early career (20-30)</option>
              <option value="mid-career">Mid-career (30-45)</option>
              <option value="senior-career">Senior career (45-60)</option>
              <option value="pre-retirement">Pre-retirement (60+)</option>
            </select>
          </div>
        </div>

        {/* Goals Section */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Goals & Aspirations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">Short-term Goals (1-2 years)</label>
              <textarea
                value={personalProfile.shortTermGoals}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, shortTermGoals: e.target.value }))}
                placeholder="What do you want to achieve in the next 1-2 years?"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-20 resize-none"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Long-term Goals (5+ years)</label>
              <textarea
                value={personalProfile.longTermGoals}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, longTermGoals: e.target.value }))}
                placeholder="What are your long-term life goals?"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-20 resize-none"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Biggest Challenges</label>
              <textarea
                value={personalProfile.biggestChallenges}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, biggestChallenges: e.target.value }))}
                placeholder="What are your biggest challenges right now?"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-20 resize-none"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Biggest Strengths</label>
              <textarea
                value={personalProfile.biggestStrengths}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, biggestStrengths: e.target.value }))}
                placeholder="What are your biggest strengths?"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-20 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              localStorage.setItem('personalProfile', JSON.stringify(personalProfile))
              setActiveTab('chat')
              const successMessage = {
                id: Date.now(),
                text: "Perfect! I now understand you much better. I can see your cultural background, financial situation, psychology profile, and what truly motivates you. This will help me create much more personalized Arks and guidance for you. What would you like to work on first?",
                sender: 'ai',
                modelsUsed: ['chatgpt'],
                personality: 'friend'
              }
              setMessages(prev => [...prev, successMessage])
            }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30"
          >
            Save My Profile & Continue
          </button>
        </div>
      </div>
    </div>
  )

  const renderAssessmentTab = () => (
    <div className="space-y-8">
      <AssessmentWidget />
    </div>
  )

  const renderArksTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Personalized Arks</h2>
        <button
          onClick={() => window.location.href = '/ark-creation'}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Ark</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeArks.map((ark) => (
          <div
            key={ark.id}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{getArkTypeIcon(ark.type)}</div>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors duration-200">
                    {ark.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{ark.nextMilestone}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold text-sm">{ark.progress}%</div>
                <div className="text-gray-500 text-xs">{ark.status}</div>
              </div>
            </div>

            {/* AI Mentor Badge */}
            <div className="mb-3">
              <div className="inline-flex items-center space-x-2 bg-gray-700/50 rounded-lg px-3 py-1">
                <span className="text-sm">{categoryMentors[ark.type as keyof typeof categoryMentors]?.icon}</span>
                <span className="text-xs text-gray-300">{ark.aiMentor}</span>
              </div>
            </div>

            {/* Personalization Info */}
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-1">Personalized for:</p>
              <p className="text-xs text-yellow-400">{ark.personalizedFor}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
              <div 
                className={`bg-gradient-to-r ${getProgressColor(ark.progress)} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${ark.progress}%` }}
              ></div>
            </div>

            {/* Ark Details */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Started {new Date(ark.createdAt).toLocaleDateString()}</span>
              <span className={`font-semibold ${getDifficultyColor(ark.difficulty)}`}>
                {ark.difficulty.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Est. {ark.estimatedTime}</span>
              <ArrowRight className="w-4 h-4 group-hover:text-yellow-400 transition-colors duration-200" />
            </div>
          </div>
        ))}

        {activeArks.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-6">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Arks Yet</h3>
            <p className="text-gray-400 mb-8">Create your first Ark to start your personalized journey</p>
            <button
              onClick={() => window.location.href = '/ark-creation'}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30"
            >
              Create Your First Ark
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const renderChatTab = () => (
    <div className="max-w-4xl mx-auto">
      {/* Category Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Choose Your Expert Mentor</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(categoryMentors).map(([category, mentor]) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                activeCategory === category
                  ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-yellow-400/50 hover:text-yellow-400'
              }`}
            >
              <div className="text-2xl mb-1">{mentor.icon}</div>
              <div className="text-xs font-semibold">{mentor.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-6 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-700 text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                {message.sender === 'ai' && (
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-gray-400">
                      {message.personality || 'Mentark'}
                    </span>
                    <div className="flex items-center space-x-1">
                      {message.modelsUsed?.map((model: any, index: number) => (
                        <div key={index} className="flex items-center space-x-1">
                          {getModelIcon(model)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-white px-6 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Ask your ${categoryMentors[activeCategory as keyof typeof categoryMentors]?.name || 'Mentark'} anything...`}
            className="flex-1 p-4 bg-gray-700 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold px-6 py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )

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
            <button
              onClick={() => window.location.href = '/ark-creation'}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Ark</span>
            </button>
            <div className="text-yellow-400 text-xl font-semibold">
              Chat with Your Mentor
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-1 bg-gray-800/50 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'chat'
                  ? 'bg-yellow-500 text-gray-900 font-semibold'
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('personalize')}
              className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'personalize'
                  ? 'bg-yellow-500 text-gray-900 font-semibold'
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Personalize</span>
            </button>
            <button
              onClick={() => setActiveTab('assessment')}
              className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'assessment'
                  ? 'bg-yellow-500 text-gray-900 font-semibold'
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              <Brain className="w-5 h-5" />
              <span>Assessment</span>
            </button>
            <button
              onClick={() => setActiveTab('arks')}
              className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'arks'
                  ? 'bg-yellow-500 text-gray-900 font-semibold'
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              <Target className="w-5 h-5" />
              <span>My Arks</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'chat' && renderChatTab()}
          {activeTab === 'personalize' && renderPersonalizeTab()}
          {activeTab === 'assessment' && renderAssessmentTab()}
          {activeTab === 'arks' && renderArksTab()}
        </div>
      </section>
    </div>
  )
}