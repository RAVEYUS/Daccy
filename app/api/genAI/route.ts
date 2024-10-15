import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {
    const { message, selectedTopic, language } = await req.json()

    if (!message || !selectedTopic || !language) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `You are an AI tutor specializing in ${selectedTopic} using ${language}. 
                    The user's question is: "${message}"
                    Please provide a helpful, concise response tailored to their level of understanding.
                    If code examples are appropriate, please include them.`

    const result = await model.generateContent(prompt)
    const aiResponse = result.response.text()

    return NextResponse.json({ reply: aiResponse })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 })
  }
}