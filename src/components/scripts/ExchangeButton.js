document.addEventListener("DOMContentLoaded", () => {
  const exchangeButton = document.getElementById("exchangeButton");
  const exchangeButtonImage = document.getElementById("exchangeButtonImage");

  const sourceLangSelect = document.getElementById("sourceLang");
  const targetLangSelect = document.getElementById("targetLang");
  const sourceLangSelectImage = document.getElementById("sourceLangImage");
  const targetLangSelectImage = document.getElementById("targetLangImage");

  // Añade un evento de clic al botón Exchange
  exchangeButton.addEventListener("click", () => {

    // Intercambia los valores seleccionados de los select
    const tempValue = sourceLangSelect.value;
    sourceLangSelect.value = targetLangSelect.value;
    targetLangSelect.value = tempValue;
  });

  exchangeButtonImage.addEventListener("click", () => {

    const tempValue = sourceLangSelectImage.value;
    // Intercambia los valores seleccionados de los select
    sourceLangSelectImage.value = targetLangSelectImage.value;
    targetLangSelectImage.value = tempValue;
  });
});
