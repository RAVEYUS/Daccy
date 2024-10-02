"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, Code2, Lightbulb, Loader2 } from "lucide-react"
import Editor from "@monaco-editor/react"
import Link from 'next/link'

export function DebugChallenge() {
  const [level, setLevel] = useState<string>('')
  const [language, setLanguage] = useState<string>('')
  const [buggyCode, setBuggyCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [suggestion, setSuggestion] = useState<string>('')
  const [hints, setHints] = useState<string[]>([])
  const [progress, setProgress] = useState<number>(0)

  const handleGenerate = async () => {
    if (!level || !language) {
      setError('Please select both level and language.')
      return
    }

    setLoading(true)
    setError(null)
    setProgress(0)

    try {
      const response = await fetch('/api/generate-buggy-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level, language }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to generate buggy code')
      }

      const data = await response.json()
      setBuggyCode(data.buggyCode)
      setSuggestion(data.suggestion || 'Try to identify and fix the bug in the code!')
      setHints(data.hints || [])
      setProgress(0)
    } catch (err) {
      console.error('Detailed error:', err)
      setError('An error occurred while generating the buggy code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const revealHint = () => {
    setProgress((prevProgress) => Math.min(prevProgress + 25, 100))
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-8">
        <Link href="/pages/home" passHref>
          <Button variant="ghost" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-center flex-grow">Debug Challenge</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="bg-gray-900 border-gray-800 lg:w-1/3">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-xl">
              <Code2 className="mr-2 h-5 w-5" />
              Challenge Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-300">Difficulty Level</label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger id="level" className="bg-gray-800 text-white border-gray-700">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="master">Master</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-300">Programming Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="bg-gray-800 text-white border-gray-700">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              onClick={handleGenerate}
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Code2 className="mr-2 h-4 w-4" />
              )}
              {loading ? 'Generating...' : 'Generate Buggy Code'}
            </Button>
          </CardContent>
        </Card>

        <div className="lg:w-2/3 space-y-8">
          {error && (
            <Card className="bg-red-900 border-red-800">
              <CardContent className="flex items-center p-4">
                <AlertCircle className="h-5 w-5 mr-2 text-red-300" />
                <p className="text-red-100">{error}</p>
              </CardContent>
            </Card>
          )}

          {buggyCode && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-xl">
                  <Code2 className="mr-2 h-5 w-5" />
                  Buggy Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-md overflow-hidden">
                  <Editor
                    height="40vh"
                    theme="vs-dark"
                    language={language}
                    value={buggyCode}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {suggestion && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-xl">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Hint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{suggestion}</p>
              </CardContent>
            </Card>
          )}

          {hints.length > 0 && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-xl">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Hints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hints.map((hint, index) => (
                    <div key={index} className={`transition-opacity duration-500 ${index <= progress / 25 - 1 ? 'opacity-100' : 'opacity-0'}`}>
                      <p className="text-gray-300">{hint}</p>
                    </div>
                  ))}
                  {progress < 100 && (
                    <Button onClick={revealHint} className="mt-4 bg-white text-black hover:bg-gray-200">
                      Reveal Next Hint
                    </Button>
                  )}
                </div>
                <div className="mt-4 bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}