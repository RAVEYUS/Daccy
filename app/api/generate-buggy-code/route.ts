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
    const hintPrompt = `Generate 2 friendly hints (max 20 chars each) for the following code:\n${buggyCode}. Each hint should be on a new line, with no unnecessary text:, dont give hints that will solve the problem`;
    const problemTitlePrompt = `Generate the problem title for ${buggyCode} , with no unnecessary text `;

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
