"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Send, Bot, User, Sparkles, History, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link"; // Import Link from next/link

interface Message {
  content: string;
  sender: "user" | "bot";
}

interface ChatHistory {
  id: number;
  title: string;
}

export default function ChatComponent() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: 1, title: "Previous Chat 1" },
    { id: 2, title: "Previous Chat 2" },
  ]);

  const suggestions = [
    "How does AI work?",
    "Tell me about machine learning",
    "Explain neural networks",
    "What are the applications of AI?",
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

    // Call the backend to get the AI response
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();
      setMessages([
        ...newMessages,
        { content: data.reply, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      // You may want to add error handling here
    }
  };

  // Page transition animation
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Message animation (slide up and fade in)
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Button hover animation
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  // Sidebar animation
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
            className="w-64 border-r bg-background"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            <div className="p-4">
              <h2 className="text-lg font-thin mb-4">Chat Suggestions</h2>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => setInputMessage(suggestion)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {suggestion}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="p-4">
              <h2 className="text-lg font-thin mb-4">Chat History</h2>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <ul className="space-y-2">
                  {chatHistory.map((chat) => (
                    <li key={chat.id}>
                      <Button variant="ghost" className="w-full justify-start text-left">
                        <History className="mr-2 h-4 w-4" />
                        {chat.title}
                      </Button>
                    </li>
                  ))}
                </ul>
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
              {isSidebarOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
            </Button>
            <motion.h1
              className="text-2xl font-sans flex items-center ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
            >
              <Bot className="mr-2 h-6 w-6" />
              <h1 className="text-2xl"><Link href="/">Daccy</Link></h1>
            </motion.h1>
          </div>
          <div className="flex items-center space-x-2">
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
            <Link href="/pages/interface">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button>Back </Button>
              </motion.div>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
                initial="hidden"
                animate="visible"
                variants={messageVariants}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === "user" ? (
                      <User className="h-4 w-4 mr-2" />
                    ) : (
                      <Bot className="h-4 w-4 mr-2" />
                    )}
                    <span className="font-semibold">{message.sender === "user" ? "You" : "AI"}</span>
                  </div>
                  {message.content}
                </div>
              </motion.div>
            ))}
          </ScrollArea>
        </main>
        <footer className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex space-x-2"
          >
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1"
            />
            <motion.button
              type="submit"
              className="flex items-center justify-center p-2 bg-primary text-primary-foreground rounded-full"
              variants={buttonVariants}
              whileHover="hover"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </motion.button>
          </form>
          <Separator className="my-4" />
        </footer>
      </div>
    </motion.div>
  );
}
