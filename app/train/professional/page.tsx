'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function ProfessionalTraining() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
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
      id: 'current_role',
      question: 'What is your current role?',
      type: 'text',
      section: 'Identity & Background'
    },
    {
      id: 'work_experience',
      question: 'How many years of work experience do you have?',
      type: 'select',
      options: ['0–2 years', '3–5 years', '6–10 years', '10+ years'],
      section: 'Identity & Background'
    },
    {
      id: 'career_situation',
      question: 'Which best describes your situation?',
      type: 'select',
      options: ['Early career, figuring things out', 'Mid-level, looking to grow', 'Senior, exploring leadership', 'Entrepreneur / Founder'],
      section: 'Identity & Background'
    },
    
    // Section 2: Personality & Work Style
    {
      id: 'work_style',
      question: 'How would you describe your work style?',
      type: 'select',
      options: ['Structured & planned', 'Flexible & adaptive', 'Collaborative & people-driven', 'Independent & focused'],
      section: 'Personality & Work Style'
    },
    {
      id: 'work_motivation',
      question: 'What motivates you most at work?',
      type: 'multiselect',
      options: ['Learning new skills', 'Career growth / promotion', 'Impact on others / society', 'Financial rewards', 'Recognition / reputation', 'Work-life balance'],
      maxSelections: 2,
      section: 'Personality & Work Style'
    },
    {
      id: 'biggest_strength',
      question: 'What do you consider your biggest strength?',
      type: 'multiselect',
      options: ['Problem-solving', 'Leadership', 'Communication', 'Creativity', 'Discipline', 'Empathy'],
      maxSelections: 2,
      section: 'Personality & Work Style'
    },
    {
      id: 'biggest_weakness',
      question: 'What do you feel is your biggest weakness?',
      type: 'multiselect',
      options: ['Procrastination', 'Overthinking', 'Fear of failure', 'Difficulty focusing', 'Struggles with delegation', 'Stress management'],
      maxSelections: 2,
      section: 'Personality & Work Style'
    },
    {
      id: 'setback_handling',
      question: 'How do you usually handle setbacks at work?',
      type: 'select',
      options: ['Get discouraged easily', 'Reflect, learn, and try again', 'Move on quickly to the next thing'],
      section: 'Personality & Work Style'
    },
    
    // Section 3: Career Growth & Skills
    {
      id: 'career_focus',
      question: 'What is your primary career focus right now?',
      type: 'select',
      options: ['Getting promoted', 'Switching jobs / roles', 'Learning new skills', 'Building a business / side hustle', 'Finding balance & stability'],
      section: 'Career Growth & Skills'
    },
    {
      id: 'upskilling_areas',
      question: 'Which areas are you most interested in upskilling?',
      type: 'multiselect',
      options: ['Technology / Data / AI', 'Management / Leadership', 'Communication & Public Speaking', 'Finance & Investing', 'Marketing & Branding', 'Health & Productivity', 'Entrepreneurship'],
      maxSelections: 3,
      section: 'Career Growth & Skills'
    },
    {
      id: 'time_dedication',
      question: 'How many hours per week can you realistically dedicate to personal/professional growth?',
      type: 'select',
      options: ['1–3 hours', '4–7 hours', '8–12 hours', '12+ hours'],
      section: 'Career Growth & Skills'
    },
    {
      id: 'work_challenge',
      question: 'What\'s the biggest challenge you currently face at work?',
      type: 'select',
      options: ['Lack of clarity in career path', 'Skill gap / need to learn more', 'Heavy workload / burnout', 'Poor work-life balance', 'Limited opportunities for growth'],
      section: 'Career Growth & Skills'
    },
    {
      id: 'master_skill',
      question: 'If you could master one skill in the next 6 months, what would it be?',
      type: 'textarea',
      section: 'Career Growth & Skills'
    },
    
    // Section 4: Emotions & Well-Being
    {
      id: 'career_satisfaction',
      question: 'On a scale of 1–5, how satisfied are you with your current career?',
      type: 'scale',
      min: 1,
      max: 5,
      labels: ['1 (Not satisfied at all)', '2', '3', '4', '5 (Very satisfied)'],
      section: 'Emotions & Well-Being'
    },
    {
      id: 'work_stress',
      question: 'What stresses you the most at work?',
      type: 'multiselect',
      options: ['Deadlines / workload', 'Difficult boss or team dynamics', 'Job insecurity', 'Lack of recognition', 'Future uncertainty'],
      maxSelections: 2,
      section: 'Emotions & Well-Being'
    },
    {
      id: 'stress_response',
      question: 'When stressed, what do you usually do?',
      type: 'select',
      options: ['Talk to friends or family', 'Take a break / exercise', 'Work harder to fix it', 'Keep it to myself'],
      section: 'Emotions & Well-Being'
    },
    {
      id: 'workplace_support',
      question: 'Do you feel supported by your workplace or peers?',
      type: 'select',
      options: ['Yes', 'No', 'Sometimes'],
      section: 'Emotions & Well-Being'
    },
    {
      id: 'work_life_balance',
      question: 'How important is work-life balance for you?',
      type: 'select',
      options: ['Very important', 'Somewhat important', 'Not very important'],
      section: 'Emotions & Well-Being'
    },
    
    // Section 5: Passions & Future Goals
    {
      id: 'energizing_activities',
      question: 'What activities or hobbies keep you energized outside work?',
      type: 'multiselect',
      options: ['Reading / Writing', 'Sports / Fitness', 'Music / Art', 'Gaming', 'Travel / Exploration', 'Volunteering', 'Other'],
      maxSelections: 3,
      section: 'Passions & Future Goals'
    },
    {
      id: 'passion_project',
      question: 'Do you have a passion project or side hustle you want to pursue seriously?',
      type: 'select',
      options: ['Yes', 'No', 'Still figuring it out'],
      section: 'Passions & Future Goals'
    },
    {
      id: 'career_priorities',
      question: 'In your career, what matters most to you?',
      type: 'multiselect',
      options: ['Money', 'Passion', 'Impact on others', 'Recognition', 'Stability', 'Freedom / Flexibility'],
      maxSelections: 2,
      section: 'Passions & Future Goals'
    },
    {
      id: 'unconventional_paths',
      question: 'Do you see yourself open to unconventional career paths (startups, freelancing, creative work)?',
      type: 'select',
      options: ['Yes', 'No', 'Maybe'],
      section: 'Passions & Future Goals'
    },
    {
      id: 'major_goal',
      question: 'What\'s one major thing you want to achieve in your professional or personal life in the next 1–3 years?',
      type: 'textarea',
      section: 'Passions & Future Goals'
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
    console.log('Button clicked!')
    console.log('Responses:', responses)
    setIsSubmitting(true)
    
    localStorage.setItem('trainingResponses', JSON.stringify(responses))
    localStorage.setItem('userType', 'professional')
    
    try {
      console.log('Making API call...')
      const response = await fetch('/api/training/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses,
          userType: 'professional',
          userId: 'temp-user-id'
        })
      })

      console.log('API response:', response.ok)
      if (response.ok) {
        console.log('Responses submitted successfully!')
        console.log('Redirecting to analysis...')
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
                        return
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
            Professional Training
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