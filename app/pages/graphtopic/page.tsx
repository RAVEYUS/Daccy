"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Code, Cpu, Search, GitBranch } from 'lucide-react'
import { NavbarComponent } from '@/components/navbar'

const topics = [
    { icon: Database, title: 'Docker', subtitle: 'DevOps', description: 'Containerization platform for application deployment' },
    { icon: Database, title: 'Kubernetes', subtitle: 'DevOps', description: 'Container orchestration for managing containerized applications' },
    { icon: Database, title: 'Web3 and Blockchain', subtitle: 'Advanced Concepts', description: 'Decentralized web technologies and distributed ledger systems' },
    { icon: Code, title: 'Sorting Algorithms', subtitle: 'Algorithms', description: 'Techniques for arranging data in a specific order' },
    { icon: Search, title: 'Searching Algorithms', subtitle: 'Algorithms', description: 'Methods for finding specific items in a collection of data' },
    { icon: Cpu, title: 'Dynamic Programming', subtitle: 'Advanced Concepts', description: 'Problem-solving technique for optimizing complex problems' },
    { icon: GitBranch, title: 'Greedy Algorithms', subtitle: 'Advanced Concepts', description: 'Algorithmic paradigm that makes locally optimal choices' },
    { icon: GitBranch, title: 'Backtracking', subtitle: 'Advanced Concepts', description: 'Algorithm for solving problems recursively by trying to build a solution incrementally' },
    { icon: Cpu, title: 'Machine Learning', subtitle: 'AI & Data Science', description: 'Building models to make predictions or decisions without being explicitly programmed' },
    { icon: Search, title: 'Graph Algorithms', subtitle: 'Algorithms', description: 'Techniques for analyzing and processing graphs and networks' },
    { icon: Database, title: 'Cloud Computing', subtitle: 'DevOps', description: 'Delivery of computing services over the internet' },
    { icon: Code, title: 'Object-Oriented Programming', subtitle: 'Programming Concepts', description: 'A paradigm that organizes code into objects that can interact with each other' },
    { icon: Cpu, title: 'Neural Networks', subtitle: 'AI & Data Science', description: 'Models that simulate the way the human brain processes information' },
    { icon: GitBranch, title: 'Quantum Computing', subtitle: 'Advanced Concepts', description: 'A computing paradigm based on quantum mechanics principles' },
    { icon: Search, title: 'Artificial Intelligence', subtitle: 'AI & Data Science', description: 'Simulating human intelligence through machines' },
    { icon: Code, title: 'REST APIs', subtitle: 'Web Development', description: 'Architectural style for building scalable web services' },
]


export default function TopicExplorer() {
    const router = useRouter()

    const handleTopicClick = async (topic: string) => {
        try {
            const response = await fetch('/api/visual-learning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: `Generate a brief overview of ${topic} in the context of computer science or software development.` }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate content')
            }

            const data = await response.json()

            // Store the generated content in localStorage
            localStorage.setItem('topicContent', data.content)
            localStorage.setItem('topicTitle', topic)

            // Redirect to the graph page
            router.push('/pages/graph')
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground ">
            <NavbarComponent />
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topics.map((topic, index) => (
                        <Card key={index} className="bg-card hover:bg-accent transition-colors duration-200">
                            <CardContent className="p-6">
                                <Button
                                    variant="ghost"
                                    className="w-full h-full text-left flex flex-col items-center justify-center space-y-2"
                                    onClick={() => handleTopicClick(topic.title)}
                                >
                                    <topic.icon className="h-12 w-12 mb-2" />
                                    <h2 className="text-xl font-semibold">{topic.title}</h2>
                                    <p className="text-sm text-muted-foreground">{topic.subtitle}</p>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
