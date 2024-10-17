"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, Code, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { useRouter } from 'next/navigation'
import { Inter } from 'next/font/google'
import { NavbarComponent } from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    setTheme('dark')
  }, [setTheme])
  const features = [
    { icon: BookOpen, title: 'Visual Learning', description: 'Discover how to enhance your understanding through visual techniques.' },
    { icon: Code, title: 'Problem Puzzles', description: 'Challenge yourself with AI-generated puzzles.' },
    { icon: MessageSquare, title: 'Generative Learning', description: 'Personalized AI-driven learning experiences.' },
    { icon: MessageSquare, title: 'Challenge Yourself', description: 'Generate code according to your level and debug.' },
  ];
  
  const redirectToNextPage = () => {
    router.push('/pages/interface')
  }

  if (!mounted) return null

  return (
    <div className={`min-h-screen bg-background text-foreground ${inter.className}`}>
      <NavbarComponent showBackButton={false} />

      <main className="container mx-auto px-6 py-12 text-center">
        <motion.h2
          className="text-4xl md:text-5xl pb-2 mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Master Your Concept's Like Never Before
        </motion.h2>

        <motion.p
          className="text-xl text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Learn, practice, and excel with our AI-powered learning companion
        </motion.p>

        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="mb-12"
        >
          <Button size="lg" onClick={redirectToNextPage}>
            Start Learning
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <div className="flex flex-wrap lg:flex-nowrap gap-6 mb-12 justify-between">
  {features.map((feature, index) => (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="w-full md:w-[30%] mb-6"
    >
      <Card
        className={`h-full p-4 transition duration-300 border ${
          theme === 'dark' ? 'border-transparent hover:border-white' : 'border-transparent hover:border-black'
        }`}
      >
        <CardHeader>
          <feature.icon className="h-10 w-10 text-primary mb-2" />
          <CardTitle>{feature.title}</CardTitle>
          <CardDescription>{feature.description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  ))}
</div>


        <motion.div
          className={`bg-muted p-8 rounded-lg transition duration-300 border ${
            theme === 'dark' ? 'border-transparent hover:border-white' : 'border-transparent hover:border-black'
          }`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 1.4 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <h3 className="text-2xl font-extralight mb-4">Start Your DSA Journey Today</h3>
          <p className="text-muted-foreground mb-6">Join thousands of learners who have improved their coding skills with our platform</p>
          <Button size="lg" variant="default" onClick={redirectToNextPage}>
            Explore Topics
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          className="mt-12 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <p className="text-sm text-muted-foreground mr-2 mb-0.5 mt-2">Powered by</p>
          <img
            src="https://cdn.freelogovectors.net/wp-content/uploads/2024/02/gemini-logo-chatbot-freelogovectors.net_-640x400.png"
            alt="Gemini Logo"
            className="w-14 h-auto"
          />
        </motion.div>
      </main>

      <footer className="bg-background py-8">
        <div className="mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Daccy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}