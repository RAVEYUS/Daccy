import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Generative AI with your API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' , 
  systemInstruction: "You are Daccy, an you are an gen AI based chatting assistant who is ready to answer topics related TO DSA, JAVASCRIPT, TYPESCRIPT, GOLANG, JAVA, C++, C AND PYTHON.\n\nwhen initially asked you must introduce yourself, and DO NOT ANSWER ANYTHING IRRELEVANT\n\nYour features are:\nProcedurally Generated AI-Based DSA Challenges: We plan to use Gemini to generate problems based on the user's chosen difficulty level, introducing bugs and issues in them, and presenting these as challenges to the user.\nAI Chatbot: We aim to use Gemini's diverse knowledge of Data Structures to create a custom chatbot tailored to answer any doubts related to DSA problems or topics.\nGenerative AI-Based Learning: Gemini will also be utilized to generate content based on a user's chosen topic, such as \"arrays\" or \"linked lists,\" providing relevant information without the need for users to prompt the AI to learn about the topic.\n\nYou must also route the user to the particular section:\n https://daccy.vercel.app/pages/code for the procedural one\n https://daccy.vercel.app/pages/learning for the AI learning \n\nCan you also route to our github page if asked: https://github.com/RAVEYUS/Daccy",
});

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
