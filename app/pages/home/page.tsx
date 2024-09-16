"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GithubIcon, CodeIcon, ZapIcon, AwardIcon, LinkedinIcon, TwitterIcon } from "lucide-react"
import Link from "next/link"
import { GlareCard } from '@/components/ui/glare-card'
import FeatureCard from '@/components/ui/FeatureCard'

export default function PacmanLandingPage() {
  const [dotCount, setDotCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        body {
          font-family: 'Press Start 2P', cursive;
        }
        .pacman-bg {
          background-image: 
            radial-gradient(circle, #ffff00 3px, transparent 4px),
            radial-gradient(circle, #ffff00 3px, transparent 4px);
          background-size: 60px 60px;
          background-position: 0 0, 30px 30px;
          animation: moveDots 4s linear infinite;
        }
        @keyframes moveDots {
          0% { background-position: 0 0, 30px 30px; }
          100% { background-position: 60px 60px, 90px 90px; }
        }
        .pixel-border {
          box-shadow: 
            0 0 0 2px #000,
            0 0 0 4px #ffff00;
        }
        .pixel-character {
          image-rendering: pixelated;
        }
      `}</style>

      <div className="pacman-bg absolute inset-0 opacity-10"></div>

      <nav className="bg-yellow-500 text-black p-4 sticky top-0 z-50">
        <div className="flex mx-7 justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Paccy</Link>
          <ul className="flex space-x-8 ">
            <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#signup" className="hover:text-white transition-colors">Sign Up</Link></li>
          </ul>
        </div>
      </nav>

      <header className="py-20 text-center relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl mb-6 text-yellow-400 font-bold">Paccy: Learn from Errors</h1>
          <p className="text-xl mb-8 text-blue-400">Level up your coding skills by fixing bugs across multiple languages</p>
          <Link href="/pages/code">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg transition-transform hover:scale-110"
            >
              Start Debugging {'.'.repeat(dotCount)}
            </Button>
          </Link>
        </div>
      </header>

      <section id="features" className="py-20 bg-gray-900 bg-opacity-80 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-12 text-center text-yellow-400 font-bold">What we bring to the game</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CodeIcon className="w-12 h-12 text-blue-400" />}
              title="Multi-Language Support"
              description="Learn by debugging popular LeetCode problems in Python, C++, Java, GO, JavaScript and more to expand your skills across various programming languages."
            />
            <FeatureCard
              icon={<ZapIcon className="w-12 h-12 text-green-400" />}
              title="Real-Time Feedback"
              description="Leveraging AI to get instant feedback on your bug fixes. Learn from mistakes and improve rapidly."
            />
            <FeatureCard
              icon={<AwardIcon className="w-12 h-12 text-red-500" />}
              title="Skill-Based Challenges"
              description="Face increasingly difficult bugs as you level up. Tailored challenges based on your proficiency."
            />
            
          </div>
        </div>
      </section>

      <section id="languages" className="py-20 bg-gray-950 bg-opacity-80 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-8 text-yellow-400 font-bold">Supported Languages</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Python", "JavaScript", "Java", "C++", "js", "Go"].map((lang) => (
              <span
                key={lang}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm transition-transform hover:scale-110"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-900 bg-opacity-80 relative z-10 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-12 text-center text-yellow-400 font-bold">Meet the  Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProgrammerCard
              name="Debayan Dey"
              role="Lead Bug Buster"
              image="https://avatars.githubusercontent.com/u/134854145?v=4"
              description="Pete has been chomping bugs since the 8-bit era. He's our go-to guy for all things debugging."
            />
            <ProgrammerCard
              name="Debanjan Mondal"
              role="Code Optimization Wizard"
              image="https://avatars.githubusercontent.com/u/134854145?v=4"
              description="Gwen turns spaghetti code into perfectly optimized algorithms. She's the ghost that haunts inefficient code."
            />
          </div>
        </div>
      </section>

      <section id="signup" className="py-20 bg-gray-950 bg-opacity-80 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-6 text-yellow-400 font-bold">Join the Beta</h2>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-white border-yellow-400"
            />
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold transition-transform hover:scale-110"
            >
              Power Up!
            </Button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-950 py-12 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl text-yellow-400 font-bold mb-4">Paccy</h3>
              {/* <p className="text-sm max-w-xs text-blue-400">Empowering developers to squash bugs and level up their coding skills.</p> */}
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <GithubIcon className="w-6 h-6" />
              </Link>
              {/* <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <CodeIcon className="w-6 h-6" />
              </Link> */}
              <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <TwitterIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>&copy; 2023 Pac-Debug. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-yellow-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


function ProgrammerCard({ name, role, image, description }: any) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center transition-transform ">
      <img src={image} alt={name} className="w-24 h-24 mx-auto mb-4 rounded-lg pixel-character" />
      <h3 className="text-xl mb-2 text-yellow-400 font-bold">{name}</h3>
      <h4 className="text-md mb-4 text-blue-400">{role}</h4>
      <p className="text-green-400 text-sm mb-4">{description}</p>
      <div className="flex justify-center space-x-4">
        <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
          <LinkedinIcon className="w-6 h-6" />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
          <TwitterIcon className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}