'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

interface NavbarProps {
  showThemeToggle?: boolean
}

export function NavbarComponent({ showThemeToggle = true }: NavbarProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="p-6 flex justify-between items-center">
      <h1 className="text-2xl">
        <Link href="/">Daccy</Link>
      </h1>
      <nav className="flex items-center gap-4">
        {showThemeToggle && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </motion.div>
        )}

        <SignedOut>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SignInButton>
              <Button variant="default">Sign In / Sign Up</Button>
            </SignInButton>
          </motion.div>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  )
}