import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import './globals.css';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/ui/themeprovider';

// Import necessary styles for Clerk components
import { Button } from '@/components/ui/button'; // Import your button styling

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Daccy',
  description: 'Learn coding efficiently',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {/* Customizing Clerk components */}
            <SignedIn>
              <UserButton 
                // Apply UI styles or classes to UserButton
                
              />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button variant="default">
                  Login / Signup
                </Button>
              </SignInButton>
            </SignedOut>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
