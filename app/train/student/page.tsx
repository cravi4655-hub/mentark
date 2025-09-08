'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

interface QuestionResponses {
  [key: string]: any
}

export default function StudentTraining() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<QuestionResponses>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const questions = [
    // Section 1: Identity & Background
    {
      id: 'full_name',
      question: 'What is your full name?',
      type: 'text',
      section: 'Identity & Background'
    },
    {
      id: 'age',
      question: 'How old are you?',
      type: 'number',
      section: 'Identity & Background'
    },
    {
      id: 'class',
      question: 'Which class are you in?',
      type: 'select',
      options: ['7th', '8th', '9th', '10th', '11th', '12th'],
      section: 'Identity & Background'
    },
    {
      id: 'school_type',
      question: 'What type of school do you go to?',
      type: 'select',
      options: ['Public', 'Private', 'Boarding', 'Online / Remote'],
      section: 'Identity & Background'
    },
    {
      id: 'location',
      question: 'Where do you live?',
      type: 'select',
      options: ['City', 'Town', 'Village'],
      section: 'Identity & Background'
    },
    
    // Section 2: Personality & Self-Perception
    {
      id: 'friend_description',
      question: 'If your friends had to describe you in one word, what would they say?',
      type: 'select',
      options: ['Funny', 'Smart', 'Kind', 'Hardworking', 'Creative', 'Quiet'],
      section: 'Personality & Self-Perception'
    },
    {
      id: 'express_thoughts',
      question: 'Do you find it easy to express your thoughts and feelings?',
      type: 'select',
      options: ['Yes', 'No', 'Sometimes'],
      section: 'Personality & Self-Perception'
    },
    {
      id: 'biggest_strength',
      question: 'What do you consider your biggest strength?',
      type: 'multiselect',
      options: ['Creativity', 'Discipline', 'Leadership', 'Empathy', 'Curiosity', 'Problem solving'],
      maxSelections: 2,
      section: 'Personality & Self-Perception'
    },
    {
      id: 'biggest_weakness',
      question: 'What do you feel is your biggest weakness?',
      type: 'multiselect',
      options: ['Procrastination', 'Overthinking', 'Fear of failure', 'Low self-confidence', 'Difficulty focusing'],
      maxSelections: 2,
      section: 'Personality & Self-Perception'
    },
    {
      id: 'failure_reaction',
      question: 'When you fail at something important, how do you usually react?',
      type: 'select',
      options: ['I get discouraged easily', 'I learn and try again', 'I ignore it and move on'],
      section: 'Personality & Self-Perception'
    },
    
    // Section 3: Learning & Interests
    {
      id: 'enjoy_subjects',
      question: 'Which subjects do you enjoy learning the most?',
      type: 'multiselect',
      options: ['Math', 'Science', 'Social Science', 'English', 'Languages (Hindi/French/etc.)', 'Computer Science', 'Art / Music', 'Sports / Physical Education'],
      maxSelections: 3,
      section: 'Learning & Interests'
    },
    {
      id: 'challenging_subjects',
      question: 'Which subjects do you find most challenging?',
      type: 'multiselect',
      options: ['Math', 'Science', 'Social Science', 'English', 'Languages', 'Computer Science', 'Art / Music', 'Sports / Physical Education'],
      maxSelections: 3,
      section: 'Learning & Interests'
    },
    {
      id: 'exam_preparation',
      question: 'How do you usually prepare for exams?',
      type: 'select',
      options: ['Last-minute cramming', 'Regular schedule & revisions', 'Group studies', 'I don\'t prepare much'],
      section: 'Learning & Interests'
    },
    {
      id: 'enjoy_learning_outside',
      question: 'Do you enjoy learning new things outside school?',
      type: 'select',
      options: ['Yes', 'No', 'Only if it interests me'],
      section: 'Learning & Interests'
    },
    {
      id: 'skill_to_improve',
      question: 'What\'s one skill or hobby you\'d love to get better at?',
      type: 'select',
      options: ['Reading & Writing', 'Sports', 'Art / Music', 'Coding / Tech', 'Public Speaking', 'Time Management', 'Other'],
      section: 'Learning & Interests'
    },
    
    // Section 4: Emotions & Well-Being
    {
      id: 'happiness_scale',
      question: 'On a scale of 1–5, how happy do you feel on most days?',
      type: 'scale',
      min: 1,
      max: 5,
      labels: ['1 (Very unhappy)', '2', '3', '4', '5 (Very happy)'],
      section: 'Emotions & Well-Being'
    },
    {
      id: 'stress_factors',
      question: 'What stresses you out the most?',
      type: 'multiselect',
      options: ['Exams', 'Parents\' expectations', 'Peer pressure', 'Future worries', 'Relationships', 'Other'],
      maxSelections: 2,
      section: 'Emotions & Well-Being'
    },
    {
      id: 'support_person',
      question: 'When you\'re upset, who do you usually turn to?',
      type: 'select',
      options: ['Parents', 'Friends', 'Teacher / Mentor', 'No one'],
      section: 'Emotions & Well-Being'
    },
    {
      id: 'feel_understood',
      question: 'Do you feel understood and supported by people around you?',
      type: 'select',
      options: ['Yes', 'No', 'Sometimes'],
      section: 'Emotions & Well-Being'
    },
    {
      id: 'hobbies_help_relax',
      question: 'Do your hobbies or passions help you relax when life feels heavy?',
      type: 'select',
      options: ['Yes', 'No', 'Sometimes'],
      section: 'Emotions & Well-Being'
    },
    
    // Section 5: Passions & Future
    {
      id: 'favorite_hobbies',
      question: 'What are your favourite hobbies or activities?',
      type: 'multiselect',
      options: ['Reading', 'Sports', 'Music / Art', 'Gaming', 'Dancing', 'Writing', 'Watching content (YouTube/Netflix/etc.)', 'Other'],
      maxSelections: 3,
      section: 'Passions & Future'
    },
    {
      id: 'proud_achievement',
      question: 'Have you ever created or achieved something you\'re truly proud of?',
      type: 'select',
      options: ['Yes', 'No', 'Not yet, but I want to'],
      section: 'Passions & Future'
    },
    {
      id: 'future_career_knowledge',
      question: 'Do you already know what you want to be when you grow up?',
      type: 'select',
      options: ['Yes', 'No', 'I have a few ideas'],
      section: 'Passions & Future'
    },
    {
      id: 'career_priorities',
      question: 'What matters most to you in your future career?',
      type: 'multiselect',
      options: ['Money', 'Passion', 'Impact on others', 'Recognition', 'Stability'],
      maxSelections: 2,
      section: 'Passions & Future'
    },
    {
      id: 'life_goal',
      question: 'What\'s one thing you deeply want to achieve in your life, no matter how big or small?',
      type: 'textarea',
      section: 'Passions & Future'
    }
  ]

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/training/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses,
          userType: 'student',
          userId: 'temp-user-id'
        })
      })

      if (response.ok) {
        console.log('Responses submitted successfully!')
        window.location.href = '/analysis'
      }
    } catch (error) {
      console.error('Error submitting responses:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100
  const currentSection = currentQuestion.section

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'text':
        return (
          <input
            type="text"
            value={responses[currentQuestion.id] || ''}
            onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
            className="w-full p-6 text-2xl bg-gray-800 border-2 border-yellow-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            placeholder="Type your answer here..."
          />
        )
      
      case 'number':
        return (
          <input
            type="number"
            value={responses[currentQuestion.id] || ''}
            onChange={(e) => handleResponse(currentQuestion.id, parseInt(e.target.value))}
            className="w-full p-6 text-2xl bg-gray-800 border-2 border-yellow-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            placeholder="Enter your age..."
          />
        )
      
      case 'textarea':
        return (
          <textarea
            value={responses[currentQuestion.id] || ''}
            onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
            className="w-full p-6 text-xl bg-gray-800 border-2 border-yellow-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none h-32 resize-none"
            placeholder="Share your thoughts..."
          />
        )
      
      case 'select':
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleResponse(currentQuestion.id, option)}
                className={`w-full p-6 text-2xl font-semibold rounded-2xl transition-all duration-200 ${
                  responses[currentQuestion.id] === option
                    ? 'bg-yellow-500 text-gray-900 border-2 border-yellow-400'
                    : 'bg-gray-800 text-white border-2 border-gray-700 hover:border-yellow-500/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )
      
      case 'multiselect':
        const selectedValues = responses[currentQuestion.id] || []
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => {
              const isSelected = selectedValues.includes(option)
              return (
                <button
                  key={index}
                  onClick={() => {
                    let newValues = [...selectedValues]
                    if (isSelected) {
                      newValues = newValues.filter(v => v !== option)
                    } else {
                      if (currentQuestion.maxSelections && newValues.length >= currentQuestion.maxSelections) {
                        return // Don't add if max selections reached
                      }
                      newValues.push(option)
                    }
                    handleResponse(currentQuestion.id, newValues)
                  }}
                  className={`w-full p-6 text-2xl font-semibold rounded-2xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-yellow-500 text-gray-900 border-2 border-yellow-400'
                      : 'bg-gray-800 text-white border-2 border-gray-700 hover:border-yellow-500/50'
                  }`}
                >
                  {option}
                  {currentQuestion.maxSelections && (
                    <span className="text-lg ml-2">
                      ({selectedValues.length}/{currentQuestion.maxSelections})
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )
      
      case 'scale':
        return (
          <div className="space-y-6">
            <div className="flex justify-between text-xl text-gray-300">
              <span>{currentQuestion.labels?.[0]}</span>
              <span>{currentQuestion.labels?.[currentQuestion.labels.length - 1]}</span>
            </div>
            <div className="flex justify-center space-x-4">
              {Array.from({ length: (currentQuestion.max || 5) - (currentQuestion.min || 1) + 1 }, (_, i) => {
                const value = (currentQuestion.min || 1) + i
                return (
                  <button
                    key={value}
                    onClick={() => handleResponse(currentQuestion.id, value)}
                    className={`w-16 h-16 text-2xl font-bold rounded-2xl transition-all duration-200 ${
                      responses[currentQuestion.id] === value
                        ? 'bg-yellow-500 text-gray-900 border-2 border-yellow-400'
                        : 'bg-gray-800 text-white border-2 border-gray-700 hover:border-yellow-500/50'
                    }`}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(250,204,21,0.1),transparent_50%)]"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 border-b border-yellow-500/20 bg-gray-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-400/50 transition-all duration-300 group-hover:scale-105">
              <span className="text-gray-900 font-bold text-xl">M</span>
            </div>
            <span className="text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
              MENTARK
            </span>
          </div>
          <div className="text-yellow-400 text-xl font-semibold">
            Student Training
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="relative z-10 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-white">
              {currentSection}
            </span>
            <span className="text-xl text-yellow-400 font-semibold">
              {currentStep + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Section */}
      <section className="relative px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 leading-tight">
              {currentQuestion.question}
            </h2>
            
            <div className="mb-12">
              {renderQuestion()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl text-xl font-semibold transition-all duration-200 ${
                  currentStep === 0
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Previous</span>
              </button>

              {currentStep === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold text-xl px-12 py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-400/50 disabled:opacity-50"
                >
                  {isSubmitting ? 'Analyzing...' : 'Complete Training'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold text-xl px-8 py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-400/50 flex items-center space-x-3"
                >
                  <span>Next</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}