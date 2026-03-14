import "dotenv/config";
import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY missing in .env");
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const MODEL = "llama-3.3-70b-versatile";