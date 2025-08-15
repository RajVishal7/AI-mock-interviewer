// Groq AI Utility Functions
import OpenAI from "openai";

// Initialize Groq OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Generate interview questions
export async function generateInterviewQuestions(
  jobPosition,
  jobDesc,
  jobExperience,
  questionCount = 5
) {
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
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI that returns JSON in markdown code blocks like ```json{...}```.",
        },
        {
          role: "user",
          content: inputPrompt,
        },
      ],
      temperature: 0.7,
    });

    const textResponse = result.choices[0]?.message?.content || "";

    // Extract JSON from the response
    const jsonMatch = textResponse.match(/\[\s*{[\s\S]*?}\s*]/);
    if (!jsonMatch) {
      throw new Error("No valid JSON array found in AI response");
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);
    return { success: true, questions: parsedResponse };
  } catch (error) {
    console.error("Groq AI Error:", error);
    return { success: false, error: "Failed to generate questions." };
  }
}

// Generate feedback for user answers
export async function generateFeedback(question, userAnswer, correctAnswer) {
  const feedbackPrompt = `
Question: ${question}
User Answer: ${userAnswer}
Expected Answer: ${correctAnswer}

Based on the question and user answer, please provide a rating (1-10) and feedback with areas of improvement if any.
Return the response in JSON format with 'rating' and 'feedback' fields only.

Example:
{
  "rating": "8",
  "feedback": "Good answer overall. You covered the main concepts well. Consider mentioning..."
}
`;

  try {
    const result = await openai.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are an expert technical interviewer. Provide constructive feedback and accurate ratings for interview answers. Always return valid JSON.",
        },
        {
          role: "user",
          content: feedbackPrompt,
        },
      ],
      temperature: 0.7,
    });

    const textResponse = result.choices[0]?.message?.content || "";

    // Clean the response and parse JSON
    const cleanedResponse = textResponse.replace(/```json|```/g, "").trim();
    const feedbackData = JSON.parse(cleanedResponse);

    return { success: true, feedback: feedbackData };
  } catch (error) {
    console.error("Groq Feedback Error:", error);
    return {
      success: false,
      feedback: {
        rating: "5",
        feedback: "Unable to process feedback at this time.",
      },
    };
  }
}

// Chat Session for general AI interactions
export class GroqChatSession {
  constructor() {
    this.messages = [];
  }

  async sendMessage(prompt) {
    try {
      this.messages.push({
        role: "user",
        content: prompt,
      });

      const result = await openai.chat.completions.create({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant.",
          },
          ...this.messages,
        ],
        temperature: 0.7,
      });

      const response = result.choices[0]?.message?.content || "";

      this.messages.push({
        role: "assistant",
        content: response,
      });

      return {
        response: {
          text: () => response,
        },
      };
    } catch (error) {
      console.error("Groq Chat Error:", error);
      throw error;
    }
  }

  clearHistory() {
    this.messages = [];
  }
}

export default openai;
