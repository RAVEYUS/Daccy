"use client";

import { Editor } from "@monaco-editor/react";

function extractCodeBlock(text: string): string[] {
  // Regular expression to match text between triple backticks and exclude language identifier
  const pattern = /```(?:\w+)?\n([\s\S]*?)```/g; // (?:\w+)? is a non-capturing group for language identifier
  const matches: string[] = [];
  let match: RegExpExecArray | null;

  // Use the RegExp exec() method to find all matches
  while ((match = pattern.exec(text)) !== null) {
    matches.push(match[1].trim()); // match[1] contains the code, trim() to remove extra spaces or newlines
  }

  return matches;
}

// Example input with triple backticks
const inputText = `
\`\`\`python
def is_prime(n):
"""Checks if a number is prime."""
if n <= 1:
  return False
for i in range(2, int(n**0.5) + 1):
  if n % i == 0:
    return False
return True

def sum_of_primes(n):
"""Calculates the sum of the first n prime numbers."""
primes are added to an array, and the sum is returned.

print(f"The sum of the first 50 prime numbers is: {sum_of_first_50_primes}")
\`\`\`
`;

// Extract the code block
const codeBlock: string[] = extractCodeBlock(inputText);

// Join the code blocks into a single string (if you have multiple code blocks)
const joinedCodeBlock = codeBlock.join("\n");

export default function Home() {
  return (
    <Editor
      height="90vh" // You can adjust the editor height
      language="python" // Set the language mode (e.g., 'python' here)
      value={joinedCodeBlock} // Provide the joined code block as a single string
      theme="vs-dark" // You can choose other themes such as 'light' or 'vs-dark'
    />
  );
}
