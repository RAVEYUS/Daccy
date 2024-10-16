"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavbarComponent } from "@/components/navbar";

export default function Component() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect to set mounted to true on client-side
  useState(() => setMounted(true));

  if (!mounted) return null;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavbarComponent showBackButton={true} backButtonRoute="/" />
      <main className="container mx-auto p-4 flex flex-col items-center justify-center flex-grow">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          {[
            {
              title: "Visual Learning",
              description: "Discover how to enhance your understanding through visual techniques.",
              link: "/pages/graphtopic",
              buttonText: "Get Started",
            },
            {
              title: "Problem Puzzles",
              description: "Challenge yourself with AI-generated puzzles",
              link: "/pages/puzzles",
              buttonText: "Try a Puzzle",
            },
            {
              title: "Generative Learning",
              description: "Personalized AI-driven learning experiences",
              link: "/pages/learning",
              buttonText: "Start Learning",
            },
            {
              title: "Challenge Yourself",
              description: "Generate code according to your level and debug",
              link: "/pages/code",
              buttonText: "Start Debugging",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                borderColor: theme === "dark" ? "#fff" : "#000",
                borderWidth: "1px",
              }}
              className="rounded-lg overflow-hidden"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href={item.link}>
                    <Button>{item.buttonText}</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <footer className="bg-background py-8">
        <div className="mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; Daccy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
