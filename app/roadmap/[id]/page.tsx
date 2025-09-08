'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, CheckCircle, Calendar, Target, Users, Heart, Globe, Zap, Brain, Star, ChevronRight, ChevronDown, Clock, MapPin, DollarSign, BookOpen, Trophy } from 'lucide-react'

export default function RoadmapPage({ params }: { params: { id: string } }) {
  const [ark, setArk] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['analysis', 'phases']))

  useEffect(() => {
    // Get ark from localStorage
    const arks = JSON.parse(localStorage.getItem('activeArks') || '[]')
    const foundArk = arks.find((a: any) => a.id.toString() === params.id)
    setArk(foundArk)
    setLoading(false)
  }, [params.id])

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const getModelIcon = (model: string) => {
    switch (model) {
      case 'chatgpt': return <Brain className="w-5 h-5 text-green-400" />
      case 'claude': return <Target className="w-5 h-5 text-purple-400" />
      case 'gemini': return <Zap className="w-5 h-5 text-blue-400" />
      default: return <Star className="w-5 h-5 text-gray-400" />
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'foundation': return 'from-blue-500 to-cyan-500'
      case 'development': return 'from-yellow-500 to-orange-500'
      case 'mastery': return 'from-green-500 to-emerald-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading your roadmap...</p>
        </div>
      </div>
    )
  }

  if (!ark) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Roadmap Not Found</h1>
          <button
            onClick={() => window.location.href = '/chat'}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all duration-200"
          >
            Back to Chat
          </button>
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
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/chat'}
              className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Chat</span>
            </button>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <span className="text-gray-900 font-bold text-xl">M</span>
            </div>
            <span className="text-3xl font-bold text-white">MENTARK</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Powered by:</span>
            {ark.roadmap?.modelsUsed?.map((model: string, index: number) => (
              <div key={index} className="flex items-center space-x-1">
                {getModelIcon(model)}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{ark.description}</h1>
                <div className="flex items-center space-x-4 text-gray-400 mb-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{ark.timeframe}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{ark.goalType}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{ark.roadmap?.personalizationLevel || 'Medium'} Personalization</span>
                  </span>
                </div>
                <p className="text-gray-300 text-lg">{ark.roadmap?.summary}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">{ark.progress}%</div>
                <div className="text-sm text-gray-400">Complete</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-600 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${ark.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Roadmap Tree Structure */}
          <div className="space-y-6">
            {/* AI Analysis Section */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
              <button
                onClick={() => toggleSection('analysis')}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">AI Analysis & Insights</h2>
                    <p className="text-gray-400">How our AI models analyzed your profile and goals</p>
                  </div>
                </div>
                {expandedSections.has('analysis') ? 
                  <ChevronDown className="w-6 h-6 text-gray-400" /> : 
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                }
              </button>
              
              {expandedSections.has('analysis') && (
                <div className="px-6 pb-6 border-t border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    {/* ChatGPT Analysis */}
                    <div className="bg-gray-700/30 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Brain className="w-5 h-5 text-green-400" />
                        <h3 className="font-semibold text-white">Emotional & Cultural Analysis</h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div>• Cultural background: {ark.personalProfile?.culturalBackground || 'Not specified'}</div>
                        <div>• Primary motivation: {ark.personalProfile?.primaryMotivation || 'Not specified'}</div>
                        <div>• Family values: {ark.personalProfile?.values || 'Not specified'}</div>
                        <div>• Support system: {ark.personalProfile?.supportSystem || 'Not specified'}</div>
                      </div>
                    </div>

                    {/* Claude Analysis */}
                    <div className="bg-gray-700/30 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Target className="w-5 h-5 text-purple-400" />
                        <h3 className="font-semibold text-white">Strategic Analysis</h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div>• Goal complexity: {ark.roadmap?.isComplex ? 'High' : 'Medium'}</div>
                        <div>• Financial context: {ark.personalProfile?.incomeLevel || 'Not specified'}</div>
                        <div>• Life stage: {ark.personalProfile?.lifeStage || 'Not specified'}</div>
                        <div>• Resource requirements: {ark.roadmap?.resources?.length || 0} identified</div>
                      </div>
                    </div>

                    {/* Gemini Analysis */}
                    <div className="bg-gray-700/30 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Zap className="w-5 h-5 text-blue-400" />
                        <h3 className="font-semibold text-white">Long-term & Cultural Context</h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div>• Location: {ark.personalProfile?.location || 'Not specified'}</div>
                        <div>• Cultural traditions: {ark.personalProfile?.traditions || 'Not specified'}</div>
                        <div>• Long-term vision: {ark.personalProfile?.longTermGoals || 'Not specified'}</div>
                        <div>• Local opportunities: {ark.roadmap?.localOpportunities?.length || 0} identified</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Phases Section */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
              <button
                onClick={() => toggleSection('phases')}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Roadmap Phases</h2>
                    <p className="text-gray-400">Structured timeline with milestones and tasks</p>
                  </div>
                </div>
                {expandedSections.has('phases') ? 
                  <ChevronDown className="w-6 h-6 text-gray-400" /> : 
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                }
              </button>
              
              {expandedSections.has('phases') && (
                <div className="px-6 pb-6 border-t border-gray-700">
                  <div className="space-y-6 pt-6">
                    {ark.roadmap?.phases?.map((phase: any, index: number) => (
                      <div key={index} className="bg-gray-700/30 rounded-xl p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${getPhaseColor(phase.name)} rounded-xl flex items-center justify-center`}>
                            <span className="text-white font-bold text-lg">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{phase.name}</h3>
                            <p className="text-gray-400">{phase.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{phase.duration}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Target className="w-4 h-4" />
                                <span>{phase.milestones?.length || 0} milestones</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {phase.milestones && (
                          <div className="space-y-3">
                            {phase.milestones.map((milestone: any, mIndex: number) => (
                              <div key={mIndex} className="flex items-center space-x-3 p-3 bg-gray-600/30 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span className="text-gray-300">{milestone}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources & Support Section */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
              <button
                onClick={() => toggleSection('resources')}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Resources & Support</h2>
                    <p className="text-gray-400">Tools, communities, and support systems</p>
                  </div>
                </div>
                {expandedSections.has('resources') ? 
                  <ChevronDown className="w-6 h-6 text-gray-400" /> : 
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                }
              </button>
              
              {expandedSections.has('resources') && (
                <div className="px-6 pb-6 border-t border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                    {/* Local Resources */}
                    {ark.roadmap?.localOpportunities && (
                      <div className="bg-gray-700/30 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <MapPin className="w-5 h-5 text-blue-400" />
                          <h3 className="font-semibold text-white">Local Opportunities</h3>
                        </div>
                        <div className="space-y-2">
                          {ark.roadmap.localOpportunities.map((opportunity: any, index: number) => (
                            <div key={index} className="text-sm text-gray-300">• {opportunity}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Emotional Support */}
                    {ark.roadmap?.emotionalSupport && (
                      <div className="bg-gray-700/30 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Heart className="w-5 h-5 text-pink-400" />
                          <h3 className="font-semibold text-white">Emotional Support</h3>
                        </div>
                        <div className="space-y-2">
                          {ark.roadmap.emotionalSupport.map((support: any, index: number) => (
                            <div key={index} className="text-sm text-gray-300">• {support}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cultural Integration */}
                    {ark.roadmap?.communityIntegration && (
                      <div className="bg-gray-700/30 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Globe className="w-5 h-5 text-purple-400" />
                          <h3 className="font-semibold text-white">Community Integration</h3>
                        </div>
                        <div className="space-y-2">
                          {ark.roadmap.communityIntegration.map((integration: any, index: number) => (
                            <div key={index} className="text-sm text-gray-300">• {integration}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cultural Considerations Section */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
              <button
                onClick={() => toggleSection('cultural')}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Cultural Considerations</h2>
                    <p className="text-gray-400">How your cultural background shapes this journey</p>
                  </div>
                </div>
                {expandedSections.has('cultural') ? 
                  <ChevronDown className="w-6 h-6 text-gray-400" /> : 
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                }
              </button>
              
              {expandedSections.has('cultural') && (
                <div className="px-6 pb-6 border-t border-gray-700">
                  <div className="space-y-6 pt-6">
                    {ark.roadmap?.culturalConsiderations && (
                      <div className="bg-gray-700/30 rounded-xl p-4">
                        <h3 className="font-semibold text-white mb-3">Cultural Insights</h3>
                        <div className="space-y-2">
                          {ark.roadmap.culturalConsiderations.map((consideration: any, index: number) => (
                            <div key={index} className="text-sm text-gray-300">• {consideration}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {ark.roadmap?.longTermVision && (
                      <div className="bg-gray-700/30 rounded-xl p-4">
                        <h3 className="font-semibold text-white mb-3">Long-term Vision</h3>
                        <p className="text-sm text-gray-300">{ark.roadmap.longTermVision}</p>
                      </div>
                    )}

                    {ark.roadmap?.generationalImpact && (
                      <div className="bg-gray-700/30 rounded-xl p-4">
                        <h3 className="font-semibold text-white mb-3">Generational Impact</h3>
                        <p className="text-sm text-gray-300">{ark.roadmap.generationalImpact}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}