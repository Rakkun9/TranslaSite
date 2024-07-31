import { GoogleGenerativeAI } from "@google/generative-ai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { generateText } from "ai";

//const genAI2 = new GoogleGenerativeAI(import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY);



const genAI = new GoogleGenerativeAI("AIzaSyB2mj4tS95ID7e0dUieqmnkBE4s6q-ved4");

async function run(prompt, sourceLang, targetLang) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const preppedPrompt = `Translate the following text from ${sourceLang} to ${targetLang}: ${prompt}`;

  const result = await model.generateContent(preppedPrompt);
  const response = await result.response;
  const text = response.text();
  return text;
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

    const google = createGoogleGenerativeAI({
      apiKey: "AIzaSyB2mj4tS95ID7e0dUieqmnkBE4s6q-ved4",
    });
    
    const { text } = await generateText({
      model: google("models/gemini-pro"),
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
    });
    console.log(text);

    // Promp to generate the translation

    // try {
    //   // Promp to generate the translation // Asegúrate de usar await aquí también
    //   texto2.value = await run(texto1, sourceLang, targetLang); // Sobrescribir el contenido de textarea2
    // } catch (error) {
    //   console.error("Error en la traducción:", error);
    //   texto2.value = "Error en la traducción";
    // }

    try {
      // Promp to generate the translation // Asegúrate de usar await aquí también
      texto2.value = await test(texto1, sourceLang, targetLang); // Sobrescribir el contenido de textarea2
    } catch (error) {
      console.error("Error en la traducción:", error);
      texto2.value = "Error en la traducción";
    }
  });
});
