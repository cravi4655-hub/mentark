import Image from 'next/image'
import { ArrowRight, CheckCircle, Users, Target, Brain, Calendar, Sparkles, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Innovative Background Effects */}
      <div className="absolute inset-0">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>
      </div>
      
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
            <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Home</a>
            <a href="#train-model" className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/30 transition-all duration-200 font-medium px-4 py-2 rounded-lg">
              Train Your Model
            </a>
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
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">AI-Powered Mentorship</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-white drop-shadow-lg">The Mentor You Always Needed,</span><br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Now Powered by AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-16 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            Mentark is your lifelong AI mentor — helping students and professionals turn uncertainty into clarity with personalized roadmaps, tasks, and guidance that grows with you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50">
              Join the Waitlist
            </button>
            <button className="text-gray-200 hover:text-blue-400 transition-colors text-lg px-10 py-4 border border-blue-500/40 rounded-xl hover:border-blue-400/60 hover:bg-blue-500/10 backdrop-blur-sm">
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Train Your Model Section */}
      <section id="train-model" className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="text-white drop-shadow-lg">Train Your Model — </span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
                Choose Your Path
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Student Option */}
            <div className="bg-black/60 backdrop-blur-md border border-blue-500/30 rounded-2xl p-10 hover:border-blue-400/50 transition-all duration-300 group hover:bg-black/80 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/30">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-md">Study Smarter, Build Confidence</h3>
                <p className="text-gray-200 mb-10 leading-relaxed text-lg drop-shadow-sm">
                  From exam prep to career choices, Mentark helps you break down goals into clear study plans and actionable tasks — so you achieve more with less stress.
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold w-full py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/30">
                  I'm a Student <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
              </div>
            </div>

            {/* Professional Option */}
            <div className="bg-black/60 backdrop-blur-md border border-blue-500/30 rounded-2xl p-10 hover:border-blue-400/50 transition-all duration-300 group hover:bg-black/80 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-md">Level Up Your Career</h3>
                <p className="text-gray-200 mb-10 leading-relaxed text-lg drop-shadow-sm">
                  Whether you're upskilling, switching roles, or driving workplace goals, Mentark structures your path with personalized roadmaps, accountability, and weekly reviews that keep you moving forward.
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold w-full py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/30">
                  I'm a Professional <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Why <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">Mentark</span> Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black/60 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 text-center hover:border-blue-400/50 transition-all duration-300 hover:bg-black/80 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 drop-shadow-md">Personalized Roadmaps</h3>
              <p className="text-gray-200 text-sm drop-shadow-sm">
                Turn big goals into clear, achievable steps with AI-generated plans tailored to students and professionals.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 text-center hover:border-blue-400/50 transition-all duration-300 hover:bg-black/80 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 drop-shadow-md">Your Mentor That Remembers</h3>
              <p className="text-gray-200 text-sm drop-shadow-sm">
                Mentark keeps track of your progress, reflections, and challenges — like a lifelong coach who knows your journey.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 text-center hover:border-blue-400/50 transition-all duration-300 hover:bg-black/80 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 drop-shadow-md">Action + Accountability</h3>
              <p className="text-gray-200 text-sm drop-shadow-sm">
                Daily nudges, streaks, and micro-tasks ensure you not only plan but also follow through.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 text-center hover:border-blue-400/50 transition-all duration-300 hover:bg-black/80 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 drop-shadow-md">Weekly Reflection</h3>
              <p className="text-gray-200 text-sm drop-shadow-sm">
                Learn from your week — celebrate wins, adjust blockers, and refocus with your mentor's guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              How It <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">Works</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Create Your Ark</h3>
              <p className="text-gray-200 drop-shadow-sm">
                Answer a short onboarding, define your first goal.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Get Your Roadmap</h3>
              <p className="text-gray-200 drop-shadow-sm">
                AI breaks it into phases and concrete tasks.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Grow With Your Mentor</h3>
              <p className="text-gray-200 drop-shadow-sm">
                Daily nudges, task tracking, and weekly reviews keep you accountable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-white drop-shadow-lg">Your journey deserves clarity.</span><br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
              Your goals deserve a mentor.
            </span>
          </h2>
          
          <p className="text-xl text-gray-200 mb-16 drop-shadow-sm">
            Students and professionals — join the Mentark waitlist today.
          </p>
          
          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-lg px-16 py-5 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50">
            Join the Waitlist
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 border-t border-blue-500/30 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-400/50 transition-all duration-300">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-cyan-200 transition-all duration-300">
              MENTARK
            </span>
          </div>
          <p className="text-gray-300">
            © 2024 Mentark. Your personal AI mentor for life.
          </p>
        </div>
      </footer>
    </div>
  )
}