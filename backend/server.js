// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Test route
app.get("/", (req, res) => {
  res.send("AI Backend running successfully with Gemini API!");
});

// Analyze code route
app.post("/api/analyze", async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required." });
  }

const prompt = `
You are an expert ${language} developer and a concise technical assistant.  
Analyze the following ${language} code and respond in **a short, well-formatted style**.

CODE:
${code}

Your response format must follow this structure:

 Purpose: (clearly explain what the code does and how it functions in short)

Issues / Bugs: (Mention only if present, otherwise say "None detected.")

Complexity: (State approximate time complexity and space complexity in Big-O notation if applicable)

Optimization Tip: (short suggestion for improving efficiency or readability)

Rules:
- Keep each section short and easy to read.
- Do NOT write paragraphs.
- Do NOT explain trivial code in detail.
- Dont Use emojis and use section headers and bold headings exactly as shown.
- Be clear, structured, and concise.
`;


  try {
    // Get a generative model (replace "gemini-1.5" if needed)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate AI response
    const result = await model.generateContent(prompt);

    // Extract text
    const text = result.response.text();

    res.json({ output: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Failed to generate content. Check API key or model.",
      details: error.message,
    });
  }
});

// Start server
// (Docker-compatible)
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Backend running on http://0.0.0.0:${PORT}`)
);

