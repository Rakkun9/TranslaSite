require("dotenv").config();

const express = require("express");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createGoogleGenerativeAI, google } = require("@ai-sdk/google");
const { generateText } = require("ai");

const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  cors({
    origin: "http://localhost:4321", // Cambia esto por el origen de tu frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Ruta para la API de generación de texto
app.post("/api/generate-text", async (req, res) => {
  const { prompt, sourceLang, targetLang } = req.body;

  try {

    const google = createGoogleGenerativeAI({
      //This api key is public anyone can use it
      apiKey: "AIzaSyB2mj4tS95ID7e0dUieqmnkBE4s6q-ved4", // should ideally be loaded from external place such as env variable
    });



    const response = await generateText({
      model: google("models/gemini-1.5-flash-latest"),
      prompt: `Just translate the phase and do not put additional context. Translate the following text from ${sourceLang} to ${targetLang}: ${prompt}`,
    });

    console.log(response)
    console.log(response.text)


    res.json({ text: response.text });
  } catch (error) {
    console.error("Error en la generación de texto:", error);
    res.status(500).json({ error: "Error en la generación de texto" });
  }
});

// Servir la aplicación frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
