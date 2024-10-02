"use client"

import { useState, useEffect, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, Code, MessageSquare, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Inter } from 'next/font/google'
import { useTheme } from "next-themes"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTheme('dark')
  }, [setTheme])

  const [result, setResult] = useState<string>("");
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "524ecc0c-e8cc-4679-bb4a-d46740a2bbad"); // Replace with your actual access key

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("thanks for joining");
        setEmail(''); // Reset the email state
        event.currentTarget.reset(); // Reset the form fields
      } else {
        console.error("Error", data);
        setResult(data.message); // Display error message if form submission fails
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      setResult("An error occurred. Please try again."); // Handle fetch error
    }
  };

  const features = [
    { icon: BookOpen, title: 'Comprehensive DSA Topics', description: 'Learn everything from basic arrays to advanced graph algorithms.' },
    { icon: Code, title: 'Interactive Coding Challenges', description: 'Practice your skills with our real-time coding environment.' },
    { icon: MessageSquare, title: 'AI-Powered Assistance', description: 'Get personalized help and explanations from our AI tutor.' },
  ]

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) return null

  return (
    <div className={`min-h-screen bg-background text-foreground ${inter.className}`}>
      <header className="p-6 ml-4 flex justify-between items-center">
        <h1 className="text-2xl"><Link href="/">Daccy</Link></h1>
        <nav className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {/* <Button variant="ghost">Try Beta</Button> */}
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button><Link href="/pages/interface">Try Beta</Link></Button>
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12 text-center">
        <motion.h2
          className="text-4xl md:text-5xl pb-2 mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Master Data Structures & Algorithms
        </motion.h2>

        <motion.p
          className="text-xl text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Learn, practice, and excel with our AI-powered learning companion
        </motion.p>

        {/* New "Try the Beta" button */}
        {/* New "Try the Beta" button */}
        {/* <Button
          variant="outline"
          className="border-primary mb-11 text-primary transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          Try the Beta
        </Button> */}


        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto"
            required
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" type="submit">
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </form>

        <div className="flex flex-wrap gap-6 mb-12 justify-between">
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
                className={`h-full p-4 transition duration-300 border ${theme === 'dark' ? 'border-transparent hover:border-white' : 'border-transparent hover:border-black'
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
          className={`bg-muted p-8 rounded-lg transition duration-300 border ${theme === 'dark' ? 'border-transparent hover:border-white' : 'border-transparent hover:border-black'
            }`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 1.4 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <h3 className="text-2xl font-extralight mb-4">Start Your DSA Journey Today</h3>
          <p className="text-muted-foreground mb-6">Join thousands of learners who have improved their coding skills with our platform</p>
          <Button size="lg" variant="default">
            Explore Topics
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2024 DSA Companion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}