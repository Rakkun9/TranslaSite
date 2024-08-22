# TranslaSite

TranslaSite es una aplicación web que permite traducir texto entre múltiples idiomas utilizando la inteligencia artificial de Google Generative AI (GEMINI). La aplicación está construida con Node.js y Express en el backend, y proporciona una API personalizada para manejar las solicitudes de traducción.

## Características

- Traducción de texto entre múltiples idiomas utilizando GEMINI.
- Interfaz de usuario intuitiva y fácil de usar.
- Configuración de CORS para permitir solicitudes desde el frontend.
- Despliegue en Vercel para pruebas y uso en producción.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- Cuenta en Vercel (opcional para despliegue)

## Instalación

Sigue estos pasos para descargar y ejecutar el proyecto localmente:

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/transla-site.git
   cd transla-site
   ```

2. **Instala las dependencias del proyecto:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto y añade tu clave de API de Google Generative AI:

   ```env
   GOOGLE_API_KEY=tu-clave-de-api
   ```

4. **Inicia el servidor local:**

   ```bash
   node server/index.js
   ```

5. \*\*Abre tu navegador y navega a [`http://localhost:4321`]

   ```bash
   npm start
   ```

6. **(Opcional) Pruebas con Vercel:**

   Si deseas hacer pruebas con Vercel, asegúrate de tener el CLI de Vercel instalado y ejecuta:

   ```bash
   vercel dev
   ```

## Uso

1. Introduce el texto que deseas traducir en el área de texto.
2. Selecciona el idioma de origen y el idioma de destino.
3. Haz clic en el botón "Traducir" para obtener la traducción.

## Despliegue en Vercel

Para desplegar la aplicación en Vercel, sigue estos pasos:

1. **Instala el CLI de Vercel:**

   ```bash
   npm install -g vercel
   ```

2. **Inicia sesión en Vercel:**

   ```bash
   vercel login
   ```

3. **Despliega la aplicación:**

   ```bash
   vercel
   ```

4. **Configura las variables de entorno en Vercel:**

   Ve a tu dashboard de Vercel, selecciona tu proyecto y añade la variable de entorno `GOOGLE_API_KEY` con tu clave de API.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva característica'`).
4. Sube tus cambios (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Contacto

Para cualquier consulta o sugerencia, dentro de la página web hay una sección de (`contactame`) si deseas enviaerme algún comentario
