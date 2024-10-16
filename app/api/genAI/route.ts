import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

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

export async function POST(req: Request) {
  try {
    const { message, selectedTopic, language, understandingLevel } = await req.json()

    if (!message || !selectedTopic) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" , safetySettings: safetySettings })

    let prompt: string;
    if (language) {
      prompt = `You are an AI tutor specializing in ${selectedTopic} using ${language}. 
                The user's prompt is: "${message}". 
                Please provide a helpful, concise response tailored to their level of understanding (${understandingLevel}).
                If code examples are appropriate, please include them.`
    } else {
      prompt = `You are an AI tutor specializing in ${selectedTopic}. 
                The user's prompt is: "${message}". 
                Please provide a helpful, concise response tailored to their level of understanding (${understandingLevel}).
                If relevant examples are appropriate, please include them.`;
    }

    const result = await model.generateContent(prompt)
    const aiResponse = result.response.text()

    return NextResponse.json({ reply: aiResponse })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 })
  }
}