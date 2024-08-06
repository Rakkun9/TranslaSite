document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector('input[type="button"][value="Traducir"]');
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

    try {
      const response = await fetch('http://localhost:5000/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: texto1, sourceLang, targetLang })
      });
      
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      if (response.ok) {
        texto2.value = data.text;
      } else {
        console.error("Error en la traducción:", data.error);
        texto2.value = "Error en la traducción";
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      texto2.value = "Error en la solicitud";
    }
  });
});