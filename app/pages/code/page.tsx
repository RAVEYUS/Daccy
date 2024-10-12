'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Code, MessageSquare, Moon, Sun, BugIcon, GhostIcon, LightbulbIcon, MessageCircleIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Inter } from 'next/font/google';
import { useTheme } from "next-themes";
import Link from 'next/link';
import Editor from "@monaco-editor/react";
import React from 'react';
import { NavbarComponent } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function AIDebugChallenge() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [problemtitle, setProblemTitle] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [buggyCode, setBuggyCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dotCount, setDotCount] = useState(0);
  const [suggestion, setSuggestion] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    setTheme('dark');
  }, [setTheme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    if (!level || !language) {
      setError('Please select both difficulty level and programming language.');
      return;
    }

    setLoading(true);
    setError(null);
    setBuggyCode(''); // Clear previous buggy code
    setSuggestion('');
    setProblemTitle('');

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
      setBuggyCode(data.code); // Assuming the API returns 'code' as buggy code
      setSuggestion(data.hint || 'Try to identify and fix the bug in the code!'); // Assuming the API returns 'hint'
      setProblemTitle(data.problemTitleText);
    } catch (err) {
      console.error('Detailed error:', err);
      setError('An error occurred while generating the buggy code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: BookOpen, title: 'Comprehensive DSA Topics', description: 'Learn everything from basic arrays to advanced graph algorithms.' },
    { icon: Code, title: 'Interactive Coding Challenges', description: 'Practice your skills with our real-time coding environment.' },
    { icon: MessageSquare, title: 'AI-Powered Assistance', description: 'Get personalized help and explanations from our AI tutor.' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-background text-foreground ${inter.className}`}>
      <NavbarComponent />
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GhostIcon className="mr-2 h-5 w-5" />
                  Choose Your Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="level" className="block mb-2 text-sm font-medium">Select Difficulty:</label>
                  <Select value={level} onValueChange={setLevel} aria-label="Select Difficulty">
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="master">Master</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="language" className="block mb-2 text-sm font-medium">Select Language:</label>
                  <Select value={language} onValueChange={setLanguage} aria-label="Select Language">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleGenerate}
                  className="w-full"
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LightbulbIcon className="mr-2 h-5 w-5" />
                  Problem Title
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{problemtitle || 'Generate a buggy code to get a problem title!'}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircleIcon className="mr-2 h-5 w-5" />
                  Problem Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{suggestion || ''}</p>
              </CardContent>
            </Card>

          </div>

          <div className="md:w-2/3 space-y-6">
            {error && (
              <Card>
                <CardContent>
                  <p className="text-red-500">{error}</p>
                </CardContent>
              </Card>
            )}

            {buggyCode && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-5 w-5" />
                    Buggy Code Generated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md overflow-x-auto">
                    <Editor height="60vh" theme={theme === 'dark' ? 'vs-dark' : 'light'} language={language} value={buggyCode} />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-background py-8">
        <div className="mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; Daccy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
