'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Target, Calendar, CheckCircle, Star, Zap, Brain, Heart, DollarSign, BookOpen, Users, Activity } from 'lucide-react'

export default function ArkCreationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedGoalType, setSelectedGoalType] = useState('')
  const [selectedTimeframe, setSelectedTimeframe] = useState('')
  const [arkDescription, setArkDescription] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [milestones, setMilestones] = useState([])
  const [currentMilestone, setCurrentMilestone] = useState(0)
  
  // New states for AI follow-up questions
  const [aiQuestions, setAiQuestions] = useState<{id: string, question: string}[]>([])
  const [currentAiQuestion, setCurrentAiQuestion] = useState(0)
  const [aiQuestionResponses, setAiQuestionResponses] = useState({})
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

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
        <h1 className="text-4xl font-bold text-white mb-4">Choose Your Template</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Select a proven template that matches your goal, or create a custom one. Each template comes with a structured roadmap.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(templates as any)[selectedGoalType]?.map((template: any) => (
            <button
              key={template.id}
              onClick={() => {
                setSelectedTemplate(template.id)
                setCurrentStep(4)
              }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedTemplate === template.id
                  ? 'border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/20'
                  : 'border-gray-600 hover:border-yellow-400 bg-gray-800/50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{template.name}</h3>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  template.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  template.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {template.difficulty}
                </div>
              </div>
              <p className="text-gray-400 mb-4">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Duration: {template.duration}</span>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentStep(4)}
            className="px-8 py-3 border-2 border-gray-600 rounded-xl text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200"
          >
            Create Custom Template
          </button>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Define Your Goal</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Tell us about your goal. Be as specific as possible - our AI will ask follow-up questions to understand better.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-white font-semibold mb-2">What exactly do you want to achieve?</label>
          <textarea
            value={arkDescription}
            onChange={(e) => setArkDescription(e.target.value)}
            placeholder="Describe your specific goal in detail... What does success look like? How will you know when you've achieved it?"
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-32 resize-none"
          />
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-3">Goal Clarity Checklist:</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Is your goal specific and measurable?</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Do you have a clear deadline?</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Is it challenging but achievable?</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Does it align with your values?</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentStep(3)}
            className="flex-1 px-6 py-3 border-2 border-gray-600 rounded-xl text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button
            onClick={async () => {
              setIsGeneratingQuestions(true)
              setCurrentStep(5)
              
              try {
                // Generate AI follow-up questions
                const response = await fetch('/api/ai/generate-questions', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    goalType: selectedGoalType,
                    timeframe: selectedTimeframe,
                    description: arkDescription,
                    template: selectedTemplate
                  })
                })
                
                if (response.ok) {
                  const data = await response.json()
                  setAiQuestions(data.questions)
                  setCurrentAiQuestion(0)
                  setIsGeneratingQuestions(false)
                } else {
                  throw new Error('Failed to generate questions')
                }
              } catch (error) {
                console.error('Error generating questions:', error)
                setIsGeneratingQuestions(false)
                setCurrentStep(4)
              }
            }}
            disabled={!arkDescription.trim()}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            <span>Generate AI Questions</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => {
    if (isGeneratingQuestions) {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">AI is Analyzing Your Goal...</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI mentor is preparing personalized follow-up questions to better understand your needs.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white text-lg">Generating intelligent questions...</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const currentQ = aiQuestions[currentAiQuestion]
    
    if (!currentQ) {
      // All AI questions answered, move to loading
      return (
        <div className="space-y-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Perfect! Let's Create Your Ark</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We have all the information we need. Now let's generate your personalized roadmap.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-3">Your Goal Summary:</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Goal Type:</span>
                  <span className="text-white">{selectedGoalType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Timeframe:</span>
                  <span className="text-white">{selectedTimeframe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Description:</span>
                  <span className="text-white">{arkDescription}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Questions Answered:</span>
                  <span className="text-white">{aiQuestions.length}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentAiQuestion(0)}
                className="flex-1 px-6 py-3 border-2 border-gray-600 rounded-xl text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Review Questions</span>
              </button>
              <button
                onClick={async () => {
                  setIsGenerating(true)
                  setCurrentStep(6)
                  
                  try {
                    const response = await fetch('/api/roadmap/generate', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        goalType: selectedGoalType,
                        timeframe: selectedTimeframe,
                        description: arkDescription,
                        personalProfile: aiQuestionResponses,
                        template: selectedTemplate
                      })
                    })
                    
                    if (response.ok) {
                      const data = await response.json()
                      const newArk = {
                        id: Date.now().toString(),
                        goalType: selectedGoalType,
                        timeframe: selectedTimeframe,
                        template: selectedTemplate,
                        description: arkDescription,
                        roadmap: data.roadmap,
                        modelsUsed: data.modelsUsed,
                        personalizationLevel: data.personalizationLevel,
                        createdAt: new Date().toISOString()
                      }
                      
                      // Save to localStorage
                      const existingArks = JSON.parse(localStorage.getItem('activeArks') || '[]')
                      existingArks.push(newArk)
                      localStorage.setItem('activeArks', JSON.stringify(existingArks))
                      
                      // Redirect after loading
                      setTimeout(() => {
                        window.location.href = `/roadmap/${newArk.id}`
                      }, 3000)
                    } else {
                      throw new Error('Failed to create Ark')
                    }
                  } catch (error) {
                    console.error('Error creating Ark:', error)
                    setIsGenerating(false)
                    setCurrentStep(5)
                  }
                }}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 flex items-center justify-center space-x-2"
              >
                <span>Create My Ark</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )
    }

    // Show current AI question
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">AI Follow-up Questions</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our AI mentor wants to understand your goal better to create the most personalized roadmap.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Question {currentAiQuestion + 1} of {aiQuestions.length}</span>
              <span className="text-sm text-yellow-400">{Math.round(((currentAiQuestion + 1) / aiQuestions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentAiQuestion + 1) / aiQuestions.length) * 100}%` }}
              ></div>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-6">{currentQ.question}</h2>
            
            <div className="space-y-4">
              <textarea
                placeholder="Your answer..."
                className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none h-24 resize-none"
                onChange={(e) => setAiQuestionResponses(prev => ({ ...prev, [currentQ.id]: e.target.value }))}
                value={aiQuestionResponses[currentQ.id] || ''}
              />
              <button
                onClick={() => {
                  if (currentAiQuestion < aiQuestions.length - 1) {
                    setCurrentAiQuestion(prev => prev + 1)
                  } else {
                    setCurrentAiQuestion(prev => prev + 1) // Move to summary
                  }
                }}
                disabled={!aiQuestionResponses[currentQ.id]}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {currentAiQuestion < aiQuestions.length - 1 ? 'Next Question' : 'Finish Questions'}
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => currentAiQuestion > 0 ? setCurrentAiQuestion(prev => prev - 1) : setCurrentStep(4)}
              className="flex-1 px-6 py-3 border-2 border-gray-600 rounded-xl text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderStep6 = () => {
    if (isGenerating) {
      const getLoadingSteps = (goalType: string) => {
        const steps = {
          finance: [
            { text: "Analyzing your financial profile...", models: ["ChatGPT", "Claude"] },
            { text: "Researching current market rates...", models: ["Perplexity"] },
            { text: "Creating investment strategy...", models: ["Claude"] },
            { text: "Adding motivational support...", models: ["ChatGPT"] },
            { text: "Finalizing your financial roadmap...", models: ["All Models"] }
          ],
          career: [
            { text: "Analyzing your career profile...", models: ["ChatGPT", "Claude"] },
            { text: "Researching job opportunities...", models: ["Perplexity"] },
            { text: "Building career strategy...", models: ["Claude"] },
            { text: "Adding soft skills development...", models: ["ChatGPT"] },
            { text: "Finalizing your career roadmap...", models: ["All Models"] }
          ],
          health: [
            { text: "Analyzing your health profile...", models: ["Gemini", "ChatGPT"] },
            { text: "Researching fitness trends...", models: ["Perplexity"] },
            { text: "Creating workout plan...", models: ["Claude"] },
            { text: "Adding motivation strategies...", models: ["ChatGPT"] },
            { text: "Finalizing your health roadmap...", models: ["All Models"] }
          ],
          personal: [
            { text: "Analyzing your personal profile...", models: ["ChatGPT", "Gemini"] },
            { text: "Researching self-help resources...", models: ["Perplexity"] },
            { text: "Creating habit formation plan...", models: ["Claude"] },
            { text: "Adding emotional support...", models: ["ChatGPT"] },
            { text: "Finalizing your personal roadmap...", models: ["All Models"] }
          ],
          relationships: [
            { text: "Analyzing your relationship profile...", models: ["ChatGPT", "Gemini"] },
            { text: "Researching local events...", models: ["Perplexity"] },
            { text: "Creating communication strategies...", models: ["Claude"] },
            { text: "Adding emotional intelligence tips...", models: ["ChatGPT"] },
            { text: "Finalizing your relationship roadmap...", models: ["All Models"] }
          ],
          learning: [
            { text: "Analyzing your learning profile...", models: ["ChatGPT", "Gemini"] },
            { text: "Researching course options...", models: ["Perplexity"] },
            { text: "Creating study plan...", models: ["Claude"] },
            { text: "Adding motivation techniques...", models: ["ChatGPT"] },
            { text: "Finalizing your learning roadmap...", models: ["All Models"] }
          ]
        }
        
        return steps[goalType] || steps.personal
      }

      const loadingSteps = getLoadingSteps(selectedGoalType)
      const goalTypeName = goalTypes.find(g => g.id === selectedGoalType)?.name || 'Personal'

      return (
        <div className="space-y-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/30">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Creating Your {goalTypeName} Ark...</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI experts are analyzing your profile and building your personalized roadmap.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <div className="space-y-6">
                {loadingSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-xl">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{step.text}</p>
                      <p className="text-sm text-gray-400">{step.models.join(', ')}</p>
                    </div>
                    <div className="w-6 h-6 border-2 border-yellow-500 rounded-full animate-spin">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full m-1"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-2 text-yellow-400">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-gray-400 text-sm mt-2">This usually takes 30-60 seconds...</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return null
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
            <span className="text-sm text-gray-400">Step {currentStep} of 6</span>
            <span className="text-sm text-gray-400">{Math.round((currentStep / 6) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
        </div>
      </section>
    </div>
  )
}