"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Send, GraduationCap, BookOpen, X, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Message {
  content: string;
  sender: "user" | "assistant";
}

interface LearningTopic {
  id: number;
  title: string;
  description: string;
}

export default function LearningAssistantComponent() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { content: "Welcome to Daccy Learn! What would you like to explore today?", sender: "assistant" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<LearningTopic | null>(null);

  const learningTopics: LearningTopic[] = [
    { id: 1, title: "Programming Basics", description: "Learn the fundamentals of programming, including variables, data types, and control structures." },
    { id: 2, title: "Data Structures", description: "Explore essential data structures like arrays, linked lists, trees, and graphs." },
    { id: 3, title: "Web Development", description: "Discover the basics of HTML, CSS, and JavaScript for building web applications." },
    { id: 4, title: "Machine Learning", description: "Introduction to machine learning concepts and algorithms." },
  ];

  const suggestions = [
    "Explain variables and data types",
    "How do loops work in programming?",
    "What are the basics of HTML and CSS?",
    "Introduce me to Python programming",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const newMessages = [
      ...messages,
      { content: inputMessage, sender: "user" },
    ];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const assistantReply = `Here's some information about "${inputMessage}": [Simulated learning content]`;

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: assistantReply, sender: "assistant" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: "Sorry, I couldn't retrieve the information at this moment. Please try again later.", sender: "assistant" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  return (
    <motion.div
      className="flex h-screen bg-background text-foreground"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="w-80 border-r bg-background"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-4">Learning Topics</h2>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4">
                  {learningTopics.map((topic) => (
                    <Card 
                      key={topic.id} 
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <CardHeader>
                        <CardTitle>{topic.title}</CardTitle>
                        <CardDescription>{topic.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
            </Button>
            <motion.h1
              className="text-2xl font-bold flex items-center ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
            >
              <GraduationCap className="mr-2 h-6 w-6" />
              <Link href="/">Daccy Learn</Link>
            </motion.h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Link href="/pages/interface">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline">Back to Dashboard</Button>
              </motion.div>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-hidden flex">
          <div className="flex-1 overflow-y-auto p-4">
            <ScrollArea className="h-full">
              {selectedTopic ? (
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>{selectedTopic.title}</CardTitle>
                    <CardDescription>{selectedTopic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setInputMessage(`Tell me more about ${selectedTopic.title}`)}
                      className="mt-2"
                    >
                      Start Learning <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Welcome to Daccy Learn</CardTitle>
                    <CardDescription>Select a topic from the sidebar to start learning, or ask a question below.</CardDescription>
                  </CardHeader>
                </Card>
              )}
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[80%] ${
                        msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                      Searching for information...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          <div className="w-64 border-l p-4 hidden lg:block">
            <h3 className="text-lg font-semibold mb-4">Learning Suggestions</h3>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => setInputMessage(suggestion)}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      {suggestion}
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </main>

        <footer className="p-4 border-t">
          <div className="flex items-center">
            <Input
              className="flex-1"
              placeholder="Ask a question or request a topic..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <Button className="ml-2" onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}