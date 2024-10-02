import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Generative AI with your API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Validate the input message
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Generate content using the Gemini AI model
    const prompt = message; // You can modify this if needed
    const result = await model.generateContent(prompt);

    // Extract the response text
    const reply = result.response.text(); // Adjust this based on actual response structure

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Error fetching from Gemini AI:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
