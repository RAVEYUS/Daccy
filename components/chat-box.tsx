'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type Message = {
  content: string
  isUser: boolean
}

export function ChatBoxComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [hasOpened, setHasOpened] = useState(false)  // Track if the chatbox was opened for the first time

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Add a default AI message when the chatbox is opened for the first time
  useEffect(() => {
    if (isOpen && !hasOpened) {
      setMessages(prev => [...prev, { content: "Hello! How can I assist you today?", isUser: false }])
      setHasOpened(true)
    }
  }, [isOpen, hasOpened])

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

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-80 sm:w-96"
            style={{ height: 'calc(100vh - 120px)' }}
          >
            <Card className="h-full flex flex-col shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardTitle className="text-lg">Daccy Chat</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col p-0 overflow-hidden">
                <ScrollArea className="flex-grow px-4" ref={scrollAreaRef}>
                  <div className="space-y-4 py-4">
                    <AnimatePresence>
                      {messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`rounded-lg px-3 py-2 max-w-[80%] ${
                              message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}
                          >
                            {message.content}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                    <Input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything"
                      disabled={isLoading}
                      aria-label="Chat message"
                    />
                    <Button type="submit" disabled={isLoading} aria-label="Send message">
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
