"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GithubIcon, CodeIcon, ZapIcon, AwardIcon, LinkedinIcon, TwitterIcon } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AIDebugLandingPage() {
  const [dotCount, setDotCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      <nav className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg text-white p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">CodeAI Debug</Link>
          <ul className="flex space-x-8">
            <li><Link href="#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
            <li><Link href="#about" className="hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link href="#signup" className="hover:text-blue-400 transition-colors">Sign Up</Link></li>
          </ul>
        </div>
      </nav>

      <header className="py-20 text-center">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Elevate Your Coding Skills with AI
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Master debugging across multiple languages with our AI-powered platform
          </motion.p>
          <Link href="/pages/code">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg transition-all hover:shadow-lg"
            >
              Start Debugging {'.'.repeat(dotCount)}
            </Button>
          </Link>
        </div>
      </header>

      <section id="features" className="py-20 bg-gray-800 bg-opacity-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-12 text-center text-blue-400 font-bold">Our AI-Powered Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CodeIcon className="w-12 h-12 text-blue-400" />}
              title="Multi-Language Support"
              description="Debug popular LeetCode problems in Python, C++, Java, Go, JavaScript, and more."
            />
            <FeatureCard
              icon={<ZapIcon className="w-12 h-12 text-purple-400" />}
              title="Real-Time AI Feedback"
              description="Get instant, AI-powered feedback on your bug fixes to accelerate learning."
            />
            <FeatureCard
              icon={<AwardIcon className="w-12 h-12 text-green-400" />}
              title="Adaptive Challenges"
              description="Face AI-generated bugs tailored to your skill level for continuous improvement."
            />
          </div>
        </div>
      </section>

      <section id="languages" className="py-20 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-8 text-blue-400 font-bold">Supported Languages</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Python", "JavaScript", "Java", "C++", "TypeScript", "Go"].map((lang) => (
              <span
                key={lang}
                className="px-4 py-2 bg-gray-700 rounded-md text-sm transition-all hover:bg-blue-600 hover:shadow-lg"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-800 bg-opacity-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-12 text-center text-blue-400 font-bold">Meet the AI Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TeamMemberCard
              name="Debayan Dey"
              role="AI Research Lead"
              image="https://avatars.githubusercontent.com/u/134854145?v=4"
              description="Specializes in AI-driven code analysis and optimization techniques."
            />
            <TeamMemberCard
              name="Debanjan Mondal"
              role="Machine Learning Engineer"
              image="https://avatars.githubusercontent.com/u/134854145?v=4"
              description="Expert in developing adaptive learning algorithms for personalized coding challenges."
            />
          </div>
        </div>
      </section>

      <section id="signup" className="py-20 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-6 text-blue-400 font-bold">Join the AI Revolution in Coding</h2>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700 text-white border-blue-400"
            />
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all hover:shadow-lg"
            >
              Get Early Access
            </Button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl text-blue-400 font-bold mb-4">CodeAI Debug</h3>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <GithubIcon className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <TwitterIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2023 CodeAI Debug. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <motion.div 
      className="bg-gray-700 p-6 rounded-lg text-center transition-all hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl mb-2 text-blue-300 font-bold">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  )
}

function TeamMemberCard({ name, role, image, description }: any) {
  return (
    <motion.div 
      className="bg-gray-700 p-6 rounded-lg text-center transition-all hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
    >
      <img src={image} alt={name} className="w-24 h-24 mx-auto mb-4 rounded-full object-cover" />
      <h3 className="text-xl mb-2 text-blue-300 font-bold">{name}</h3>
      <h4 className="text-md mb-4 text-purple-400">{role}</h4>
      <p className="text-gray-300 text-sm mb-4">{description}</p>
      <div className="flex justify-center space-x-4">
        <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
          <LinkedinIcon className="w-6 h-6" />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
          <TwitterIcon className="w-6 h-6" />
        </Link>
      </div>
    </motion.div>
  )
}