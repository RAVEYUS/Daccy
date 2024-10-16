"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import CollapsibleTree from '@/components/loadGraph'
import { NavbarComponent } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const nodes = {
  name: "Array",
  children: [
    { name: "Constructor", children: [{ name: "Array()" }] },
    {
      name: "Static methods",
      children: [
        { name: "Array.from()" },
        { name: "Array.fromAsync()" },
        { name: "Array.isArray()" },
        { name: "Array.of()" },
      ]
    },
    {
      name: "Static properties",
      children: [
        { name: "Array[Symbol.species]" },
      ]
    },
    {
      name: "Instance properties",
      children: [
        { name: "Array.prototype.length" },
        { name: "Array.prototype[Symbol.unscopables]" },
      ]
    },
    {
      name: "Instance methods",
      children: [
        { name: "Array.prototype.at()" },
        { name: "Array.prototype.concat()" },
        { name: "Array.prototype.copyWithin()" },
        { name: "Array.prototype.entries()" },
        { name: "Array.prototype.every()" },
        { name: "Array.prototype.fill()" },
        { name: "Array.prototype.filter()" },
        { name: "Array.prototype.find()" },
        { name: "Array.prototype.findIndex()" },
        { name: "Array.prototype.findLast()" },
        { name: "Array.prototype.findLastIndex()" },
        { name: "Array.prototype.flat()" },
        { name: "Array.prototype.flatMap()" },
        { name: "Array.prototype.forEach()" },
        { name: "Array.prototype.includes()" },
        { name: "Array.prototype.indexOf()" },
        { name: "Array.prototype.join()" },
        { name: "Array.prototype.keys()" },
        { name: "Array.prototype.lastIndexOf()" },
        { name: "Array.prototype.map()" },
        { name: "Array.prototype.pop()" },
        { name: "Array.prototype.push()" },
        { name: "Array.prototype.reduce()" },
        { name: "Array.prototype.reduceRight()" },
        { name: "Array.prototype.reverse()" },
        { name: "Array.prototype.shift()" },
        { name: "Array.prototype.slice()" },
        { name: "Array.prototype.some()" },
        { name: "Array.prototype.sort()" },
        { name: "Array.prototype.splice()" },
        { name: "Array.prototype[Symbol.iterator]()" },
        { name: "Array.prototype.toLocaleString()" },
        { name: "Array.prototype.toReversed()" },
        { name: "Array.prototype.toSorted()" },
        { name: "Array.prototype.toSpliced()" },
        { name: "Array.prototype.toString()" },
        { name: "Array.prototype.unshift()" },
        { name: "Array.prototype.values()" },
        { name: "Array.prototype.with()" },
      ]
    },
  ],
}

const topicInfoMap = {
  "Array.prototype.map()": {
    description: "The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.",
    syntax: "arr.map(callback(currentValue[, index[, array]])[, thisArg])",
    example: `
const numbers = [1, 4, 9];
const roots = numbers.map(Math.sqrt);
// roots is now [1, 2, 3]
// numbers is still [1, 4, 9]
    `
  },
  // Add more topics here...
}

const getTopicInfo = (topicName) => {
  return topicInfoMap[topicName] || { description: "Information not available for this topic." }
}

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
          {selectedTopic && (
            <div className="absolute top-0 right-0 w-1/3 p-4" ref={popupRef}>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedTopic}</CardTitle>
                  <CardDescription>More information about this topic</CardDescription>
                </CardHeader>
                <CardContent>
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
