import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MIRABYTES_CONTEXT } from '@/lib/systemPrompt';

// Initialize the Google AI Client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    // ✅ CHANGED: Switched from "gemini-1.5-flash" to "gemma-3-27b-it"
    const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });

    // Construct the chat history with the System Prompt at the start
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: MIRABYTES_CONTEXT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am MIRA. I am ready to assist." }],
        },
        // If you are passing history from the frontend, ensure the roles match 
        // what Gemma expects (usually 'user' and 'model').
        ...(history || []) 
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Gemma 3 Error:", error);
    return NextResponse.json({ reply: "I'm having trouble connecting to the neural network. Please try again or email info@mirabytes.io." });
  }
}