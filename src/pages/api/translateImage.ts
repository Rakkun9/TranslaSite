import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { base64Image, mimeType, sourceLang, targetLang } = await request.json();

    if (!base64Image || !mimeType || !sourceLang || !targetLang) {
      return new Response(JSON.stringify({ error: 'Missing required fields: base64Image, mimeType, sourceLang, or targetLang' }), {
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Quiero que traduzcas el texto de esta imagen de ${sourceLang} a ${targetLang}, tu respuesta tiene que ser dada en ${targetLang}.`;
    
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const translatedText = response.text();

    return new Response(JSON.stringify({ translatedText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in image translation API:", error);
    return new Response(JSON.stringify({ error: 'Failed to translate image text' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
