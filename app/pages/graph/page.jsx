"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CollapsibleTree from '@/components/loadGraph'
import { NavbarComponent } from '@/components/navbar'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { nodes } from '/lib/arrayMethodsData.js'

export default function ArrayMethodsExplorer() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [aiResponse, setAiResponse] = useState(null)
  const popupRef = useRef(null)

  const handleNodeClick = useCallback(async (node) => {
    const topic = node.data.name;
    setSelectedTopic(topic);
    await fetchAIResponse(topic);
  }, [])

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
      setAiResponse(data.reply);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse("Sorry, an error occurred while fetching the response.");
    }
  }

  const handleClickOutside = useCallback((event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setSelectedTopic(null)
      setAiResponse(null);
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div className="min-h-screen bg-background">
      <NavbarComponent showBackButton={true} backButtonRoute="/pages/graphtopic" />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Array Methods Explorer</h1>
        <div className="relative">
          <CollapsibleTree data={nodes} onNodeClick={handleNodeClick} />
          
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
                  <CardContent className="flex-grow overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="space-y-4 p-4">
                        {aiResponse ? (
                          <pre className="whitespace-pre-wrap">{aiResponse}</pre>
                        ) : (
                          <p>Loading AI response...</p>
                        )}
                      </div>
                    </ScrollArea>
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