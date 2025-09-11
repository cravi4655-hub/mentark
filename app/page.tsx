'use client'

import { useState, useEffect } from 'react'
import { Star, Zap, Target, Users, BookOpen, DollarSign, Activity, CheckCircle, Brain, Heart, Lightbulb, ArrowRight, Mail, MessageSquare, User, Menu, X } from 'lucide-react'
import AssessmentWidget from './components/AssessmentWidget'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showTagline, setShowTagline] = useState(false)
  const [liveCounter, setLiveCounter] = useState(12847)
  const [activeTab, setActiveTab] = useState('home')
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Contact form states
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isContactSubmitted, setIsContactSubmitted] = useState(false)
  const [isContactLoading, setIsContactLoading] = useState(false)

  // Animation effects
  useEffect(() => {
    const timer = setTimeout(() => setShowTagline(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Live counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || selectedCategories.length === 0) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email, 
          categories: selectedCategories,
          interests: selectedCategories.join(', ')
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        setEmail('')
        setSelectedCategories([])
        // Increment live counter
        setLiveCounter(prev => prev + 1)
      } else {
        throw new Error('Failed to join waitlist')
      }
    } catch (error) {
      console.error('Waitlist error:', error)
      alert('Failed to join waitlist. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return

    setIsContactLoading(true)
    try {
      // Simulate form submission (replace with actual API call later)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Contact form submitted:', contactForm)
      setIsContactSubmitted(true)
      setContactForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Form error:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsContactLoading(false)
    }
  }

  const handleTryDemo = () => {
    setShowComingSoon(true)
    setTimeout(() => {
      setShowComingSoon(false)
    }, 3000)
  }

  const renderHomeTab = () => (
    <div className="space-y-12 sm:space-y-16 md:space-y-20">
      {/* Hero Section */}
      <div className="text-center px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Your Personal
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block sm:inline"> AI Mentor</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The world's first AI-powered personal development platform that creates personalized roadmaps for every life goal
          </p>
        </div>

        {/* Animated Tagline */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
          <div className="text-center space-y-2 sm:space-y-4">
            <div className={`transition-all duration-1000 ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-lg sm:text-xl text-gray-400">Google gives information</p>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-lg sm:text-xl text-gray-400">YouTube gives tutorials</p>
            </div>
            <div className={`transition-all duration-1000 delay-600 ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-lg sm:text-xl text-gray-400">ChatGPT gives answers</p>
            </div>
            <div className={`transition-all duration-1000 delay-900 ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Mentark gives direction</span>
              </p>
            </div>
            <div className={`transition-all duration-1000 delay-1200 ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-lg sm:text-xl text-gray-300">— goals, roadmaps, accountability</p>
            </div>
          </div>
        </div>

        {/* Live Counter */}
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <div className="inline-flex items-center space-x-2 bg-gray-800/50 rounded-full px-4 py-2 border border-gray-700">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">
              Join <span className="text-yellow-400 font-bold">{liveCounter.toLocaleString()}</span> others transforming their lives
            </span>
          </div>
        </div>

        {/* Waitlist Form with Categories */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0" id="waitlist">
          {!isSubmitted ? (
            <div className="space-y-6 sm:space-y-8">
              {/* Category Selection */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">What challenges are you facing?</h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-2">
                  Select the areas where you need direction (choose 1-3)
                </p>
                <p className="text-sm text-gray-400">
                  Most popular: <span className="text-yellow-400 font-semibold">Finance</span> • <span className="text-yellow-400 font-semibold">Career</span>
                </p>
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {[
                  { 
                    id: 'finance',
                    name: 'Finance', 
                    icon: <DollarSign className="w-6 h-6" />, 
                    color: 'from-green-500 to-emerald-500',
                    description: 'Money management & wealth building'
                  },
                  { 
                    id: 'career',
                    name: 'Career', 
                    icon: <Target className="w-6 h-6" />, 
                    color: 'from-blue-500 to-cyan-500',
                    description: 'Professional growth & advancement'
                  },
                  { 
                    id: 'health',
                    name: 'Health', 
                    icon: <Activity className="w-6 h-6" />, 
                    color: 'from-red-500 to-orange-500',
                    description: 'Fitness & wellness goals'
                  },
                  { 
                    id: 'relationships',
                    name: 'Relationships', 
                    icon: <Users className="w-6 h-6" />, 
                    color: 'from-pink-500 to-rose-500',
                    description: 'Building meaningful connections'
                  },
                  { 
                    id: 'learning',
                    name: 'Learning', 
                    icon: <BookOpen className="w-6 h-6" />, 
                    color: 'from-indigo-500 to-blue-500',
                    description: 'Mastering new skills'
                  },
                  { 
                    id: 'personal',
                    name: 'Personal', 
                    icon: <Star className="w-6 h-6" />, 
                    color: 'from-purple-500 to-pink-500',
                    description: 'Confidence & life skills'
                  }
                ].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedCategories.includes(category.id)
                        ? 'border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20'
                        : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                    }`}
                  >
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto transition-transform duration-200 ${
                      selectedCategories.includes(category.id) ? 'scale-110' : ''
                    }`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-400 text-center">{category.description}</p>
                    {selectedCategories.includes(category.id) && (
                      <div className="mt-3 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-yellow-400" />
                        <span className="ml-2 text-sm text-yellow-400 font-semibold">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Email Form */}
              <form onSubmit={handleWaitlistSubmit} className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Get early access to {selectedCategories.length > 0 ? selectedCategories.join(' & ') : 'your selected areas'}
                  </h3>
                  <p className="text-gray-300">
                    Be the first to know when we launch solutions for your challenges
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-base sm:text-lg transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading || selectedCategories.length === 0}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-600 text-gray-900 font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg min-h-[48px]"
                  >
                    {isLoading ? 'Joining...' : 'Get Early Access'}
                  </button>
                </div>
                
                {selectedCategories.length === 0 && (
                  <p className="text-sm text-red-400 text-center">
                    Please select at least one area where you need direction
                  </p>
                )}
                
                <p className="text-sm text-gray-400 text-center">
                  No spam, just exclusive updates about your selected areas
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30 animate-pulse">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">You're in! 🎉</h2>
              <p className="text-xl text-gray-300 mb-6">
                We'll notify you as soon as we launch solutions for your selected challenges.
              </p>
              <div className="bg-gray-800/30 rounded-xl p-4 mb-6 max-w-md mx-auto">
                <p className="text-sm text-gray-400 mb-2">You'll get early access to:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedCategories.map((category, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-semibold">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setSelectedCategories([])
                }}
                className="px-6 py-3 border-2 border-gray-600 rounded-xl text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200"
              >
                Join Another Email
              </button>
            </div>
          )}
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">AI-Powered Analysis</h3>
            <p className="text-gray-300 text-base sm:text-lg text-center">
              Advanced AI analyzes your personality, goals, and preferences to create the perfect roadmap
            </p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">Personalized Roadmaps</h3>
            <p className="text-gray-300 text-base sm:text-lg text-center">
              Get step-by-step roadmaps tailored to your unique situation and learning style
            </p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">Real-Time Guidance</h3>
            <p className="text-gray-300 text-base sm:text-lg text-center">
              Get instant feedback, motivation, and course corrections as you progress
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Section - All 6 Categories */}
      <div className="bg-gray-800/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mx-4 sm:mx-0">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Transform Every Area of Your Life</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Mentark covers all aspects of personal development with AI-powered guidance tailored to your unique needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            { 
              icon: <DollarSign className="w-8 h-8" />, 
              name: 'Finance', 
              color: 'from-green-500 to-emerald-500',
              description: 'Master money management, investing, and wealth building with personalized financial strategies'
            },
            { 
              icon: <Target className="w-8 h-8" />, 
              name: 'Career', 
              color: 'from-blue-500 to-cyan-500',
              description: 'Advance your professional life with AI-powered career planning and skill development'
            },
            { 
              icon: <Activity className="w-8 h-8" />, 
              name: 'Health', 
              color: 'from-red-500 to-orange-500',
              description: 'Achieve your fitness and wellness goals with customized health and nutrition plans'
            },
            { 
              icon: <Users className="w-8 h-8" />, 
              name: 'Relationships', 
              color: 'from-pink-500 to-rose-500',
              description: 'Build meaningful connections and improve communication in all your relationships'
            },
            { 
              icon: <BookOpen className="w-8 h-8" />, 
              name: 'Learning', 
              color: 'from-indigo-500 to-blue-500',
              description: 'Master new skills and knowledge with personalized learning paths and resources'
            },
            { 
              icon: <Star className="w-8 h-8" />, 
              name: 'Personal', 
              color: 'from-purple-500 to-pink-500',
              description: 'Develop confidence, habits, and life skills for overall personal growth and fulfillment'
            }
          ].map((category, index) => (
            <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 group">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-200`}>
                <div className="text-white scale-75 sm:scale-100">{category.icon}</div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">{category.name}</h3>
              <p className="text-gray-300 text-center leading-relaxed text-sm sm:text-base">{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-gray-800/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mx-4 sm:mx-0">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mr-2 sm:mr-3" />
            <span className="text-yellow-400 font-semibold text-base sm:text-lg">Get in Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Have Questions?</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!isContactSubmitted ? (
            <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-base"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-base"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-base"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 resize-none text-base"
                  placeholder="Tell us what's on your mind..."
                  required
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isContactLoading}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-600 text-gray-900 font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg min-h-[48px]"
                >
                  {isContactLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
              <p className="text-xl text-gray-300 mb-6">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setIsContactSubmitted(false)}
                className="px-6 py-3 border-2 border-gray-600 rounded-xl text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderMentarkWayTab = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Lightbulb className="w-8 h-8 text-yellow-400 mr-3" />
          <span className="text-yellow-400 font-semibold text-lg">The Mentark Philosophy</span>
        </div>
        <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          The Mentark Way:
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block">From Uncertainty to Clarity</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          We believe mentorship should be accessible, adaptive, and actionable. The Mentark Way combines human psychology, AI reasoning, and structured planning to turn your goals into reality.
        </p>
      </div>

      {/* What Makes Mentark Different */}
      <div className="bg-gray-800/20 rounded-3xl p-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">What Makes Mentark Different?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlike generic self-help apps, Mentark creates truly personalized experiences based on your unique psychology and circumstances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Psychological Intelligence</h3>
            <p className="text-gray-300 text-lg">
              We understand your unique learning style, motivation patterns, and behavioral preferences to create truly personalized guidance.
            </p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Structured Planning</h3>
            <p className="text-gray-300 text-lg">
              Every goal is broken down into actionable steps, milestones, and resources that adapt to your progress and changing circumstances.
            </p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Adaptive Learning</h3>
            <p className="text-gray-300 text-lg">
              Our AI learns from your interactions, successes, and challenges to continuously improve your personalized experience.
            </p>
          </div>
        </div>
      </div>

      {/* The Process */}
      <div className="bg-gray-800/20 rounded-3xl p-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The Mentark Way transforms your goals into reality through a proven, personalized process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Discover', description: 'Understand your personality, goals, and motivations through our AI-powered assessment', icon: <Brain className="w-8 h-8" /> },
            { step: '02', title: 'Plan', description: 'Create a personalized roadmap with milestones, tasks, and resources tailored to you', icon: <Target className="w-8 h-8" /> },
            { step: '03', title: 'Execute', description: 'Follow your roadmap with real-time guidance, motivation, and course corrections', icon: <Zap className="w-8 h-8" /> },
            { step: '04', title: 'Evolve', description: 'Continuously improve and adapt your approach based on progress and new insights', icon: <Star className="w-8 h-8" /> }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/30">
                <div className="text-gray-900 font-bold text-2xl">{item.step}</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-300 text-lg">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Now */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl p-12 border border-yellow-500/20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Why Mentark? Why Now?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">The Problem</h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  Generic self-help content that doesn't fit your personality
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  Overwhelming amount of information with no clear path
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  Lack of accountability and personalized guidance
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  One-size-fits-all approaches that don't work
                </li>
              </ul>
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-green-400 mb-4">The Solution</h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">•</span>
                  AI-powered personalization based on your psychology
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">•</span>
                  Clear, step-by-step roadmaps for every goal
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">•</span>
                  Real-time guidance and motivation from AI mentors
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">•</span>
                  Adaptive learning that grows with you
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Life?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of people who are already on their journey to achieving their goals with Mentark
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => setActiveTab('home')}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30"
          >
            Join the Waitlist
          </button>
          <button
            onClick={handleTryDemo}
            className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-bold rounded-xl transition-all duration-200"
          >
            Try Demo
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(250,204,21,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-green-400/40 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-orange-400/30 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-pink-400/40 rounded-full animate-pulse delay-3000"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-400/50 transition-all duration-300 group-hover:scale-105">
              <span className="text-gray-900 font-bold text-lg sm:text-xl">M</span>
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
              MENTARK
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 bg-gray-800/50 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'home'
                    ? 'bg-yellow-500 text-gray-900 font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('mentark-way')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'mentark-way'
                    ? 'bg-yellow-500 text-gray-900 font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                The Mentark Way
              </button>
            </div>
            
            <button
              onClick={handleTryDemo}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 text-sm sm:text-base"
            >
              Try Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-yellow-400 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 px-4 py-6">
            <div className="space-y-4">
              {/* Navigation Tabs */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setActiveTab('home')
                    setIsMobileMenuOpen(false)
                  }}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    activeTab === 'home'
                      ? 'bg-yellow-500 text-gray-900 font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setActiveTab('mentark-way')
                    setIsMobileMenuOpen(false)
                  }}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    activeTab === 'mentark-way'
                      ? 'bg-yellow-500 text-gray-900 font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  The Mentark Way
                </button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    handleTryDemo()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30"
                >
                  Try Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md mx-auto border border-yellow-500/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Coming Soon!</h3>
              <p className="text-gray-300 mb-6">
                The demo is currently being prepared. Join our waitlist to be the first to experience Mentark when it launches!
              </p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl transition-all duration-200"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="relative px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'home' ? renderHomeTab() : renderMentarkWayTab()}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 sm:px-6 py-8 sm:py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
              <span className="text-gray-900 font-bold text-base sm:text-lg">M</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white">MENTARK</span>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            The future of personal development is here. Join the waitlist to be the first to experience it.
          </p>
        </div>
      </footer>
    </div>
  )
}