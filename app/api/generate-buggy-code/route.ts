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

    // Generate the buggy code based on user selection
    const prompt = `Generate buggy code for a ${level} level problem in ${language} and dont provide solution and  dont give uncessary text other than code and remove all comments and indentation and your gemini thankful response text.`;
    const result = await model.generateContent(prompt);

    // Extract the buggy code from the response
    const buggyCode = result.response.text(); // Adjust this based on actual response structure

    return NextResponse.json({ buggyCode });
  } catch (error) {
    console.error('Error fetching buggy code:', error);
    return NextResponse.json({ message: 'Error generating buggy code' }, { status: 500 });
  }
}
