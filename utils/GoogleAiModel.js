// Groq OpenAI Chat Session - Replacing Google GenAI
import OpenAI from "openai";

// Initialize Groq OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Chat Session class to maintain conversation context
class ChatSession {
  constructor() {
    this.messages = [];
  }

  async sendMessage(prompt) {
    try {
      // Add user message to conversation history
      this.messages.push({
        role: "user",
        content: prompt,
      });

      const result = await openai.chat.completions.create({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful AI assistant that provides accurate and detailed responses.",
          },
          ...this.messages,
        ],
        temperature: 0.7,
        max_tokens: 2048,
      });

      const response = result.choices[0]?.message?.content || "";

      // Add assistant response to conversation history
      this.messages.push({
        role: "assistant",
        content: response,
      });

      // Return response in a format compatible with previous GenAI usage
      return {
        response: {
          text: () => response,
        },
      };
    } catch (error) {
      console.error("Groq API Error:", error);
      throw error;
    }
  }

  // Clear conversation history
  clearHistory() {
    this.messages = [];
  }
}

// Create and export chat session instance
export const chatSession = new ChatSession();

// For CommonJS compatibility
module.exports = { chatSession };
