'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BugIcon, CodeIcon, GhostIcon, LightbulbIcon } from "lucide-react"

export default function GenerateAndCheckBuggyCodePage() {
  const [level, setLevel] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [buggyCode, setBuggyCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dotCount, setDotCount] = useState(0);
  const [suggestion, setSuggestion] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    if (!level || !language) {
      setError('Please select both level and language.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-buggy-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level, language }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate buggy code');
      }

      const data = await response.json();
      setBuggyCode(data.buggyCode);
      setSuggestion(data.suggestion || 'Try to identify and fix the bug in the code!');
    } catch (err) {
      console.error('Detailed error:', err);
      setError('An error occurred while generating the buggy code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        body {
          font-family: 'Press Start 2P', cursive;
        }
        .bug-bg {
          background-image: 
            radial-gradient(circle, #ff0000 3px, transparent 4px),
            radial-gradient(circle, #ff0000 3px, transparent 4px);
          background-size: 60px 60px;
          background-position: 0 0, 30px 30px;
          animation: moveBugs 4s linear infinite;
        }
        @keyframes moveBugs {
          0% { background-position: 0 0, 30px 30px; }
          100% { background-position: 60px 60px, 90px 90px; }
        }
        .pixel-border {
          box-shadow: 
            0 0 0 2px #000,
            0 0 0 4px #ff0000;
        }
      `}</style>
      
      <div className="bug-bg absolute inset-0 opacity-10"></div>
      
      <div className="container mx-auto p-4 relative z-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-black rounded-xl p-4 bg-yellow-400">Debug Challenge</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 space-y-6">
            <Card className="bg-gray-900 ">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <GhostIcon className="mr-2 h-5 w-5" />
                  Choose Your Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="level" className="block mb-2 text-sm font-medium text-blue-400">Select Difficulty:</label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger id="level" className="bg-gray-800 text-white border-red-500">
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
                  <label htmlFor="language" className="block mb-2 text-sm font-medium text-blue-400">Select Language:</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="bg-gray-800 text-white border-red-500">
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
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg transition-transform "
                  disabled={loading}
                >
                  {loading ? (
                    <>Generating Bugs {'.'.repeat(dotCount)}</>
                  ) : (
                    <>
                      <BugIcon className="mr-2 h-5 w-5" />
                      Generate Buggy Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900  ">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <LightbulbIcon className="mr-2 h-5 w-5" />
                  Suggestion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">{suggestion || 'Generate a buggy code to get a suggestion!'}</p>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3 space-y-6">
            {error && (
              <Card className="bg-gray-900 border-yellow-500 pixel-border">
                <CardContent>
                  <p className="text-yellow-500">{error}</p>
                </CardContent>
              </Card>
            )}

            {buggyCode && (
              <Card className="bg-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-400">
                    <CodeIcon className="mr-2 h-5 w-5" />
                    Buggy Code Generated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto text-green-300">
                    <code>{buggyCode}</code>
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}