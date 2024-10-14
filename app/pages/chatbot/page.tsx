'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Moon, Sun, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "next-themes"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Inter } from 'next/font/google'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { NavbarComponent } from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

type Message = {
  content: string
  isUser: boolean
}

export default function ChatInterface() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    setIsLoading(true)
    const userMessage: Message = { content: inputMessage, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const aiMessage: Message = { content: data.reply, isUser: false }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { content: 'Sorry, an error occurred. Please try again.', isUser: false }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className={`min-h-screen bg-background text-foreground ${inter.className}`}>
      <NavbarComponent />

      <main className="container mx-auto px-6 py-12">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Chat with Daccy AI</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] mb-4 p-4" ref={scrollAreaRef}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                      }`}
                  >
                    <div className='font-sans whitespace-pre-wrap break-words'> {/* Changed from <pre> to <div> */}
                          {message.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about data structures & algorithms..."
                disabled={isLoading}
                className="flex-grow"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={sendMessage} disabled={isLoading}>
                  {isLoading ? 'Sending...' : <Send className="h-4 w-4" />}
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-background py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2024 Daccy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}