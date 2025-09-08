'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, ArrowRight, Brain, Target, Heart, Zap } from 'lucide-react'

interface Question {
  id: string
  question: string
  options: string[]
}

interface AssessmentData {
  day: number
  totalDays: number
  category: {
    title: string
    questions: Question[]
  }
}

export default function AssessmentWidget() {
  const [currentDay, setCurrentDay] = useState(1)
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [completeAllMode, setCompleteAllMode] = useState(false)
  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [totalDays] = useState(5)

  useEffect(() => {
    if (completeAllMode) {
      loadAllQuestions()
    } else {
      loadAssessmentData()
    }
  }, [currentDay, completeAllMode])

  const loadAssessmentData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/assessment?day=${currentDay}`)
      if (response.ok) {
        const data = await response.json()
        setAssessmentData(data)
      }
    } catch (error) {
      console.error('Failed to load assessment:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadAllQuestions = async () => {
    try {
      setLoading(true)
      const allQuestions: Question[] = []
      
      // Load questions from all 5 days
      for (let day = 1; day <= totalDays; day++) {
        const response = await fetch(`/api/assessment?day=${day}`)
        if (response.ok) {
          const data = await response.json()
          allQuestions.push(...data.category.questions)
        }
      }
      
      setAllQuestions(allQuestions)
    } catch (error) {
      console.error('Failed to load all questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = async () => {
    if (!assessmentData) return

    const allAnswered = assessmentData.category.questions.every(q => responses[q.id])
    if (!allAnswered) {
      alert('Please answer all questions before proceeding.')
      return
    }

    try {
      setLoading(true)
      
      // Save responses
      const allResponses = { ...responses }
      localStorage.setItem(`assessmentDay${currentDay}`, JSON.stringify(allResponses))
      
      // Submit to API
      await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day: currentDay, responses: allResponses })
      })

      if (currentDay < totalDays) {
        setCurrentDay(prev => prev + 1)
        setResponses({})
      } else {
        // All days completed, analyze psychology profile
        await analyzePsychologyProfile()
        setCompleted(true)
      }
    } catch (error) {
      console.error('Failed to submit assessment:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteAll = async () => {
    const allAnswered = allQuestions.every(q => responses[q.id])
    if (!allAnswered) {
      alert('Please answer all questions before proceeding.')
      return
    }

    try {
      setLoading(true)
      
      // Save all responses
      localStorage.setItem('assessmentResponses', JSON.stringify(responses))
      
      // Submit all responses
      await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day: 'all', responses })
      })

      // Analyze psychology profile
      await analyzePsychologyProfile()
      setCompleted(true)
    } catch (error) {
      console.error('Failed to submit assessment:', error)
    } finally {
      setLoading(false)
    }
  }

  const analyzePsychologyProfile = async () => {
    try {
      const allResponses = completeAllMode ? responses : 
        Object.fromEntries(
          Array.from({ length: totalDays }, (_, i) => i + 1)
            .map(day => {
              const dayResponses = localStorage.getItem(`assessmentDay${day}`)
              return dayResponses ? [day, JSON.parse(dayResponses)] : [day, {}]
            })
            .flat()
        )

      const response = await fetch('/api/psychology/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentData: { responses: allResponses } })
      })

      if (response.ok) {
        const psychologyProfile = await response.json()
        localStorage.setItem('psychologyProfile', JSON.stringify(psychologyProfile))
        console.log('Psychology profile saved:', psychologyProfile)
      }
    } catch (error) {
      console.error('Failed to analyze psychology profile:', error)
    }
  }

  const renderQuestion = (question: Question, index: number) => (
    <div key={question.id} className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">
        {index + 1}. {question.question}
      </h3>
      <div className="space-y-3">
        {question.options.map((option, optionIndex) => (
          <label
            key={optionIndex}
            className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              responses[question.id] === option
                ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-yellow-400/50 hover:bg-yellow-400/5'
            }`}
          >
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={responses[question.id] === option}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              className="sr-only"
            />
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                responses[question.id] === option
                  ? 'border-yellow-400 bg-yellow-400'
                  : 'border-gray-400'
              }`}>
                {responses[question.id] === option && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <span className="text-sm">{option}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  )

  const renderCompletion = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">Assessment Complete!</h3>
      <p className="text-gray-300 mb-6">
        We've analyzed your responses and created a comprehensive psychological profile. 
        This will help us personalize your experience and create roadmaps that match your learning style and personality.
      </p>
      <button
        onClick={() => {
          // Redirect to personalize tab
          window.location.href = '/chat#personalize'
        }}
        className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-300 hover:to-green-400 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
      >
        View Your Profile
      </button>
    </div>
  )

  if (completed) {
    return renderCompletion()
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-300">Loading assessment...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Assessment Mode</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setCompleteAllMode(false)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              !completeAllMode
                ? 'bg-yellow-500 text-gray-900 font-semibold'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Daily (5 days)
          </button>
          <button
            onClick={() => setCompleteAllMode(true)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              completeAllMode
                ? 'bg-yellow-500 text-gray-900 font-semibold'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Complete All Now
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      {!completeAllMode && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Day {currentDay} of {totalDays}
            </h3>
            <span className="text-yellow-400 font-semibold">
              {Math.round((currentDay / totalDays) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentDay / totalDays) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        {completeAllMode ? (
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Complete Assessment ({allQuestions.length} questions)
            </h3>
            {allQuestions.map((question, index) => renderQuestion(question, index))}
          </div>
        ) : (
          assessmentData && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                {assessmentData.category.title}
              </h3>
              {assessmentData.category.questions.map((question, index) => renderQuestion(question, index))}
            </div>
          )
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end">
        {completeAllMode ? (
          <button
            onClick={handleCompleteAll}
            disabled={loading || allQuestions.some(q => !responses[q.id])}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-700 text-gray-900 font-bold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Complete Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={loading || !assessmentData?.category.questions.every(q => responses[q.id])}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-700 text-gray-900 font-bold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : currentDay < totalDays ? (
              <>
                <span>Next Day</span>
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                <span>Complete Assessment</span>
                <CheckCircle className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}


