import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate nodes structure
    const nodesPrompt = `Generate a comprehensive structure of JavaScript Array methods and properties...`;
    const nodesResult = await model.generateContent(nodesPrompt);
    const nodesContent = await nodesResult.response.text();
    const nodes = JSON.parse(nodesContent);

    // Generate topicInfoMap
    const topicInfoPrompt = `Generate a topicInfoMap for JavaScript Array methods and properties...`;
    const topicInfoResult = await model.generateContent(topicInfoPrompt);
    const topicInfoContent = await topicInfoResult.response.text();
    const topicInfoMap = JSON.parse(topicInfoContent);

    console.log("Nodes generated:", nodes);  // Debugging log
    console.log("Topic Info Map generated:", topicInfoMap);  // Debugging log

    return NextResponse.json({ nodes, topicInfoMap });
  } catch (error) {
    console.error('Error generating array information:', error);
    return NextResponse.json({ error: 'Failed to generate array information' }, { status: 500 });
  }
}
