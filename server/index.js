// server/index.js
const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para manejar datos JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para la API de generación de texto
app.post('/api/generate-text', async (req, res) => {
  try {
    const { prompt } = req.body;
    const ai = new GoogleGenerativeAI({ apiKey: process.env.GOOGLE_API_KEY });
    const response = await ai.generateText({ prompt });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Servir la aplicación frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 