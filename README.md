# TranslaSite

TranslaSite es una aplicación web que utiliza la API de Google Generative AI para traducir texto de un idioma a otro. Esta aplicación está construida con Node.js y Express en el backend, y utiliza una API personalizada para manejar las solicitudes de traducción.

## Características

- Traducción de texto entre múltiples idiomas.
- Interfaz de usuario sencilla y fácil de usar.
- Configuración de CORS para permitir solicitudes desde el frontend.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/tu-usuario/transla-site.git
    cd transla-site
    ```

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

3. Corre un localhost o inicia con este comando el servidor local. Con este comando podras usar este como puente para la aplicación desplegada en vercel

    ```env
    node server/index.js
    ```

4. Inicia el servidor:

    ```bash
    npm start
    ```

5. Abre tu navegador y navega a `http://localhost:4321`. O puedes hacer las pruebas con el comando de `vercel dev` con el CLI de vercel

## Uso

1. Introduce el texto que deseas traducir en el área de texto.
2. Selecciona el idioma de origen y el idioma de destino.
3. Haz clic en el botón "Traducir" para obtener la traducción.
  ...
