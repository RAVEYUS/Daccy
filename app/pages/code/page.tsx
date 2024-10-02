'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, Code, MessageSquare, Moon, Sun, BugIcon, GhostIcon, LightbulbIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Inter } from 'next/font/google'
import { useTheme } from "next-themes"
import Link from 'next/link'
import Editor from "@monaco-editor/react"
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function AIDebugChallenge() {
  const [email, setEmail] = useState('')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const [level, setLevel] = useState<string>('')
  const [language, setLanguage] = useState<string>('')
  const [buggyCode, setBuggyCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [dotCount, setDotCount] = useState(0)
  const [suggestion, setSuggestion] = useState<string>('')

  useEffect(() => {
    setMounted(true)
    setTheme('dark')
  }, [setTheme])

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  const [result, setResult] = useState<string>("");
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "524ecc0c-e8cc-4679-bb4a-d46740a2bbad");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Thanks for joining");
        setEmail('');
        event.currentTarget.reset();
      } else {
        console.error("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      setResult("An error occurred. Please try again.");
    }
  };

  const handleGenerate = async () => {
    if (!level || !language) {
      setError('Please select both level and language.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-buggy-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level, language }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate buggy code');
      }

      const data = await response.json();
      setBuggyCode(data.buggyCode);
      setSuggestion(data.suggestion || 'Try to identify and fix the bug in the code!');
    } catch (err) {
      console.error('Detailed error:', err);
      setError('An error occurred while generating the buggy code. Please try again.');
    } finally {
      setLoading(false);
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
        <h1 className="text-2xl">AI Debug Challenge</h1>
        <nav className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button><Link href="/">Back to Home</Link></Button>
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GhostIcon className="mr-2 h-5 w-5" />
                  Choose Your Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="level" className="block mb-2 text-sm font-medium">Select Difficulty:</label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="master">Master</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="language" className="block mb-2 text-sm font-medium">Select Language:</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  onClick={handleGenerate}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>Generating Bugs {'.'.repeat(dotCount)}</>
                  ) : (
                    <>
                      <BugIcon className="mr-2 h-5 w-5" />
                      Generate Buggy Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LightbulbIcon className="mr-2 h-5 w-5" />
                  Suggestion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{suggestion || 'Generate a buggy code to get a suggestion!'}</p>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3 space-y-6">
            {error && (
              <Card>
                <CardContent>
                  <p className="text-red-500">{error}</p>
                </CardContent>
              </Card>
            )}

            {buggyCode && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-5 w-5" />
                    Buggy Code Generated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md overflow-x-auto">
                    <Editor height="60vh" theme={theme === 'dark' ? 'vs-dark' : 'light'} language={language} value={buggyCode} />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

      </main>


    </div>
  )
}