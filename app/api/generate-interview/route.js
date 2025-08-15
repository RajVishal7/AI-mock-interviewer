// app/api/generate-interview/route.js
import { NextRequest, NextResponse } from "next/server";
import { generateInterviewQuestions } from "@/utils/GroqAI";

export async function POST(req) {
  try {
    const body = await req.json();
    const { jobPosition, jobDesc, jobExperience, questionCount = 5 } = body;

    // Validate input
    if (!jobPosition || !jobDesc || !jobExperience) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate questions using the utility function
    const result = await generateInterviewQuestions(
      jobPosition,
      jobDesc,
      jobExperience,
      questionCount
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
