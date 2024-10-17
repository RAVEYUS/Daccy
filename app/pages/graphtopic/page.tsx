"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react"; // Import only the needed icon
import { NavbarComponent } from "@/components/navbar";
import { IconBrandDocker } from "@tabler/icons-react";

const topics = [
  { icon: Database, title: "Array", subtitle: "Data Structures", description: "Array and its properties" },
  {
    icon: IconBrandDocker,
    title: "Docker",
    subtitle: "Container Simplified",
    description: "Streamlining Containerized Applications",
  },
];

export default function TopicExplorer() {
  const router = useRouter();

  const handleTopicClick = (topicTitle: string) => {
    // Check if the topic is Docker
    const topicRoute = topicTitle === "Docker" ? "/pages/graph2" : `/pages/graph`; // Special route for Docker
    router.push(topicRoute);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarComponent showBackButton={true} backButtonRoute="/pages/interface" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <Card key={index} className="bg-card hover:bg-accent transition-colors duration-200">
              <CardContent className="p-6">
                <Button
                  variant="ghost"
                  className="w-full h-full text-left flex flex-col items-center justify-center space-y-2"
                  onClick={() => handleTopicClick(topic.title)} // Pass topic title dynamically here
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
  );
}
