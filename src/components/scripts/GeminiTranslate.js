import { GoogleGenerativeAI } from "@google/generative-ai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { generateText } from "ai";

// This API key is public; anyone can use it
const genAI = new GoogleGenerativeAI("AIzaSyB2mj4tS95ID7e0dUieqmnkBE4s6q-ved4");

/**
 * Function to run the translation using Google Generative AI
 * @param {string} prompt - The text to be translated
 * @param {string} sourceLang - The source language of the text
 * @param {string} targetLang - The target language for the translation
 * @returns {Promise<string>} - The translated text
 * 
 * Change the AI SDK code to GEMINI base code
 */

async function run(prompt, sourceLang, targetLang) {
  const google = createGoogleGenerativeAI({
    // This API key is public; anyone can use it
    apiKey: "AIzaSyB2mj4tS95ID7e0dUieqmnkBE4s6q-ved4", // should ideally be loaded from an external place such as an environment variable
  });

  // Generate the translation using the AI model
  const promptVercel = await generateText({
    model: google("models/gemini-1.5-flash-latest"),
    prompt: `Just translate the phrase and do not put additional context. Translate the following text from ${sourceLang} to ${targetLang}: ${prompt}`,
  });

  return promptVercel.text;
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the translate button
  const button = document.querySelector(
    'input[type="button"][value="Traducir"]'
  );

  // Add click event listener to the translate button
  button.addEventListener("click", async () => {
    // Get the input text and the output text area
    const texto1 = document.getElementById("textarea1").value;
    const texto2 = document.getElementById("textarea2");

    // Get the selected source and target languages
    const sourceLang = document.getElementById("sourceLang").value;
    const targetLang = document.getElementById("targetLang").value;

    // Validate the input text
    if (!texto1) {
      alert("Por favor, introduce el texto a traducir");
      return;
    }

    // Validate that source and target languages are different
    if (sourceLang === targetLang) {
      alert("Por favor, selecciona idiomas diferentes");
      return;
    }

    // Prompt to generate the translation
    try {
      // Ensure to use await here to get the translated text
      texto2.value = await run(texto1, sourceLang, targetLang); // Overwrite the content of textarea2
    } catch (error) {
      console.error("Error en la traducción:", error);
      texto2.value = "Error en la traducción";
    }
  });
});
