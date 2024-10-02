// app/api/generate-buggy-code/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Generative AI with your API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genai = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    const { level, language } = await req.json();

    if (!level || !language) {
      return NextResponse.json({ message: 'Level and language are required' }, { status: 400 });
    }

    // Get the generative model
    const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate the buggy code and hints in parallel
    const prompt = `Generate a  buggy code which isnt easy to fix for a ${level} level problem in ${language} and dont provide solution and  dont give uncessary text other than code and remove all comments and indentation and your gemini thankful response text.`;
    const result = await model.generateContent(prompt);
    const buggyCode = result.response.text(); // Adjust this based on actual response structure

    // Prepare hints and title prompts
    const hintPrompt = `Please provide a clear and concise explanation of the following code. The explanation should include a brief overview of the program's functionality, a breakdown of each key component and its purpose, and an outline of the input/output behavior. Aim for clarity and precision, ensuring that the description is easy to understand for someone with a basic understanding of C++. The total length should not exceed 500 characters, and please avoid unnecessary text and special characters. Here is the code:\n${buggyCode}`;
    const problemTitlePrompt = `Generate the problem title for ${buggyCode} , with no unnecessary text and special  characters: `;

    // Run hint and title generation concurrently
    const [hintResult, problemTitleResult] = await Promise.all([
      model.generateContent(hintPrompt),
      model.generateContent(problemTitlePrompt),
    ]);

    const hint = hintResult.response.text(); // Adjust this based on actual response structure
    const problemTitleText = problemTitleResult.response.text(); // Ensure this is called correctly

    return NextResponse.json({ code: buggyCode, hint, problemTitleText });

  } catch (error) {
    console.error('Error fetching buggy code:', error);
    return NextResponse.json({ message: 'Error generating buggy code' }, { status: 500 });
  }
}
