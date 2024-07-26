
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("");

async function run(prompt){
  
    const model = genAI.getGenerativeModel({model:'gemini-1.5-flash'});

    const preppedPrompt = 'Translate the following text into Spanish: ' + prompt;

    const result = await model.generateContent(preppedPrompt);
    const response = await result.response; 
    const text = response.text(); 
    console.log(text);
    return text; 
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(
    'input[type="button"][value="Traducir"]'
  );
  button.addEventListener("click", async () => {
    const texto1 = document.getElementById("textarea1").value;
    console.log("Contenido del textarea 1:", texto1);
    const texto2 = document.getElementById("textarea2");

    // Promp to generate the translation

    try {
      // Promp to generate the translation // Asegúrate de usar await aquí también
      texto2.value = await run(texto1); // Sobrescribir el contenido de textarea2
    } catch (error) {
      console.error("Error en la traducción:", error);
      texto2.value = "Error en la traducción";
    }

    
  });
});

   
