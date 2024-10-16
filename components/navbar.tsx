'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

interface NavbarProps {
  showBackButton?: boolean
  backButtonRoute?: string
}

export function NavbarComponent({ 
  showBackButton = false, 
  backButtonRoute = '/' 
}: NavbarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="p-6 flex justify-between items-center">
      <h1 className="text-2xl">
        <Link href="/">Daccy</Link>
      </h1>
      <nav className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <Button variant="default">Sign In / Sign Up</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <div className="flex items-center gap-4">
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
            <span className="sr-only">Toggle theme</span>
          </Button>
          {showBackButton && (
            <Link href={backButtonRoute}>
              <Button>Back to Home</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}