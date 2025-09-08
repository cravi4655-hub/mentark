'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Clock, Star, Target, ArrowRight, Play, Lock, Trophy, Zap, Calendar, BookOpen, Users, Award } from 'lucide-react'

interface Milestone {
  id: string
  title: string
  description: string
  tasks: Task[]
  completed: boolean
  locked: boolean
  estimatedTime: string
  difficulty: 'easy' | 'medium' | 'hard'
  xp: number
}

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  type: 'video' | 'article' | 'exercise' | 'quiz' | 'project'
  duration: string
  xp: number
  resources: Resource[]
}

interface Resource {
  title: string
  url: string
  type: 'video' | 'article' | 'tool' | 'course'
  description: string
}

export default function RoadmapPage({ params }: { params: { id: string } }) {
  const [roadmap, setRoadmap] = useState<any>(null)
  const [userProgress, setUserProgress] = useState({
    totalXP: 0,
    level: 1,
    streak: 0,
    completedMilestones: 0,
    totalMilestones: 0
  })
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRoadmap()
  }, [params.id])

  const loadRoadmap = async () => {
    try {
      const arks = JSON.parse(localStorage.getItem('activeArks') || '[]')
      console.log('Loading roadmap for ID:', params.id)
      console.log('Available Arks:', arks)
      
      const ark = arks.find((a: any) => a.id === parseInt(params.id))
      console.log('Found Ark:', ark)
      
      if (ark && ark.roadmap) {
        setRoadmap(ark.roadmap)
        setUserProgress(prev => ({
          ...prev,
          totalMilestones: ark.roadmap?.phases?.length || 0
        }))
      } else {
        console.error('Ark not found or missing roadmap:', ark)
        // Show error state
        setRoadmap(null)
      }
    } catch (error) {
      console.error('Failed to load roadmap:', error)
      setRoadmap(null)
    } finally {
      setLoading(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-green-500'
      case 'medium': return 'from-yellow-400 to-yellow-500'
      case 'hard': return 'from-red-400 to-red-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢'
      case 'medium': return '🟡'
      case 'hard': return '🔴'
      default: return '⚪'
    }
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥'
      case 'article': return '📖'
      case 'exercise': return '💪'
      case 'quiz': return '🧠'
      case 'project': return '🚀'
      default: return '🔗'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <p className="text-white text-xl">Loading your roadmap...</p>
        </div>
      </div>
    )
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Roadmap Not Found</h2>
          <p className="text-gray-400 mb-6">This roadmap doesn't exist or has been removed.</p>
          <button
            onClick={() => window.location.href = '/chat'}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            Back to Chat
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="relative z-20 px-6 py-6 border-b border-yellow-500/20 bg-gray-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/chat'}
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
            >
              ← Back to Chat
            </button>
            <div className="h-6 w-px bg-gray-600"></div>
            <h1 className="text-2xl font-bold text-white">{roadmap.title || 'Your Roadmap'}</h1>
          </div>
          
          {/* Progress Stats */}
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{userProgress.totalXP}</div>
              <div className="text-xs text-gray-400">XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">Level {userProgress.level}</div>
              <div className="text-xs text-gray-400">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{userProgress.streak}</div>
              <div className="text-xs text-gray-400">Day Streak</div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Roadmap Overview */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-500/50 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{roadmap.title}</h2>
                <p className="text-gray-300 text-lg">{roadmap.description}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{userProgress.completedMilestones}/{userProgress.totalMilestones} milestones</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(userProgress.completedMilestones / userProgress.totalMilestones) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{roadmap.phases?.length || 0}</div>
                <div className="text-sm text-gray-400">Phases</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{roadmap.estimatedDuration || '3 months'}</div>
                <div className="text-sm text-gray-400">Duration</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{roadmap.difficulty || 'Medium'}</div>
                <div className="text-sm text-gray-400">Difficulty</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{roadmap.totalXP || 1000}</div>
                <div className="text-sm text-gray-400">Total XP</div>
              </div>
            </div>
          </div>

          {/* Milestones Tree */}
          <div className="space-y-6">
            {roadmap.phases?.map((phase: any, phaseIndex: number) => (
              <div key={phaseIndex} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{phaseIndex + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                    <p className="text-gray-400">{phase.description}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold">{phase.xp || 100} XP</div>
                      <div className="text-sm text-gray-400">{phase.duration || '1 week'}</div>
                    </div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="space-y-4">
                  {phase.milestones?.map((milestone: any, milestoneIndex: number) => (
                    <div
                      key={milestoneIndex}
                      className={`bg-gray-700/50 rounded-xl p-4 border transition-all duration-200 cursor-pointer hover:border-yellow-400/50 ${
                        milestone.completed ? 'border-green-500/50 bg-green-900/20' : 
                        milestone.locked ? 'border-gray-600 bg-gray-800/50' : 'border-gray-600'
                      }`}
                      onClick={() => !milestone.locked && setSelectedMilestone(milestone)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          milestone.completed ? 'bg-green-500' : 
                          milestone.locked ? 'bg-gray-600' : 'bg-yellow-500'
                        }`}>
                          {milestone.completed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : milestone.locked ? (
                            <Lock className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Play className="w-4 h-4 text-white" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{milestone.title}</h4>
                          <p className="text-gray-400 text-sm">{milestone.description}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-400">{getDifficultyIcon(milestone.difficulty || 'medium')}</span>
                            <span className="text-sm text-gray-400">{milestone.difficulty || 'Medium'}</span>
                          </div>
                          <div className="text-yellow-400 font-bold text-sm">{milestone.xp || 50} XP</div>
                          <div className="text-gray-400 text-sm">{milestone.duration || '30 min'}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestone Detail Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">{selectedMilestone.title}</h3>
              <button
                onClick={() => setSelectedMilestone(null)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">{selectedMilestone.description}</p>
            
            {/* Tasks */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Tasks</h4>
              {selectedMilestone.tasks?.map((task: any, taskIndex: number) => (
                <div key={taskIndex} className="bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getTaskIcon(task.type)}</div>
                    <div className="flex-1">
                      <h5 className="text-white font-semibold">{task.title}</h5>
                      <p className="text-gray-400 text-sm">{task.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold text-sm">{task.xp} XP</div>
                      <div className="text-gray-400 text-xs">{task.duration}</div>
                    </div>
                  </div>
                  
                  {/* Resources */}
                  {task.resources && task.resources.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <h6 className="text-sm font-semibold text-gray-300">Resources:</h6>
                      <div className="space-y-1">
                        {task.resources.map((resource: any, resourceIndex: number) => (
                          <a
                            key={resourceIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>{resource.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => {
                  // Mark milestone as completed
                  setUserProgress(prev => ({
                    ...prev,
                    completedMilestones: prev.completedMilestones + 1,
                    totalXP: prev.totalXP + (selectedMilestone.xp || 50)
                  }))
                  setSelectedMilestone(null)
                }}
                className="flex-1 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-300 hover:to-green-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                Mark Complete
              </button>
              <button
                onClick={() => setSelectedMilestone(null)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}