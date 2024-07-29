import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("");

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
