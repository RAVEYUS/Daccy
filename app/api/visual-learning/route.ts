import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// Define safety settings for the AI model
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

// POST request handler
export async function POST(req: Request) {
  try {
    // Parse the incoming request data
    const { selectedTopic , language} = await req.json();

    // Validate required fields
    if (!selectedTopic) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Initialize Google Generative AI model
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

    // Construct the prompt for the AI model
    const prompt = createPrompt(selectedTopic, language);

    // Generate content from the AI model
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    // Return the AI's response
    return NextResponse.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
}

// Helper function to create a prompt based on the input parameters
function createPrompt(selectedTopic: string, language?: string): string {
  let basePrompt = `You are an AI tutor specializing in ${selectedTopic}.`;

  // Include language context if provided
  if (language) {
    basePrompt = `You are an AI tutor specializing in ${selectedTopic} using ${language}. 
                  ${basePrompt}`;
  }

  // Suggest including code examples if applicable
  basePrompt += ` If code examples are appropriate, please include them.`;

  return basePrompt;
}
