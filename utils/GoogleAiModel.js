// ✅ To run this code, install dependencies:
// npm install @google/genai mime dotenv

const { GoogleGenAI } = require('@google/genai');
require('dotenv').config(); // Load NEXT_PUBLIC_GEMINI_API_KEY from .env

console.log("Gemini API Key:", process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// ✅ Initialize Gemini client
const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});


// ✅ Get the model
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

// ✅ Generation & safety configs
const generationConfig = {
  temperature: 0.7,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 1,
  },
  {
    category: 'HARM_CATEGORY_HATE_SPEECH',
    threshold: 1,
  },
];

// ✅ Start chat session
const chatSession = model.startChat({
  generationConfig,
  safetySettings,
  history: [],
});

// ✅ Main async function
async function run() {
  try {
    const result = await chatSession.sendMessage(
      'Give me 3 Node.js interview questions with answers in JSON format.'
    );

    console.log('\n Gemini Response:\n');
    console.log(result.response.text());
  } catch (err) {
    console.error(' Error occurred:', err.message || err);
  }
}

run();

// ✅ Exporting the chat session (optional for reuse)
module.exports = { chatSession };
