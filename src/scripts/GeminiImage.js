import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Do these look store-bought or homemade?";
// const image = {
//   inlineData: {
//     data: Buffer.from(fs.readFileSync("cookie.png")).toString("base64"),
//     mimeType: "image/png, image/jpeg",
//   },
// };


// document.addEventListener("DOMContentLoaded", () => {
//   const fileInput = document.getElementById("dropzone-file");
//   let imageUrl = '';

//   fileInput.addEventListener("change", () => {
//     const file = fileInput.files[0];
//     if (file) {
//       imageUrl = URL.createObjectURL(file);
//       console.log("Ruta de la imagen:", imageUrl);
//       // Ahora puedes usar `imageUrl` en tu procesamiento
//     } else {
//       console.error('No se seleccionó ningún archivo.');
//     }
//   });
// });

// Obtén el elemento de entrada de archivos
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("dropzone-file");

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const base64Image = event.target.result.split(",")[1]; // Obtén la cadena base64
        const mimeType = file.type; // Obtén el tipo MIME del archivo

        const prompt = "Qué ves en esta imagen";

        const image = {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        };

        console.log("Imagen en base64:", base64Image);
        console.log("Tipo MIME:", mimeType);



        const result = await model.generateContent([prompt, image]);
        console.log(result.response.text());
        const response = await result.response;
        const text = response.text();
        console.log(text);
      };

      reader.readAsDataURL(file); // Lee el archivo como una URL de datos (base64)
    } else {
      console.error("No se seleccionó ningún archivo.");
    }
  });
});
