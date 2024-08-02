import { GoogleGenerativeAI } from "@google/generative-ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

//This api key is public anyone can use it

const genAI = new GoogleGenerativeAI("AIzaSyB2mj4tS95ID7e0dUieqmnkBE4s6q-ved4");

async function run(prompt, sourceLang, targetLang) {
  const google = createGoogleGenerativeAI({
    //This api key is public anyone can use it
    apiKey: "AIzaSyB2mj4tS95ID7e0dUieqmnkBE4s6q-ved4", // should ideally be loaded from external place such as env variable
  });

  const promptVercel = await generateText({
    model: google("models/gemini-1.5-flash-latest"),
    prompt: `Just translate the phase and do not put additional context. Translate the following text from ${sourceLang} to ${targetLang}: ${prompt}`,
  });

  return promptVercel.text;
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(
    'input[type="button"][value="Traducir"]'
  );
  button.addEventListener("click", async () => {
    const texto1 = document.getElementById("textarea1").value;
    const texto2 = document.getElementById("textarea2");

    const sourceLang = document.getElementById("sourceLang").value;
    const targetLang = document.getElementById("targetLang").value;

    if (!texto1) {
      alert("Por favor, introduce el texto a traducir");
      return;
    }
    if (sourceLang === targetLang) {
      alert("Por favor, selecciona idiomas diferentes");
      return;
    }

    // Promp to generate the translation

    try {
      // Promp to generate the translation // Asegúrate de usar await aquí también
      texto2.value = await run(texto1, sourceLang, targetLang); // Sobrescribir el contenido de textarea2
    } catch (error) {
      console.error("Error en la traducción:", error);
      texto2.value = "Error en la traducción";
    }
  });
});
