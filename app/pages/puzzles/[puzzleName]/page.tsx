"use client"

import { useState } from "react"
import { Moon, Sun, ArrowLeft, Check, X, Lightbulb, Code, RefreshCw, Bot, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Editor from '@monaco-editor/react'

export default function Component() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [code, setCode] = useState(`function isPalindrome(str) {
  // Your code here
}

// Test your function
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("race a car"));
console.log(isPalindrome("12321"));`)
  const [output, setOutput] = useState("")
  const [aiSuggestion, setAiSuggestion] = useState("")
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false)

  // useEffect to set mounted to true on client-side
  useState(() => setMounted(true))

  if (!mounted) return null

  const runCode = () => {
    try {
      // Create a new function from the code string
      const runnable = new Function('console', code)
      
      // Capture console.log output
      let output = ''
      const mockConsole = {
        log: (...args) => {
          output += args.join(' ') + '\n'
        }
      }
      
      // Run the code
      runnable(mockConsole)
      
      setOutput(output)
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    }
  }

  const resetCode = () => {
    setCode(`function isPalindrome(str) {
  // Your code here
}

// Test your function
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("race a car"));
console.log(isPalindrome("12321"));`)
    setOutput("")
  }

  const getAiSuggestion = async () => {
    setIsLoadingSuggestion(true)
    try {
      const response = await fetch('/api/get-code-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentCode: code }),
      })
      const data = await response.json()
      setAiSuggestion(data.suggestion)
    } catch (error) {
      console.error('Error fetching AI suggestion:', error)
      setAiSuggestion("Sorry, I couldn't generate a suggestion at this time.")
    }
    setIsLoadingSuggestion(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">The Palindromic Labyrinth</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-2">Problem Description</h2>
            <p className="mb-4">
              Implement a function <code>isPalindrome(str)</code> that checks if a given string is a palindrome.
              A palindrome reads the same forwards and backwards, ignoring spaces, punctuation, and capitalization.
            </p>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Hint</AlertTitle>
              <AlertDescription>
                Consider removing non-alphanumeric characters and converting to lowercase before checking.
              </AlertDescription>
            </Alert>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Code Editor</h2>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
                    <Editor  theme={theme === 'dark' ? 'vs-dark' : 'light'}/>
                  </div>
            <div className="flex space-x-2 mb-4">
              <Button onClick={runCode}>
                <Play className="mr-2 h-4 w-4" />
                Run Code
              </Button>
              <Button variant="outline" onClick={resetCode}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
            {output && (
              <Alert>
                <Code className="h-4 w-4" />
                <AlertTitle>Output</AlertTitle>
                <AlertDescription>
                  <pre>{output}</pre>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>AI Suggestion</CardTitle>
            <CardDescription>Get a helpful tip from our AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Button onClick={getAiSuggestion} disabled={isLoadingSuggestion}>
                <Bot className="mr-2 h-4 w-4" />
                {isLoadingSuggestion ? "Thinking..." : "Get Suggestion"}
              </Button>
            </div>
            {aiSuggestion && (
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>AI Suggestion</AlertTitle>
                <AlertDescription>{aiSuggestion}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        <Tabs defaultValue="explanation" className="mt-6">
          <TabsList>
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
            <TabsTrigger value="solution">Sample Solution</TabsTrigger>
          </TabsList>
          <TabsContent value="explanation">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <h3 className="text-lg font-semibold mb-2">Understanding Palindromes</h3>
              <p className="mb-2">
                A palindrome is a word, number, phrase, or other sequence of characters that reads
                the same forward and backward, disregarding spaces, punctuation, and capitalization.
              </p>
              <h3 className="text-lg font-semibold mb-2">Implementation Strategy</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Remove non-alphanumeric characters from the input string.</li>
                <li>Convert the cleaned string to lowercase.</li>
                <li>Compare the cleaned string with its reverse.</li>
                <li>Return true if they match, false otherwise.</li>
              </ol>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="solution">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <pre className="text-sm">
                <code>{`function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Compare the string with its reverse
  return cleanStr === cleanStr.split('').reverse().join('');
}

// Example usage:
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome("12321")); // true`}</code>
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}