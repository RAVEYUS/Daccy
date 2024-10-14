import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

// Initialize Generative AI with the API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

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

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: `You are Daccy, a helpful AI assistant. You specialize in answering questions related to Data Structures and Algorithms (DSA), JavaScript, TypeScript, Golang, Java, C++, C, and Python. Stay focused on these topics.`,
  safetySettings: safetySettings,
});

type Topic = 'arrays' | 'linkedlists' | 'trees' | 'sorting';

const topics: Record<Topic, string> = {
  arrays: `Arrays are data structures that store elements in a contiguous memory location. Strings are also treated as arrays of characters in most languages.`,
  linkedlists: `Linked Lists are linear data structures where each element (node) contains a data part and a reference (or link) to the next element.`,
  trees: `Trees are hierarchical data structures used to represent hierarchical relationships between elements.`,
  sorting: `Sorting algorithms organize data in a particular order. Common sorting algorithms include Bubble Sort, Merge Sort, Quick Sort, and Insertion Sort.`,
};

export async function POST(request: Request) {
  try {
    const { message, selectedTopic } = await request.json();

    // Validate the input message and selected topic
    if (!message || !selectedTopic || !(selectedTopic in topics)) {
      return NextResponse.json({ reply: 'Invalid request. Please provide a valid message and topic.' }, { status: 400 });
    }

    // Fetch the corresponding topic explanation
    const topicResponse = topics[selectedTopic as Topic];

    // Start a chat session with history and specific configuration
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1.75,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      },
      history: [
        {
          role: 'user',
          parts: [{ text: `You asked about "${message}".` }],
        },
        {
          role: 'model',
          parts: [{ text: `Here's some information on ${selectedTopic}: ${topicResponse}` }],
        },
      ],
    });

    // Send the message to Gemini AI
    const result = await chatSession.sendMessage(message);

    // Ensure that the response has the expected structure
    if (!result || !result.response || !result.response.text) {
      throw new Error('Invalid response structure from the Generative AI model');
    }

    // Extract the AI-generated response
    const aiReply = result.response.text();

    // Return the response from Gemini AI
    return NextResponse.json({ reply: aiReply });

  } catch (error) {
    console.error('Error fetching from Gemini AI:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
