// app/api/generate-feedback/route.js
import { NextRequest, NextResponse } from "next/server";
import { generateFeedback } from "@/utils/GroqAI";

export async function POST(req) {
  try {
    const body = await req.json();
    const { question, userAnswer, correctAnswer } = body;

    // Validate input
    if (!question || !userAnswer) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate feedback using the utility function
    const result = await generateFeedback(question, userAnswer, correctAnswer);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Feedback API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
