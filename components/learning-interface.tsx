'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, Code, MessageSquare, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { NavbarComponent } from '@/components/navbar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const topics = [
  { id: 'arrays', title: 'Arrays and Strings', description: 'Fundamental data structures for storing collections of elements.' },
  { id: 'linkedlists', title: 'Linked Lists', description: 'Linear data structures with nodes pointing to the next element.' },
  { id: 'trees', title: 'Trees and Graphs', description: 'Hierarchical and interconnected data structures.' },
  { id: 'sorting', title: 'Sorting Algorithms', description: 'Methods for arranging data in a specific order.' },
]

export function LearningInterfaceComponent() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [language, setLanguage] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>([])
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    setMounted(true)
    setTheme('dark')
  }, [setTheme])

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId)
    setShowChat(false)
    setMessages([])
  }

  const handleLanguageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (language.trim()) {
      setShowChat(true)
      setMessages([{ content: `Welcome! I'm ready to help you learn about ${topics.find(t => t.id === selectedTopic)?.title} in ${language}. What would you like to know?`, isUser: false }])
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = { content: inputMessage, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simulated AI response - replace with actual API call
    setTimeout(() => {
      const aiMessage = { content: `Here's some information about ${inputMessage} related to ${topics.find(t => t.id === selectedTopic)?.title}: [Simulated AI response]`, isUser: false }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  if (!mounted) return null

  return (
    <div className={`min-h-screen bg-background text-foreground ${inter.className}`}>
      <NavbarComponent />

      <main className="container mx-auto px-6 py-12">
        <motion.h2
          className="text-4xl md:text-5xl pb-2 mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Daccy Learn: Master DSA
        </motion.h2>

        <div className="flex gap-6 mt-8">
          {/* Left sidebar */}
          <Card className="w-64 bg-muted">
            <CardHeader>
              <CardTitle>Learning Topics</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                {topics.map((topic) => (
                  <Button
                    key={topic.id}
                    className={`w-full justify-start mb-2 ${selectedTopic === topic.id ? 'bg-primary' : ''}`}
                    onClick={() => handleTopicSelect(topic.id)}
                  >
                    {topic.title}
                  </Button>
                ))}
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
                  Select a topic from the sidebar to start learning.
                </motion.p>
              )}
              {selectedTopic && !showChat && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl mb-4">{topics.find(t => t.id === selectedTopic)?.title}</h3>
                  <p className="mb-6">{topics.find(t => t.id === selectedTopic)?.description}</p>
                  <form onSubmit={handleLanguageSubmit} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter your preferred language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="flex-grow"
                    />
                    <Button type="submit">
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
                  className="h-[calc(100vh-16rem)] flex flex-col"
                >
                  <ScrollArea className="flex-grow mb-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-4 p-3 rounded-lg ${
                          message.isUser ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'
                        } max-w-[80%]`}
                      >
                        {message.content}
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Ask a question..."
                      className="flex-grow"
                    />
                    <Button onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-background py-8">
        <div className="mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Daccy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}