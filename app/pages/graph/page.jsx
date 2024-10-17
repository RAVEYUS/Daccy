"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { memo } from 'react'  // Import memo
import CollapsibleTree from '@/components/loadGraph'
import { NavbarComponent } from '@/components/navbar'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send } from "lucide-react"
import { nodes as arrayMethodsData } from '/lib/arrayMethodsData.js'

// Memoize the CollapsibleTree component to prevent re-rendering
const MemoizedCollapsibleTree = memo(CollapsibleTree);

export default function ArrayMethodsExplorer() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [aiResponses, setAiResponses] = useState({})  // State to store AI responses per topic
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const popupRef = useRef(null)

  // Memoize nodes to avoid re-creating the array on every render
  const nodes = useMemo(() => arrayMethodsData, []);

  // Handle node click (memoized)
  const handleNodeClick = useCallback(async (node) => {
    const topic = node.data.name;
    setSelectedTopic(topic);

    // Check if we already have a response for the selected topic
    if (!aiResponses[topic]) {
      await fetchAIResponse(topic);
    }
  }, [aiResponses])

  // Fetch AI response for the selected topic
  const fetchAIResponse = async (topic) => {
    try {
      const response = await fetch('/api/visual-learning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedTopic: topic,
          language: "JavaScript",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      setAiResponses((prev) => ({ ...prev, [topic]: data.reply })); // Store the response in state
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponses((prev) => ({ ...prev, [topic]: "Sorry, an error occurred while fetching the response." }));
    }
  }

  // Handle clicks outside the popup (memoized)
  const handleClickOutside = useCallback((event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setSelectedTopic(null)
      setIsChatOpen(false);
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  // Handle chat submit
  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage = { role: 'user', content: inputMessage }
    setChatMessages([...chatMessages, newMessage])
    setInputMessage("")

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch chat response')
      }

      const data = await response.json()
      setChatMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error('Error fetching chat response:', error)
      setChatMessages(prevMessages => [...prevMessages, { role: 'assistant', content: "Sorry, an error occurred." }])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarComponent showBackButton={true} backButtonRoute="/pages/graphtopic" />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Arrays in JS</h1>
        <div className="relative">
          {/* Render the memoized tree */}
          <MemoizedCollapsibleTree data={nodes} onNodeClick={handleNodeClick} />

          <AnimatePresence>
            {selectedTopic && (
              <motion.div
                className="fixed top-0 right-0 h-full w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-background shadow-lg overflow-hidden"
                ref={popupRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle>{selectedTopic}</CardTitle>
                    <CardDescription>More information about this Topic</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-hidden flex flex-col">
                    <ScrollArea className="flex-grow mb-4">
                      <div className="space-y-4 p-4">
                        {aiResponses[selectedTopic] ? (
                          <pre className="font-sans whitespace-pre-wrap">{aiResponses[selectedTopic]}</pre>
                        ) : (
                          <p>Loading AI response...</p>
                        )}
                      </div>
                    </ScrollArea>
                    <div className="mt-4">
                      <Button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className="w-full"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {isChatOpen ? "Close Chat" : "Open Chat"}
                      </Button>
                    </div>
                    {isChatOpen && (
                      <div className="mt-4 border-t pt-4 flex flex-col h-64"> {/* Flex column layout with fixed height */}

                        {/* Scrollable message area with proper flex-grow */}
                        <div className="flex-grow overflow-hidden">
                          <ScrollArea className="flex-grow"> {/* ScrollArea takes up the full height */}
                            <div className="space-y-4 p-2"> {/* Add padding for messages */}
                              {chatMessages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`max-w-[70%] p-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                                    {msg.content}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>

                        {/* Input form stays fixed at the bottom */}
                        <form onSubmit={handleChatSubmit} className="flex items-center space-x-2 mt-2"> {/* Use margin-top to separate */}
                          <Input
                            type="text"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="flex-grow"  
                          />
                          <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    )}

                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
