// Inicializa la API de Google Generative AI con la clave API proporcionada

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
        const sourceLang = document.getElementById("sourceLangImage").value;
        const targetLang = document.getElementById("targetLangImage").value;
        const base64Image = event.target.result.split(",")[1];
        const mimeType = file.type;

        if (sourceLang === targetLang) {
          alert("Por favor, selecciona idiomas diferentes");
          return;
        }

        try {
          const response = await fetch('/api/translateImage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              base64Image,
              mimeType,
              sourceLang,
              targetLang,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' })); // Catch if error response is not JSON
            console.error('Error from API:', errorData.error);
            textAreaImage.value = `Error: ${errorData.error || 'Failed to translate image'}`;
            return;
          }

          const data = await response.json();
          textAreaImage.value = data.translatedText;
        } catch (error) {
          console.error("Error fetching image translation:", error);
          textAreaImage.value = "Error en la traducción de la imagen.";
        }
      };

      reader.readAsDataURL(file); // Lee el archivo como una URL de datos (base64)
    } else {
      console.error("No se seleccionó ningún archivo."); // Muestra un error si no se seleccionó ningún archivo
    }
  });
});