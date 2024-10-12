import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Generative AI with your API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Validate the input message
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Configuration for the generation
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };

    // Start a chat session with history and specific configuration
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [{ text: 'Only answer questions related to coding and tech topics, providing links when necessary. Avoid unnecessary text.' }],
        },
        {
          role: 'model',
          parts: [{ text: "Understood. Ask away! 💻 \n" }],
        },
      ],
    });

    // Send a message to the chat session
    const result = await chatSession.sendMessage(message);

    // Ensure that the response has the expected structure
    if (!result || !result.response || !result.response.text) {
      throw new Error('Invalid response structure from the Generative AI model');
    }

    // Extract the response text
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error fetching from Gemini AI:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
