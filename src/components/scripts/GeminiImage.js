import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa la API de Google Generative AI con la clave API proporcionada
const genAI = new GoogleGenerativeAI("AIzaSyB2mj4tS95ID7e0dUieqmnkBE4s6q-ved4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Obtiene el elemento de entrada de archivos y el área de texto para la imagen
  const fileInput = document.getElementById("dropzone-file");
  const textAreaImage = document.getElementById("textAreaImage");

  // Restringe los tipos de archivos que se pueden seleccionar a png, jpeg y jpg
  fileInput.setAttribute("accept", "image/png, image/jpeg, image/jpg");

  // Añade un evento para manejar el cambio en la selección de archivos
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0]; // Obtiene el primer archivo seleccionado
    if (file) {
      const reader = new FileReader(); // Crea un nuevo FileReader para leer el archivo
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]; // Tipos de archivos permitidos

      // Verifica si el tipo de archivo es permitido
      if (!allowedTypes.includes(file.type)) {
        alert("Por favor, selecciona un archivo de imagen válido (png, jpeg, jpg).");
        fileInput.value = ""; // Resetea el input de archivo
        return;
      }

      // Maneja la carga del archivo
      reader.onload = async (event) => {
        const sourceLang = document.getElementById("sourceLangImage").value; // Obtiene el idioma de origen
        const targetLang = document.getElementById("targetLangImage").value; // Obtiene el idioma de destino
        const base64Image = event.target.result.split(",")[1]; // Obtiene la cadena base64 de la imagen
        const mimeType = file.type; // Obtiene el tipo MIME del archivo

        // Crea el prompt para la API de Google Generative AI
        const prompt = `Quiero que traduzcas el texto de esta imagen de ${sourceLang} a ${targetLang}, tu respuesta tiene que ser dada en ${targetLang}.`;
        console.log(prompt);

        // Crea el objeto de imagen con los datos en base64 y el tipo MIME
        const image = {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        };

        // Verifica si los idiomas de origen y destino son diferentes
        if (sourceLang === targetLang) {
          alert("Por favor, selecciona idiomas diferentes");
          return;
        }

        // Llama a la API de Google Generative AI para generar el contenido
        const result = await model.generateContent([prompt, image]);
        const response = await result.response;
        const text = response.text(); // Obtiene el texto de la respuesta
        textAreaImage.value = text; // Muestra el texto en el área de texto
      };

      reader.readAsDataURL(file); // Lee el archivo como una URL de datos (base64)
    } else {
      console.error("No se seleccionó ningún archivo."); // Muestra un error si no se seleccionó ningún archivo
    }
  });
});