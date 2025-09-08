'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, ArrowRight, Brain, Target, Heart, Zap } from 'lucide-react'

interface Question {
  id: string
  question: string
  type: string
  options: string[]
}

interface AssessmentData {
  category: {
    title: string
    questions: Question[]
  }
  totalDays: number
}

export default function AssessmentWidget() {
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [day, setDay] = useState('day1')
  const [allDaysCompleted, setAllDaysCompleted] = useState(false)
  const [completeAllMode, setCompleteAllMode] = useState(false)
  const [allQuestions, setAllQuestions] = useState<Question[]>([])

  useEffect(() => {
    loadAssessment()
  }, [day])

  const loadAssessment = async () => {
    try {
      const response = await fetch(`/api/assessment?day=${day}`)
      const data = await response.json()
      setAssessmentData(data)
    } catch (error) {
      console.error('Failed to load assessment:', error)
    }
  }

  const loadAllQuestions = async () => {
    try {
      const allQuestionsData = []
      for (let i = 1; i <= 3; i++) {
        const response = await fetch(`/api/assessment?day=day${i}`)
        const data = await response.json()
        allQuestionsData.push(...data.category.questions)
      }
      setAllQuestions(allQuestionsData)
      setCompleteAllMode(true)
    } catch (error) {
      console.error('Failed to load all questions:', error)
    }
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setResponses(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (!assessmentData && !completeAllMode) return
    
    const questions = completeAllMode ? allQuestions : assessmentData.category.questions
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Submit responses
      submitAssessment()
    }
  }

  const analyzeProfile = async () => {
    try {
      const assessmentData = JSON.parse(localStorage.getItem('assessmentData') || '{}')
      
      const response = await fetch('/api/psychology/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentData })
      })
      
      if (response.ok) {
        const analysis = await response.json()
        // Save psychology profile
        localStorage.setItem('psychologyProfile', JSON.stringify(analysis))
        console.log('Psychology profile:', analysis)
      }
    } catch (error) {
      console.error('Failed to analyze profile:', error)
    }
  }

  const submitAssessment = async () => {
    try {
      if (completeAllMode) {
        // For complete all mode, save all responses at once
        const allResponses = {}
        allQuestions.forEach((question, index) => {
          if (responses[question.id]) {
            allResponses[question.id] = responses[question.id]
          }
        })
        
        // Save to localStorage
        const existingData = JSON.parse(localStorage.getItem('assessmentData') || '{}')
        existingData.day1 = {}
        existingData.day2 = {}
        existingData.day3 = {}
        
        // Distribute responses across days
        allQuestions.forEach((question, index) => {
          const dayKey = index < 3 ? 'day1' : index < 6 ? 'day2' : 'day3'
          existingData[dayKey][question.id] = responses[question.id]
        })
        
        localStorage.setItem('assessmentData', JSON.stringify(existingData))
        
        // Analyze profile immediately
        await analyzeProfile()
        setAllDaysCompleted(true)
        setIsCompleted(true)
      } else {
        // Original 3-day flow
        const response = await fetch('/api/assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            responses,
            day,
            userId: 'temp-user'
          })
        })
        
        if (response.ok) {
          // Save to localStorage
          const existingData = JSON.parse(localStorage.getItem('assessmentData') || '{}')
          existingData[day] = responses
          localStorage.setItem('assessmentData', JSON.stringify(existingData))
          
          // Check if all days are completed
          const allData = { ...existingData, [day]: responses }
          const completedDays = Object.keys(allData).length
          
          if (completedDays >= 3) {
            // All days completed, analyze profile
            await analyzeProfile()
            setAllDaysCompleted(true)
          } else {
            // Move to next day
            const nextDay = getNextDay(day)
            if (nextDay) {
              setDay(nextDay)
              setCurrentQuestion(0)
              setResponses({})
              setIsCompleted(false)
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to submit assessment:', error)
    }
  }

  const getNextDay = (currentDay: string) => {
    const days = ['day1', 'day2', 'day3']
    const currentIndex = days.indexOf(currentDay)
    return currentIndex < days.length - 1 ? days[currentIndex + 1] : null
  }

  if (!assessmentData && !completeAllMode) {
    return (
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (isCompleted || allDaysCompleted) {
    return (
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-green-500/50">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            {allDaysCompleted ? 'Assessment Complete!' : 'Assessment Complete!'}
          </h3>
          <p className="text-gray-300 mb-4">
            {allDaysCompleted 
              ? "Perfect! We've analyzed your personality and created your personalized profile. You can now create highly personalized Arks!"
              : "Great! We're learning about you. Come back tomorrow for the next set of questions."
            }
          </p>
          <div className="text-sm text-gray-400">
            {allDaysCompleted ? 'Psychology Profile Generated' : `Day ${day.replace('day', '')} of 3 completed`}
          </div>
        </div>
      </div>
    )
  }

  const questions = completeAllMode ? allQuestions : assessmentData.category.questions
  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Brain className="w-5 h-5 text-yellow-400" />
          <span className="text-sm text-gray-400">
            {completeAllMode ? 'Complete Assessment' : 'Daily Assessment'}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {completeAllMode ? 'Complete Psychology Assessment' : assessmentData.category.title}
        </h3>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-400 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Complete All Button - Only show on day 1 and not in complete all mode */}
      {!completeAllMode && day === 'day1' && (
        <div className="mb-6">
          <button
            onClick={loadAllQuestions}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/30 flex items-center justify-center space-x-2"
          >
            <Zap className="w-5 h-5" />
            <span>Complete All Questions Now</span>
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">
            Skip the 3-day wait and complete all questions at once
          </p>
        </div>
      )}

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-4">{currentQ.question}</h4>
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(currentQ.id, option)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                responses[currentQ.id] === option
                  ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                  : 'border-gray-600 hover:border-yellow-400 text-gray-300 hover:text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!responses[currentQ.id]}
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
      >
        <span>{currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Assessment'}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  )
}
