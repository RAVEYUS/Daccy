"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CollapsibleTree from '@/components/loadGraph'
import { NavbarComponent } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { nodes, getTopicInfo } from '/lib/arrayMethodsData.js'

export default function ArrayMethodsExplorer() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const popupRef = useRef(null)

  const handleNodeClick = useCallback((node) => {
    setSelectedTopic(node.data.name)
  }, [])

  const handleClickOutside = useCallback((event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setSelectedTopic(null)
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
          
          {/* AnimatePresence handles the exit animation */}
          <AnimatePresence>
            {selectedTopic && (
              <motion.div
                className="fixed top-0 right-0 h-full w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-background shadow-lg"  // Fixed sidebar style
                ref={popupRef}
                initial={{ x: '100%' }}         // Start fully off-screen (right)
                animate={{ x: 0 }}              // Slide into view
                exit={{ x: '100%' }}            // Slide back off-screen when closed
                transition={{ duration: 0.5 }}  // Transition timing for smoothness
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{selectedTopic}</CardTitle>
                    <CardDescription>More information about this Topic</CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-y-auto">
                    <div className="space-y-4">
                      <p>{getTopicInfo(selectedTopic).description}</p>
                      {getTopicInfo(selectedTopic).syntax && (
                        <div>
                          <h4 className="font-semibold">Syntax:</h4>
                          <pre className="bg-muted p-2 rounded-md">{getTopicInfo(selectedTopic).syntax}</pre>
                        </div>
                      )}
                      {getTopicInfo(selectedTopic).example && (
                        <div>
                          <h4 className="font-semibold">Example:</h4>
                          <pre className="bg-muted p-2 rounded-md">{getTopicInfo(selectedTopic).example}</pre>
                        </div>
                      )}
                    </div>
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
