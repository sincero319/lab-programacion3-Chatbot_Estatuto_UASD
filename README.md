# Chatbot Inteligente UASD

Aplicación web tipo chatbot desarrollada para consultar el **Estatuto Orgánico de la Universidad Autónoma de Santo Domingo (UASD)** utilizando Inteligencia Artificial.

El sistema permite realizar preguntas en lenguaje natural y obtener respuestas claras, coherentes y basadas únicamente en el contenido oficial del Estatuto Orgánico de la UASD.

---

# Características

- Interfaz moderna y responsive.
- Chat interactivo tipo IA.
- Preguntas sugeridas.
- Historial básico de conversación.
- Búsqueda inteligente dentro del Estatuto.
- Respuestas contextualizadas.
- Diseño adaptable para computadoras y móviles.
- Proyecto ligero y fácil de desplegar.
- Funciona completamente desde frontend.

---

# Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- API de Inteligencia Artificial
- Fetch API

---

# Estructura del Proyecto

```bash
/proyecto
│
├── index.html
├── style.css
├── app.js
├── estatuto.txt
└── README.md
```

---

# Funcionamiento del Sistema

El chatbot utiliza el contenido del Estatuto Orgánico de la UASD como fuente principal de información.

## Flujo de funcionamiento

1. El usuario escribe una pregunta.
2. El sistema busca fragmentos relevantes dentro de `estatuto.txt`.
3. Los fragmentos encontrados se envían como contexto a la IA.
4. La IA genera una respuesta basada únicamente en el contenido proporcionado.
5. La respuesta se muestra en el chat.

---

# Fuente Oficial del Estatuto

Documento oficial utilizado:

https://postgrado.uasd.edu.do/wp-content/uploads/2024/06/ESTATUTO-ORGANICO-UASD.pdf

---

# Funcionalidades Implementadas

## Interfaz Web

- Área de conversación.
- Campo para preguntas.
- Botón de envío.
- Loader de respuesta.
- Scroll automático.
- Diseño responsive.
- Tema visual moderno.

## Inteligencia Artificial

- Procesamiento de lenguaje natural.
- Interpretación de preguntas.
- Búsqueda contextual.
- Generación automática de respuestas.

## Preguntas Sugeridas

El sistema incluye preguntas como:

- ¿Cuál es la misión de la UASD?
- ¿Qué es el Claustro Mayor?
- ¿Cuáles son los derechos de los estudiantes?
- ¿Cuáles son las funciones del Rector?
- ¿Qué establece el Estatuto sobre la autonomía universitaria?
- ¿Qué son las Facultades?

---

# Cómo Ejecutar el Proyecto

Simplemente abrir el archivo:

```bash
index.html
```

en cualquier navegador moderno.

---

# Configuración de la API

El proyecto utiliza una API de Inteligencia Artificial.

## Pasos generales

1. Crear una cuenta en el proveedor de IA.
2. Obtener una API KEY.
3. Colocar la clave dentro del archivo `app.js`.

Ejemplo:

```javascript
const API_KEY = "TU_API_KEY";
```

---

# Buenas Prácticas Aplicadas

- Código organizado.
- Comentarios importantes.
- Manejo de errores.
- Diseño responsive.
- Optimización de archivos.
- Estructura ligera.
- Separación de responsabilidades.

---

# Objetivo Académico

Este proyecto fue desarrollado como proyecto final de la asignatura:

**Laboratorio de Lenguaje de Programación III – Web**

Con el objetivo de integrar tecnologías web modernas e Inteligencia Artificial para la consulta interactiva del Estatuto Orgánico de la UASD.

---

# Autor

Proyecto desarrollado por:

**Ignacio Hernandez Ubaldo**

Universidad Autónoma de Santo Domingo (UASD)

2026
