// server/index.js
const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const { createGoogleGenerativeAI, google } = require ("@ai-sdk/google");
const { generateText } = require ("ai");
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para la API de generación de texto
app.post('/api/generate-text', async (req, res) => {
  
  const { prompt, sourceLang, targetLang } = req.body;

  try {
    const ai = new GoogleGenerativeAI({ apiKey: process.env.GOOGLE_API_KEY });
    
    const response = await generateText({
      model: google("models/gemini-1.5-flash-latest"),
      prompt: `Just translate the phase and do not put additional context. Translate the following text from ${sourceLang} to ${targetLang}: ${prompt}`,
    });

    res.json({ text: response });
  } catch (error) {
    console.error("Error en la generación de texto:", error);
    res.status(500).json({ error: 'Error en la generación de texto' });
  }
});

// Servir la aplicación frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});