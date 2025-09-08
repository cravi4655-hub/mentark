'use client'

import { useState } from 'react'


import { Send, MessageCircle, Plus, Target, Calendar, CheckCircle, Brain, Zap, ArrowRight, User, Settings, Heart, DollarSign, Globe, Users } from 'lucide-react'

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
  const [activeTab, setActiveTab] = useState('chat') // 'chat', 'personalize', 'arks'
  
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

  // Ark Management states
  const [activeArks, setActiveArks] = useState([
    {
      id: 1,
      name: 'Career Growth',
      type: 'career',
      progress: 65,
      status: 'active',
      createdAt: '2024-01-15',
      nextMilestone: 'Complete skill assessment'
    },
    {
      id: 2,
      name: 'Financial Freedom',
      type: 'finance',
      progress: 30,
      status: 'active',
      createdAt: '2024-02-01',
      nextMilestone: 'Set up emergency fund'
    }
  ])

  const handleSendMessage = async () => {

    console.log('=== FUNCTION CALLED ===')
    if (!inputMessage.trim()) {
      console.log('=== NO INPUT MESSAGE ===')
      return
    }

    console.log('=== CREATING USER MESSAGE ===')
    const userMessage = {
      id: Date.now(),
      text: inputMessage,

      sender: 'user',
      modelsUsed: [],
      personality: personality
    }



    console.log('=== SETTING MESSAGES ===')
    setMessages(prev => [...prev, userMessage])

    setConversationHistory(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)



    console.log('=== STARTING API CALL ===')
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory: conversationHistory,
          personalProfile: personalProfile // Include personal context
        })
      })

      console.log('=== API RESPONSE RECEIVED ===', response.status)
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

  const renderPersonalizeTab = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
          <User className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Personalize Your Experience</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Help Mentark understand who you are, where you come from, and what truly matters to you. This makes every Ark and conversation deeply personal.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Demographic Profile */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Who You Are</h2>
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
          </div>
        </div>

        {/* Socioeconomic Status */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Financial Context</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">Income Level</label>
              <select
                value={personalProfile.incomeLevel}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, incomeLevel: e.target.value }))}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="low">Low income (struggling to make ends meet)</option>
                <option value="lower-middle">Lower middle class (basic needs met)</option>
                <option value="middle">Middle class (comfortable lifestyle)</option>
                <option value="upper-middle">Upper middle class (very comfortable)</option>
                <option value="high">High income (wealthy)</option>
              </select>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Family Wealth</label>
              <select
                value={personalProfile.familyWealth}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, familyWealth: e.target.value }))}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="struggling">Family struggling financially</option>
                <option value="modest">Modest family wealth</option>
                <option value="comfortable">Comfortable family wealth</option>
                <option value="wealthy">Wealthy family background</option>
                <option value="very-wealthy">Very wealthy family</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-2">Financial Obligations</label>
              <textarea
                value={personalProfile.financialObligations}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, financialObligations: e.target.value }))}
                placeholder="Student loans, mortgage, supporting parents, children's education, etc."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-20 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Cultural Context */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Cultural Context</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">What does success mean in your family/culture?</label>
              <textarea
                value={personalProfile.values}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, values: e.target.value }))}
                placeholder="Academic achievement, financial stability, family honor, community respect, etc."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-20 resize-none"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">What traditions or cultural practices are important to you?</label>
              <textarea
                value={personalProfile.traditions}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, traditions: e.target.value }))}
                placeholder="Religious practices, family gatherings, cultural celebrations, etc."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-20 resize-none"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">What are the societal expectations for someone like you?</label>
              <textarea
                value={personalProfile.societalExpectations}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, societalExpectations: e.target.value }))}
                placeholder="Career expectations, family responsibilities, social roles, etc."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-20 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Motivational Drivers */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">What Drives You</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">What is your primary motivation?</label>
              <select
                value={personalProfile.primaryMotivation}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, primaryMotivation: e.target.value }))}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="family">Family security and well-being</option>
                <option value="achievement">Personal achievement and recognition</option>
                <option value="freedom">Financial freedom and independence</option>
                <option value="purpose">Finding my life's purpose</option>
                <option value="legacy">Leaving a meaningful legacy</option>
                <option value="growth">Continuous learning and growth</option>
              </select>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">What support system do you have available?</label>
              <textarea
                value={personalProfile.supportSystem}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, supportSystem: e.target.value }))}
                placeholder="Family, friends, mentors, community, professional networks, etc."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-20 resize-none"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">What are your biggest challenges right now?</label>
              <textarea
                value={personalProfile.biggestChallenges}
                onChange={(e) => setPersonalProfile(prev => ({ ...prev, biggestChallenges: e.target.value }))}
                placeholder="Financial constraints, time limitations, lack of skills, family pressure, etc."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-20 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={() => {
              // Save personal profile to localStorage and Supabase
              localStorage.setItem('personalProfile', JSON.stringify(personalProfile))
              setActiveTab('chat')
              // Add success message to chat
              const successMessage = {
                id: Date.now(),
                text: "Perfect! I now understand you much better. I can see your cultural background, financial situation, and what truly motivates you. This will help me create much more personalized Arks and guidance for you. What would you like to work on first?",
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

  const renderArksTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Arks</h2>
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

            {/* Progress Bar */}
            <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
              <div 
                className={`bg-gradient-to-r ${getProgressColor(ark.progress)} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${ark.progress}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Started {new Date(ark.createdAt).toLocaleDateString()}</span>
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
          {activeTab === 'chat' && (
        <div className="max-w-4xl mx-auto">
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
                placeholder="Type your message..."
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
          )}

          {activeTab === 'personalize' && renderPersonalizeTab()}
          {activeTab === 'arks' && renderArksTab()}
        </div>
      </section>
    </div>
  )

}