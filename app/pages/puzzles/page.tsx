"use client"

import { useState } from "react"
import { Moon, Sun, Network, GitBranch, Layers, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export default function Component() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // useEffect to set mounted to true on client-side
    useState(() => setMounted(true))

    if (!mounted) return null

    const puzzleCategories = [
        { name: "Arrays & Strings", icon: Layers },
        { name: "Trees & Graphs", icon: GitBranch },
        { name: "Dynamic Programming", icon: Workflow },
        { name: "Sorting & Searching", icon: Network },
    ]

    const puzzles = [
        { title: "The Palindromic Labyrinth", category: "Arrays & Strings", difficulty: "Medium" },
        { title: "Binary Tree's Hidden Treasure", category: "Trees & Graphs", difficulty: "Hard" },
        { title: "The Fibonacci Fortress", category: "Dynamic Programming", difficulty: "Medium" },
        { title: "Quicksort's Time Warp", category: "Sorting & Searching", difficulty: "Hard" },
        { title: "Anagram Archipelago", category: "Arrays & Strings", difficulty: "Easy" },
        { title: "The Dijkstra Dimension", category: "Trees & Graphs", difficulty: "Medium" },
    ]

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="flex items-center justify-between p-4 border-b w-full">
                <h1 className="text-2xl font-thin">Daccy</h1>
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
            <main className="container mx-auto p-6">
                <section className="mb-12">
                    <h2 className="text-3xl font-sans mb-4">Algorithm Realms</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {puzzleCategories.map((category) => (
                            <motion.div
                                key={category.name}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                                    borderColor: theme === "dark" ? "#fff" : "#000",
                                    borderWidth: "2px",
                                    transition: { duration: 0.2 },
                                }}
                                className="rounded-lg overflow-hidden"
                            >
                                <Button variant="outline" className="h-24 w-48 flex flex-col items-center justify-center">
                                    <category.icon className="mb-2 h-6 w-6" />
                                    <span className="text-center">{category.name}</span>
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Coding Quests</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {puzzles.map((puzzle, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: theme === "dark" ? "#fff" : "#000",
                                    borderWidth: "2px",
                                }}
                                className="rounded-lg overflow-hidden"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{puzzle.title}</CardTitle>
                                        <CardDescription>{puzzle.category}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Badge
                                            variant={
                                                puzzle.difficulty === "Easy"
                                                    ? "secondary"
                                                    : puzzle.difficulty === "Medium"
                                                        ? "default"
                                                        : "destructive"
                                            }
                                        >
                                            {puzzle.difficulty}
                                        </Badge>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Embark on Quest</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
            <footer className="bg-background py-8">
                <div className="mx-auto px-6 text-center text-muted-foreground">
                    <p>&copy; 2024 DSA Companion. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
