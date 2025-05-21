
/**
 * Function to run the translation using the API endpoint
 * @param {string} prompt - The text to be translated
 * @param {string} sourceLang - The source language of the text
 * @param {string} targetLang - The target language for the translation
 * @returns {Promise<string>} - The translated text
 * 
 * Change the AI SDK code to GEMINI base code
 */

async function run(prompt, sourceLang, targetLang) {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, sourceLang, targetLang }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error from API:', errorData.error);
    throw new Error(errorData.error || 'Failed to translate');
  }

  const data = await response.json();
  return data.translatedText;
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
    // Clear the input text
  });
});
