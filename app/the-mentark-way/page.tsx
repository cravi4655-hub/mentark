import { ArrowRight, CheckCircle, Users, Target, Brain, Calendar, Sparkles, Zap, Star, Trophy, Lightbulb, TrendingUp, Clock, Heart } from 'lucide-react'

export default function TheMentarkWay() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(250,204,21,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.05),transparent_50%)]"></div>
      
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
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/30 transition-all duration-200 font-medium px-4 py-2 rounded-lg">
              Home
            </a>
            <a href="/the-mentark-way" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">The Mentark Way</a>
            <a href="#train-model" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Train Your Model</a>
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-400/50">
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 mb-8">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-300 text-sm font-medium">The Mentark Philosophy</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-white">The Mentark Way:</span><br />
            <span className="text-yellow-400">
              From Uncertainty to Clarity
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            We believe mentorship should be accessible, adaptive, and actionable. The Mentark Way combines human psychology, AI reasoning, and structured planning to turn your goals into reality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="/#train-model" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold text-lg px-10 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-400/50">
              Start Your Journey
            </a>
            <a href="/inside-mentark" className="text-gray-300 hover:text-yellow-400 transition-colors text-lg px-10 py-4 border border-yellow-500/40 rounded-xl hover:border-yellow-400/60 hover:bg-yellow-500/10 backdrop-blur-sm">
              Inside Mentark
            </a>
          </div>
        </div>
      </section>

      {/* The 5 Steps */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              The <span className="text-yellow-400">5-Step</span> Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A proven process that transforms overwhelming goals into achievable milestones
            </p>
          </div>
          
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <span className="text-2xl font-bold text-gray-900">1</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white ml-6">Understand You</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  A quick onboarding captures your role (student or professional), your goals, and how you like to be guided. We learn your learning style, motivation triggers, and current challenges.
                </p>
                <div className="mt-6 flex items-center text-yellow-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">2-3 minutes</span>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-yellow-400 mr-3" />
                    <span className="text-white font-semibold">Personalized Assessment</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-yellow-400 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-gray-300 text-sm">Understanding your unique profile...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Target className="w-8 h-8 text-yellow-400 mr-3" />
                    <span className="text-white font-semibold">AI Roadmap Generation</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Phase 1: Foundation</span>
                      <span className="text-yellow-400">3 tasks</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Phase 2: Growth</span>
                      <span className="text-yellow-400">4 tasks</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Phase 3: Mastery</span>
                      <span className="text-yellow-400">3 tasks</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <span className="text-2xl font-bold text-gray-900">2</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white ml-6">Break It Down</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Big, overwhelming goals are transformed into phase-based roadmaps with clear, achievable tasks. Each task is designed to be completed in 1-3 hours with specific deadlines.
                </p>
                <div className="mt-6 flex items-center text-yellow-400">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">3 phases, 10 tasks total</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <span className="text-2xl font-bold text-gray-900">3</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white ml-6">Stay on Track</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  With nudges, streaks, and task reminders, Mentark helps you build consistency and accountability. Daily check-ins and progress tracking keep you motivated.
                </p>
                <div className="mt-6 flex items-center text-yellow-400">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Daily accountability</span>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-8 h-8 text-yellow-400 mr-3" />
                    <span className="text-white font-semibold">Progress Tracking</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Today's Tasks</span>
                      <span className="text-yellow-400 text-sm font-bold">2/3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Current Streak</span>
                      <span className="text-yellow-400 text-sm font-bold">7 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Weekly Progress</span>
                      <span className="text-yellow-400 text-sm font-bold">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Brain className="w-8 h-8 text-yellow-400 mr-3" />
                    <span className="text-white font-semibold">Weekly Review</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      <span className="text-gray-300 text-sm">3 tasks completed</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      <span className="text-gray-300 text-sm">1 blocker identified</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-gray-300 text-sm">Focus area updated</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <span className="text-2xl font-bold text-gray-900">4</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white ml-6">Reflect & Adapt</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Weekly reviews show your wins, blockers, and focus areas. Mentark remembers — adapting your roadmap as you evolve and your priorities change.
                </p>
                <div className="mt-6 flex items-center text-yellow-400">
                  <Heart className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Personalized adaptation</span>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <span className="text-2xl font-bold text-gray-900">5</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white ml-6">Grow Continuously</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Mentark doesn't reset each week. It builds on your journey, becoming a mentor that evolves with you. Your progress compounds over time.
                </p>
                <div className="mt-6 flex items-center text-yellow-400">
                  <Star className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Lifelong growth</span>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
                    <span className="text-white font-semibold">Growth Journey</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Goals Achieved</span>
                      <span className="text-yellow-400 text-sm font-bold">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Skills Developed</span>
                      <span className="text-yellow-400 text-sm font-bold">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Months Active</span>
                      <span className="text-yellow-400 text-sm font-bold">6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 py-24 bg-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-white">This is more than productivity.</span><br />
            <span className="text-yellow-400">This is mentorship reimagined for the modern world.</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Empathetic</h3>
              <p className="text-gray-300 text-sm">Understanding your unique journey and challenges</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intelligent</h3>
              <p className="text-gray-300 text-sm">AI that learns and adapts to your progress</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Actionable</h3>
              <p className="text-gray-300 text-sm">Clear steps that lead to real results</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-white">Ready to start your</span><br />
            <span className="text-yellow-400">Mentark journey?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of students and professionals who are already turning uncertainty into clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="/#train-model" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-bold text-lg px-12 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-400/50">
              Train Your Model
            </a>
            <button className="text-gray-300 hover:text-yellow-400 transition-colors text-lg px-12 py-4 border border-yellow-500/40 rounded-xl hover:border-yellow-400/60 hover:bg-yellow-500/10 backdrop-blur-sm">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 border-t border-gray-700 bg-gray-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-400/50 transition-all duration-300 group-hover:scale-105">
              <span className="text-gray-900 font-bold">M</span>
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
              MENTARK
            </span>
          </div>
          <p className="text-gray-400">
            © 2024 Mentark. Your personal AI mentor for life.
          </p>
        </div>
      </footer>
    </div>
  )
}