

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI("AIzaSyAA40AqFb9uWjFhI4cBfi_GNzNQXX8e3-k");

async function run(prompt){
    const model = genAI.getGenerativeModel({model:'gemini-1.5-flash'});

    const result = await model.generateContent(prompt);
    const response = await result.response; 
    const text = response.text(); 
    console.log(text);
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(
    'input[type="button"][value="Traducir"]'
  );
  button.addEventListener("click", () => {
    const texto1 = document.getElementById("textarea1").value;
    console.log("Contenido del textarea 1:", texto1);

    run("Cual es el significado de la vida"); 
    
    
  
    // Aquí puedes agregar la lógica para enviar los datos al servidor o manipularlos según sea necesario
  });
});
   
