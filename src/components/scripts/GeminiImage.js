import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB2mj4tS95ID7e0dUieqmnkBE4s6q-ved4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Obtén el elemento de entrada de archivos
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("dropzone-file");
  const textAreaImage = document.getElementById("textAreaImage");

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const sourceLang = document.getElementById("sourceLangImage").value;
        const targetLang = document.getElementById("targetLangImage").value;
        const base64Image = event.target.result.split(",")[1]; // Obtén la cadena base64
        const mimeType = file.type; // Obtén el tipo MIME del archivo

        const prompt = `Quiero que traduzcas el texto de esta imagen de ${sourceLang} a ${targetLang}, tu respuesta tiene que ser dada en ${targetLang}.`;
        console.log(prompt);

        const image = {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        };

        if (sourceLang === targetLang) {
          alert("Por favor, selecciona idiomas diferentes");
          return;
        }
        console.log("Imagen en base64:", base64Image);
        console.log("Tipo MIME:", mimeType);

        const result = await model.generateContent([prompt, image]);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        textAreaImage.value = text;
      };

      reader.readAsDataURL(file); // Lee el archivo como una URL de datos (base64)
    } else {
      console.error("No se seleccionó ningún archivo.");
    }
  });
});
