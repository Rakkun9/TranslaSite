import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { prompt, sourceLang, targetLang } = await request.json();

    if (!prompt || !sourceLang || !targetLang) {
      return new Response(JSON.stringify({ error: 'Missing required fields: prompt, sourceLang, or targetLang' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = import.meta.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('Google API Key is not set in environment variables.');
      return new Response(JSON.stringify({ error: 'API Key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const fullPrompt = `Just translate the phrase and do not put additional context. Translate the following text from ${sourceLang} to ${targetLang}: ${prompt}`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const translatedText = response.text();

    return new Response(JSON.stringify({ translatedText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in translation API:", error);
    return new Response(JSON.stringify({ error: 'Failed to translate text' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
