'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Send, Search, Database, Code, Cpu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NavbarComponent } from '@/components/navbar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

type Topic = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: string
}

const topics: Topic[] = [
  { id: 'arrays', title: 'Arrays and Strings', description: 'Fundamental data structures for storing collections of elements.', icon: <Database className="h-6 w-6" />, category: 'Data Structures' },
  { id: 'linkedlists', title: 'Linked Lists', description: 'Linear data structures with nodes pointing to the next element.', icon: <Database className="h-6 w-6" />, category: 'Data Structures' },
  { id: 'trees', title: 'Trees and Graphs', description: 'Hierarchical and interconnected data structures.', icon: <Database className="h-6 w-6" />, category: 'Data Structures' },
  { id: 'sorting', title: 'Sorting Algorithms', description: 'Methods for arranging data in a specific order.', icon: <Code className="h-6 w-6" />, category: 'Algorithms' },
  { id: 'searching', title: 'Searching Algorithms', description: 'Techniques for finding specific elements in data structures.', icon: <Code className="h-6 w-6" />, category: 'Algorithms' },
  { id: 'dynamic', title: 'Dynamic Programming', description: 'Solving complex problems by breaking them into simpler subproblems.', icon: <Cpu className="h-6 w-6" />, category: 'Advanced Concepts' },
  { id: 'greedy', title: 'Greedy Algorithms', description: 'Making locally optimal choices at each stage for a global optimum.', icon: <Cpu className="h-6 w-6" />, category: 'Advanced Concepts' },
  { id: 'backtracking', title: 'Backtracking', description: 'Solving problems incrementally and undoing choices that fail.', icon: <Cpu className="h-6 w-6" />, category: 'Advanced Concepts' },
]

const languages = [
  'Python', 'JavaScript', 'Java', 'C++', 'Ruby', 'Go', 'Swift', 'Kotlin', 'TypeScript', 'Rust'
]

export default function LearningInterfaceComponent() {
  const [mounted, setMounted] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [language, setLanguage] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic)
    setShowChat(false)
    setMessages([])
  }

  const handleLanguageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (language && selectedTopic) {
      setShowChat(true)
      setMessages([{ content: `Welcome! I'm ready to help you learn about ${selectedTopic.title} in ${language}. What would you like to know?`, isUser: false }])
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !selectedTopic) return

    const userMessage = { content: inputMessage, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/genAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage, selectedTopic: selectedTopic.id }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const aiMessage = { content: data.reply, isUser: false }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = { content: 'Sorry, an error occurred. Please try again.', isUser: false }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!mounted) return null

  return (
    <div className={`min-h-screen bg-background text-foreground ${inter.className}`}>
      <NavbarComponent />

      <main className="container mx-auto px-6 py-1 mb-2">
        <div className="flex flex-col md:flex-row gap-6 mt-2">
          {/* Topics Grid (Left Side) */}
          <Card className="w-full md:w-1/3 lg:w-1/4 bg-card">
            <CardHeader>
              <CardTitle>Learning Topics</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredTopics.map((topic) => (
                    <motion.div
                      key={topic.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-pointer p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center aspect-square ${selectedTopic?.id === topic.id ? 'bg-primary text-primary-foreground' : 'bg-card-foreground/10'
                        }`}
                      onClick={() => handleTopicSelect(topic)}
                    >
                      <div className="mb-2">{topic.icon}</div>
                      <h3 className="font-semibold mb-1 text-sm">{topic.title}</h3>
                      <p className="text-xs">{topic.category}</p>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Main content area */}
          <Card className="flex-1">
            <CardContent className="p-6">
              {!selectedTopic && (
                <motion.p
                  className="text-xl text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Select a topic from the left to start learning.
                </motion.p>
              )}
              {selectedTopic && !showChat && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl mb-4">{selectedTopic.title}</h2>
                  <p className="mb-6">{selectedTopic.description}</p>
                  <form onSubmit={handleLanguageSubmit} className="flex gap-2">
                    <Select onValueChange={setLanguage} value={language}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="submit" disabled={!language}>
                      Start Learning
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </motion.div>
              )}
              {showChat && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-[calc(100vh-11rem)] flex flex-col"
                >
                  <ScrollArea className="flex-grow mb-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-4 p-3 rounded-lg ${message.isUser ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'
                          } max-w-[80%]`}
                      >
                        <div className='font-sans whitespace-pre-wrap break-words'> {/* Changed from <pre> to <div> */}
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex gap-2 ">
                    <Input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                      placeholder="Ask a question..."
                      className="flex-grow"
                      disabled={isLoading}
                    />
                    <Button onClick={sendMessage} disabled={isLoading}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}