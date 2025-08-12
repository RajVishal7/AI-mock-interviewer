// app/api/generate-interview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(req) {
  const body = await req.json();

  const { jobPosition, jobDesc, jobExperience, questionCount = 5 } = body;

  const inputPrompt = `
Generate ${questionCount} high-quality technical interview questions in JSON format for:
- Job Position: ${jobPosition}
- Job Description/Tech Stack: ${jobDesc}
- Years of Experience: ${jobExperience}

Format:
[
  {
    "question": "Your question here",
    "answer": "Sample expected answer here"
  }
]
`;

  try {
    const result = await openai.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful AI that returns JSON in markdown code blocks like ```json{...}```.',
        },
        {
          role: 'user',
          content: inputPrompt,
        },
      ],
      temperature: 0.7,
    });

    console.log("result",result)
    const textResponse = result.choices[0]?.message?.content || '';
    console.log("Groq raw response:", textResponse);
const jsonMatch = textResponse.match(/\[\s*{[\s\S]*?}\s*]/); // Matches [ {...}, {...} ]
if (!jsonMatch) {
  throw new Error("No valid JSON array found in AI response");
}

const parsedResponse = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ success: true, questions: parsedResponse });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate questions.' }, { status: 500 });
  }
}
