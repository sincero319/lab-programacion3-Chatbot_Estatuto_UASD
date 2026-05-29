const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const OPENROUTER_MODEL = "openai/gpt-4o-mini";
const GROQ_MODEL = "llama-3.1-8b-instant";
const ESTATUTO_PDF_URL =
  "https://postgrado.uasd.edu.do/wp-content/uploads/2024/06/ESTATUTO-ORGANICO-UASD.pdf";
const PDF_TEXT_PROXY_URL = `https://r.jina.ai/http://postgrado.uasd.edu.do/wp-content/uploads/2024/06/ESTATUTO-ORGANICO-UASD.pdf`;

const SUGGESTED_QUESTIONS = [
  "Que es la Universidad Autonoma de Santo Domingo?",
  "Cual es la mision de la UASD?",
  "Cuales son los fines de la Universidad?",
  "Cuales son las funciones fundamentales de la UASD?",
  "Que establece el Estatuto sobre la autonomia universitaria?",
  "Cuales son los principios que orientan a la Universidad?",
  "Como esta organizada la Universidad?",
  "Cuales son los organismos de gobierno de la UASD?",
  "Que es el Claustro Mayor?",
  "Que es el Claustro Menor?",
  "Que es el Consejo Universitario?",
  "Quienes integran el Consejo Universitario?",
  "Cuales son las atribuciones del Consejo Universitario?",
  "Cuales son las funciones del Rector?",
  "Cuales son las funciones de los Vicerrectores?",
  "Que son las Facultades?",
  "Como se organizan las Facultades?",
  "Que son los Consejos Directivos de Facultad?",
  "Cuales son las funciones de los Decanos?",
  "Que son las Escuelas?",
  "Cuales son las funciones de los Directores de Escuela?",
  "Que establece el Estatuto sobre los Recintos, Centros y Subcentros Universitarios?",
  "Que establece el Estatuto sobre el personal docente?",
  "Cuales son los derechos del personal docente?",
  "Cuales son los deberes del personal docente?",
  "Que establece el Estatuto sobre los estudiantes?",
  "Cuales son los derechos de los estudiantes?",
  "Cuales son los deberes de los estudiantes?",
  "Que establece el Estatuto sobre la representacion estudiantil?",
  "Que establece el Estatuto sobre la investigacion?",
  "Que establece el Estatuto sobre el postgrado?",
  "Que establece el Estatuto sobre la extension universitaria?",
  "Que establece el Estatuto sobre el bienestar universitario?",
  "Que establece el Estatuto sobre el regimen disciplinario?",
  "Que establece el Estatuto sobre el patrimonio universitario?"
];

const STOPWORDS_ES = new Set([
  "de", "la", "el", "los", "las", "y", "o", "u", "a", "ante", "bajo", "con",
  "contra", "desde", "durante", "en", "entre", "hacia", "hasta", "mediante",
  "para", "por", "segun", "sin", "sobre", "tras", "que", "como", "cual",
  "cuales", "quien", "quienes", "donde", "cuando", "porque", "es", "son", "se",
  "su", "sus", "un", "una", "unos", "unas", "del", "al", "lo", "le", "les",
  "me", "te", "nos", "mi", "tu", "esto", "esta", "este", "estos", "estas"
]);

const QUERY_EXPANSIONS = {
  protesta: ["vida universitaria", "democracia", "pensamiento", "libertad", "disciplinario", "manifestacion"],
  protestas: ["vida universitaria", "democracia", "pensamiento", "libertad", "disciplinario", "manifestacion"],
  admitir: ["admisiones", "inscripciones", "matriculas", "estudiantes", "ingreso"],
  admite: ["admisiones", "inscripciones", "matriculas", "estudiantes", "ingreso"],
  admision: ["inscripciones", "matriculas", "estudiantes", "ingreso"],
  estudiantes: ["matriculas", "inscripciones", "derechos", "deberes"],
  universidad: ["uasd", "facultades", "consejo", "claustro", "organizacion"],
  organizada: ["organizacion", "estructura", "facultades", "escuelas", "institutos"],
  organo: ["organismo", "consejo", "claustro", "autoridad"],
  nota: ["calificaciones", "examenes", "asistencia", "matriculas"],
  porcentaje: ["porciento", "requisitos", "reglamentar", "asistencia"],
  asistencia: ["matriculas", "inscripciones", "examenes", "reglamentar"],
  fines: ["funciones", "actividades", "institucion", "fundamentalmente", "articulo 10"],
  mision: ["vision", "valores", "articulo 7"],
  funciones: ["actividades", "fundamentalmente", "articulo 10"],
  principios: ["valores", "criterios", "articulo 9", "articulo 11"],
  autonomia: ["independencia", "fuero", "criterio", "articulo 11"],
  claustro: ["organismo", "colegiado", "gobierno"],
  consejo: ["universitario", "atribuciones", "integra"],
  rector: ["vicerrector", "funciones", "maximo ejecutivo"],
  facultad: ["escuela", "decano", "consejo directivo"],
  escuela: ["catedra", "director", "asignatura"],
  decano: ["facultad", "funciones"],
  recinto: ["centro", "subcentro", "universitario"],
  docente: ["profesor", "academico", "derechos", "deberes"],
  estudiante: ["matricula", "derechos", "deberes", "representacion"],
  investigacion: ["cientifica", "comision"],
  postgrado: ["posgrado", "consejo"],
  extension: ["cultural", "cientifica"],
  bienestar: ["estudiantil", "universitario"],
  disciplinario: ["sancion", "regimen"],
  patrimonio: ["inviolable", "bienes", "universitario"]
};

// Pistas de busqueda para preguntas frecuentes (incluye sugeridas).
const QUESTION_TOPIC_HINTS = [
  { match: ["universidad autonoma", "santo domingo"], keywords: ["articulo 1", "continuacion", "institucion publica"] },
  { match: ["mision", "uasd"], keywords: ["es mision de la universidad", "articulo 7"] },
  { match: ["fines", "universidad"], keywords: ["articulo 10", "dirigirse fundamentalmente", "fines de la institucion", "fines y funciones"] },
  { match: ["funciones fundamentales"], keywords: ["articulo 10", "actividades de la universidad", "dirigirse fundamentalmente"] },
  { match: ["autonomia universitaria"], keywords: ["autonomia", "articulo 11", "fuero universitario", "independencia"] },
  { match: ["principios", "orientan"], keywords: ["articulo 9", "articulo 11", "valores", "criterios"] },
  { match: ["organizada", "universidad"], keywords: ["articulo 12", "articulo 13", "estructura", "facultades"] },
  { match: ["organismos", "gobierno"], keywords: ["estructura de gobierno", "claustro", "consejo universitario"] },
  { match: ["claustro mayor"], keywords: ["claustro mayor", "organismo"] },
  { match: ["claustro menor"], keywords: ["claustro menor", "organismo"] },
  { match: ["consejo universitario"], keywords: ["consejo universitario", "atribuciones", "integra"] },
  { match: ["integran", "consejo universitario"], keywords: ["consejo universitario", "integrado", "miembros"] },
  { match: ["atribuciones", "consejo universitario"], keywords: ["atribuciones del consejo", "articulo 34"] },
  { match: ["funciones", "rector"], keywords: ["rector", "funciones", "articulo"] },
  { match: ["funciones", "vicerrector"], keywords: ["vicerrector", "funciones"] },
  { match: ["facultades"], keywords: ["facultad", "unidad academica", "decano"] },
  { match: ["organizan", "facultades"], keywords: ["facultad", "escuelas", "catedras", "consejo directivo"] },
  { match: ["consejos directivos", "facultad"], keywords: ["consejo directivo de facultad", "funciones"] },
  { match: ["funciones", "decanos"], keywords: ["decano", "facultad", "funciones"] },
  { match: ["escuelas"], keywords: ["escuela", "catedra", "unidad academica"] },
  { match: ["directores", "escuela"], keywords: ["director de escuela", "funciones"] },
  { match: ["recintos", "centros"], keywords: ["recinto", "centro", "subcentro", "universitario"] },
  { match: ["personal docente"], keywords: ["personal academico", "profesor", "docente"] },
  { match: ["derechos", "personal docente"], keywords: ["derechos", "profesor", "docente", "academico"] },
  { match: ["deberes", "personal docente"], keywords: ["deberes", "profesor", "docente", "academico"] },
  { match: ["estudiantes"], keywords: ["estudiante", "matriculado", "derechos", "deberes"] },
  { match: ["derechos", "estudiantes"], keywords: ["derechos de los estudiantes", "estudiante"] },
  { match: ["deberes", "estudiantes"], keywords: ["deberes de los estudiantes", "estudiante"] },
  { match: ["representacion estudiantil"], keywords: ["representacion estudiantil", "estudiantil", "organismo"] },
  { match: ["investigacion"], keywords: ["investigacion", "cientifica", "comision de investigacion"] },
  { match: ["postgrado"], keywords: ["posgrado", "postgrado", "consejo de posgrado"] },
  { match: ["extension universitaria"], keywords: ["extension", "cultural", "cientifica"] },
  { match: ["bienestar universitario"], keywords: ["bienestar", "estudiantil", "universitario"] },
  { match: ["regimen disciplinario"], keywords: ["regimen disciplinario", "sancion", "estudiantes", "profesores"] },
  { match: ["patrimonio universitario"], keywords: ["patrimonio", "bienes", "inviolable", "universidad"] },
  { match: ["protesta"], keywords: ["vida universitaria", "democracia", "pensamiento", "libertad", "disciplinario"] }
];
const MAX_CONTEXT_CHARS = 5200;
const MAX_CHUNK_CHARS = 1200;
const MIN_STATUTE_CONFIDENCE = 1.15;
const UASD_RELATED_TERMS = [
  "uasd",
  "universidad autonoma de santo domingo",
  "universidad",
  "estatuto",
  "claustro",
  "consejo universitario",
  "facultad",
  "recinto",
  "estudiante"
];

const state = {
  estatutoText: "",
  chunks: [],
  chatHistory: [],
  isLoading: false,
  chunkNormCache: []
};

const $messages = document.getElementById("chatMessages");
const $input = document.getElementById("questionInput");
const $sendBtn = document.getElementById("sendBtn");
const $suggestionsList = document.getElementById("suggestionsList");
const $messageTemplate = document.getElementById("messageTemplate");

init();

async function init() {
  renderSuggestions();
  addMessage(
    "assistant",
    "Hola. Soy tu asistente del Estatuto Organico de la UASD. Solo respondere con base en ese documento."
  );

  try {
    state.estatutoText = await loadEstatutoText();
    state.chunks = chunkText(state.estatutoText, 900, 150);
    state.chunkNormCache = buildChunkNormCache(state.chunks);
  } catch (error) {
    addMessage(
      "error",
      `No se pudo cargar el Estatuto ni desde archivo local ni desde URL remota. Detalle: ${error.message}`
    );
  }

  $sendBtn.addEventListener("click", onSend);
  $input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  });

}

async function onSend() {
  const question = $input.value.trim();
  if (!question || state.isLoading) return;
  if (!state.chunks.length) {
    addMessage("error", "El texto del Estatuto aun no esta disponible.");
    return;
  }

  $input.value = "";
  addMessage("user", question);
  setLoading(true);

  try {
    const topChunks = searchTopChunks(question, state.chunks, 5);
    const answer = await generateAnswer(question, topChunks);
    addMessage("assistant", answer);
    state.chatHistory.push({ question, answer });
  } catch (error) {
    addMessage(
      "error",
      `Ocurrio un error al generar la respuesta: ${error.message}`
    );
  } finally {
    setLoading(false);
  }
}

async function loadEstatutoText() {
  // Primer intento: archivo local. Si falla (p. ej. file://), se usa el PDF remoto sin avisar.
  try {
    const localResponse = await fetch("./estatuto.txt");
    if (localResponse.ok) {
      return await localResponse.text();
    }
  } catch {
    // Carga silenciosa desde URL del PDF oficial.
  }

  // Segundo intento: URL del PDF oficial convertida a texto plano.
  const remoteResponse = await fetch(PDF_TEXT_PROXY_URL);
  if (!remoteResponse.ok) {
    throw new Error(
      `Fallo carga remota del PDF (${remoteResponse.status}). URL fuente: ${ESTATUTO_PDF_URL}`
    );
  }

  const remoteText = await remoteResponse.text();
  if (!remoteText || remoteText.length < 1000) {
    throw new Error("El texto remoto del PDF llego vacio o incompleto.");
  }

  return remoteText;
}

function isValidArticleBody(text) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length < 120) return false;
  if (/\.{5,}/.test(clean)) return false;
  if (/^Art[íi]culo\s+\d+\s*\.{3,}\s*\d+\s*$/i.test(clean)) return false;
  const letters = (clean.match(/[a-zA-ZÀ-ÿ]/g) || []).length;
  return letters / clean.length > 0.45;
}

function chunkText(text, chunkSize = 900, overlap = 150) {
  // Priorizamos segmentacion por articulos (evita coincidir 10 con 100, 101, etc.).
  const articleRegex = /(ART[ÍI]CULO\s+(\d+)(?!\d)[\s\S]*?)(?=ART[ÍI]CULO\s+\d+|$)/gi;
  const articleMatches = Array.from(text.matchAll(articleRegex))
    .map((m) => m[1].replace(/\s+/g, " ").trim())
    .filter(isValidArticleBody);

  if (articleMatches.length > 20) {
    return articleMatches;
  }

  // Fallback: segmentacion por longitud si la extraccion no conserva encabezados.
  const normalized = text.replace(/\s+/g, " ").trim();
  const chunks = [];
  let start = 0;
  while (start < normalized.length) {
    const end = Math.min(start + chunkSize, normalized.length);
    chunks.push(normalized.slice(start, end));
    if (end >= normalized.length) {
      break;
    }
    start = end - overlap;
  }
  return chunks;
}

function buildChunkNormCache(chunks) {
  return chunks.map((chunk) => normalize(chunk));
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTermFreqMap(text) {
  const map = new Map();
  const terms = normalize(text)
    .split(" ")
    .filter((t) => t.length > 2 && !STOPWORDS_ES.has(t));
  const expandedTerms = [...terms];
  for (const term of terms) {
    if (QUERY_EXPANSIONS[term]) {
      expandedTerms.push(...QUERY_EXPANSIONS[term]);
    }
  }
  for (const term of expandedTerms) {
    map.set(term, (map.get(term) || 0) + 1);
  }
  return map;
}

function getTokenSet(text) {
  return new Set(
    normalize(text)
      .split(" ")
      .filter((t) => t.length > 2 && !STOPWORDS_ES.has(t))
  );
}

function getTrigrams(text) {
  const compact = normalize(text).replace(/\s+/g, "");
  const grams = new Set();
  if (compact.length < 3) return grams;
  for (let i = 0; i <= compact.length - 3; i += 1) {
    grams.add(compact.slice(i, i + 3));
  }
  return grams;
}

function jaccard(setA, setB) {
  if (!setA.size || !setB.size) return 0;
  let intersection = 0;
  for (const value of setA) {
    if (setB.has(value)) intersection += 1;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function scoreChunk(queryMap, chunk) {
  const chunkMap = getTermFreqMap(chunk);
  let score = 0;
  for (const [term, qCount] of queryMap.entries()) {
    const cCount = chunkMap.get(term) || 0;
    if (cCount > 0) score += qCount * cCount;
  }
  return score;
}

function searchTopChunks(question, chunks, topN = 5) {
  const queryMap = getTermFreqMap(question);
  const queryTerms = Array.from(queryMap.keys());
  if (!queryTerms.length) return chunks.slice(0, topN).map((chunk, idx) => ({ idx, chunk }));
  if (!state.chunkNormCache.length || state.chunkNormCache.length !== chunks.length) {
    state.chunkNormCache = buildChunkNormCache(chunks);
  }

  const queryTokenSet = getTokenSet(question);
  const queryTrigrams = getTrigrams(question);

  const scored = chunks
    .map((chunk, idx) => ({
      idx,
      chunk,
      score: scoreChunk(queryMap, chunk),
      matchedTerms: queryTerms.filter((term) => state.chunkNormCache[idx].includes(term)).length,
      tokenJaccard: jaccard(queryTokenSet, getTokenSet(chunk)),
      trigramJaccard: jaccard(queryTrigrams, getTrigrams(chunk))
    }))
    .map((item) => ({
      ...item,
      finalScore:
        item.score * 1.2 +
        item.matchedTerms * 2 +
        item.tokenJaccard * 14 +
        item.trigramJaccard * 10
    }))
    .sort((a, b) => b.finalScore - a.finalScore || b.matchedTerms - a.matchedTerms);
  const best = scored.slice(0, topN);
  return best.filter((item) => item.finalScore > 1.8);
}

function getAiConfig() {
  const cfg = window.CHATBOT_CONFIG || {};
  const provider = String(cfg.provider || "groq")
    .trim()
    .toLowerCase();
  const apiKey = String(cfg.apiKey || "").trim();
  const safeProvider = provider === "openrouter" ? "openrouter" : "groq";
  return { provider: safeProvider, apiKey };
}

async function generateAnswer(question, topChunks) {
  const deterministic = answerFromStatuteMetadata(question, state.estatutoText);
  if (deterministic) {
    return `${deterministic}\n\nBase: Estatuto Organico UASD.`;
  }

  const boostedChunks = mergePreferredArticleChunks(
    question,
    boostByDirectKeywords(question, topChunks, state.chunks)
  );
  const bestScore = boostedChunks[0]?.finalScore || 0;

  const { provider, apiKey } = getAiConfig();

  // Si no hay API key, devolvemos una respuesta extractiva breve.
  if (!apiKey) {
    if (!boostedChunks.length || bestScore < MIN_STATUTE_CONFIDENCE) {
      return (
        "Configura tu API key en config.js y no encontre evidencia suficiente en el Estatuto " +
        "para responder con precision."
      );
    }
    return fallbackExtractiveAnswer(question, boostedChunks);
  }

  const systemPrompt =
    "Eres un asistente academico de la UASD. Responde UNICAMENTE con la informacion del contexto. " +
    "Redacta en espanol claro (3-6 oraciones), sin pegar texto legal literal largo. " +
    "Interpreta terminos equivalentes del Estatuto (por ejemplo, 'fines' puede corresponder a actividades " +
    "fundamentales del Articulo 10). Cita articulos cuando aparezcan en el contexto. " +
    "Si la pregunta no esta explicita (ej. protestas), explica lo que SI regula el Estatuto relacionado " +
    "y aclara si no hay mencion directa. Solo responde SIN_EVIDENCIA_EN_ESTATUTO si el contexto no tiene relacion.";

  const endpoint = provider === "openrouter" ? OPENROUTER_URL : GROQ_URL;
  const model = provider === "openrouter" ? OPENROUTER_MODEL : GROQ_MODEL;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`
  };
  if (provider === "openrouter") {
    headers["HTTP-Referer"] = window.location.href;
    headers["X-Title"] = "Chatbot Estatuto UASD";
  }

  // Paso 1: intentar responder con base en el Estatuto.
  if (boostedChunks.length && bestScore >= MIN_STATUTE_CONFIDENCE) {
    const context = buildContext(boostedChunks, MAX_CONTEXT_CHARS);
    const statutePrompt =
      `Pregunta del usuario: ${question}\n\n` +
      `Contexto del Estatuto Organico UASD:\n${context}\n\n` +
      "Instrucciones: responde de forma clara, breve y fiel al texto. Si hay duda, indica exactamente: SIN_EVIDENCIA_EN_ESTATUTO.";

    const statuteAnswer = await callChatModel({
      endpoint,
      headers,
      model,
      systemPrompt,
      userPrompt: statutePrompt
    });

    const normalizedStatuteAnswer = normalize(statuteAnswer);
    const noEvidenceSignals = [
      "sin evidencia en estatuto",
      "no hay evidencia suficiente",
      "no se menciona explicitamente",
      "no se menciona en el contexto",
      "no contiene informacion suficiente",
      "no se encuentra informacion",
      "no encuentra informacion"
    ];
    const hasNoEvidenceSignal = noEvidenceSignals.some((signal) =>
      normalizedStatuteAnswer.includes(signal)
    );
    if (!hasNoEvidenceSignal) {
      return `${statuteAnswer}\n\nBase: Estatuto Organico UASD.`;
    }

    const extractive = buildStatuteExtractiveAnswer(question, boostedChunks);
    if (extractive) {
      return `${extractive}\n\nBase: Estatuto Organico UASD.`;
    }
  }

  // Paso 2: si no hay evidencia suficiente en Estatuto, buscar en internet
  // solo cuando la pregunta este relacionada con la UASD.
  if (isUasdRelatedQuestion(question)) {
    const webContext = await fetchUasdWebContext(question);
    if (webContext) {
      const webSystemPrompt =
        "Eres un asistente de la UASD. Responde usando SOLO el contexto web dado. " +
        "Si el contexto no alcanza, dilo claramente.";
      const webPrompt =
        `Pregunta del usuario: ${question}\n\n` +
        `Contexto web relacionado con UASD:\n${webContext}\n\n` +
        "Responde breve y precisa. No inventes datos.";
      const webAnswer = await callChatModel({
        endpoint,
        headers,
        model,
        systemPrompt: webSystemPrompt,
        userPrompt: webPrompt
      });
      return `${webAnswer}\n\nBase: Busqueda web relacionada con UASD (fallback tras Estatuto).`;
    }
  }

  // Paso 3: fallback general fuera del Estatuto.
  const generalSystemPrompt =
    "Eres un asistente util y claro. Responde con precision y en espanol neutro. " +
    "Si no estas seguro, dilo con honestidad.";
  const generalPrompt =
    `Pregunta del usuario: ${question}\n\n` +
    "Responde de forma breve y clara. Si aplica, agrega contexto practico.";
  const generalAnswer = await callChatModel({
    endpoint,
    headers,
    model,
    systemPrompt: generalSystemPrompt,
    userPrompt: generalPrompt
  });
  return `${generalAnswer}\n\nBase: Respuesta general de IA (no encontrada con evidencia suficiente en el Estatuto).`;
}

function answerFromStatuteMetadata(question, estatutoText) {
  if (!estatutoText) return "";
  const q = normalize(question);
  const articleMatches = estatutoText.match(/ART[ÍI]CULO\s+\d+/gi) || [];
  const uniqueArticles = new Set(
    articleMatches.map((m) => Number((m.match(/\d+/) || ["0"])[0])).filter((n) => n > 0)
  );

  if (q.includes("cuantos articulos") && q.includes("estatuto")) {
    if (!uniqueArticles.size) return "";
    return `El Estatuto Organico de la UASD contiene ${uniqueArticles.size} articulos identificables en el texto cargado.`;
  }

  if (q.includes("cuantos estatutos") && (q.includes("uasd") || q.includes("universidad"))) {
    return "En este proyecto se consulta un Estatuto Organico de la UASD (el documento oficial cargado).";
  }

  return "";
}

function resolvePreferredArticleNumbers(question) {
  const q = normalize(question);
  if (q.includes("que es la uasd") || q.includes("universidad autonoma")) return [1];
  if (q.includes("mision")) return [7];
  if (q.includes("fines") || q.includes("funciones fundamentales")) return [10];
  if (q.includes("autonomia universitaria")) return [11];
  if (q.includes("principios") && q.includes("orientan")) return [9, 11];
  if (q.includes("protesta")) return [6, 11, 34];
  if (q.includes("atribuciones") && q.includes("consejo universitario")) return [34];
  if (q.includes("organizada") && q.includes("universidad")) return [12, 13];
  return [];
}

function mergePreferredArticleChunks(question, rankedChunks) {
  const articleNumbers = resolvePreferredArticleNumbers(question);
  if (!articleNumbers.length) return rankedChunks;

  const preferred = articleNumbers
    .map((num) => findArticleChunk(num))
    .filter(Boolean)
    .map((chunk, index) => ({
      idx: -100 - index,
      chunk,
      finalScore: 999,
      matchedTerms: 10,
      score: 10
    }));

  const seen = new Set();
  return [...preferred, ...rankedChunks].filter((item) => {
    const key = item.chunk.slice(0, 120);
    if (seen.has(key)) return false;
    seen.add(key);
    return !isLowQualityChunk(item.chunk);
  }).slice(0, 6);
}

function findArticleChunk(articleNumber) {
  return (
    state.chunks
      .filter((chunk) => {
        const match = chunk.match(/^ART[ÍI]CULO\s+(\d+)/i);
        return match && Number(match[1]) === articleNumber && isValidArticleBody(chunk);
      })
      .sort((a, b) => b.length - a.length)[0] || ""
  );
}

function extractArticleText(estatutoText, articleNumber) {
  const fromChunks = findArticleChunk(articleNumber);
  if (fromChunks) return fromChunks;

  const regex = new RegExp(
    `ART[ÍI]CULO\\s+${articleNumber}(?!\\d)[\\s\\S]*?(?=ART[ÍI]CULO\\s+\\d+|$)`,
    "gi"
  );
  const matches = Array.from(estatutoText.matchAll(regex))
    .map((m) => m[0].replace(/\s+/g, " ").trim())
    .filter(isValidArticleBody)
    .sort((a, b) => b.length - a.length);

  return matches[0] || "";
}

function isUasdRelatedQuestion(question) {
  const q = normalize(question);
  return UASD_RELATED_TERMS.some((term) => q.includes(term));
}

async function fetchUasdWebContext(question) {
  const query = encodeURIComponent(`${question} UASD sitio oficial`);
  const searchUrl = `https://r.jina.ai/http://duckduckgo.com/?q=${query}`;
  const res = await fetch(searchUrl);
  if (!res.ok) return "";
  const text = (await res.text()).replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.slice(0, 3500);
}

function boostByDirectKeywords(question, rankedChunks, allChunks) {
  const normalizedQuestion = normalize(question);
  let forcedKeywords = [];

  for (const hint of QUESTION_TOPIC_HINTS) {
    if (hint.match.every((term) => normalizedQuestion.includes(term))) {
      forcedKeywords = hint.keywords;
      break;
    }
  }

  if (
    !forcedKeywords.length &&
    (normalizedQuestion.includes("uasd") || normalizedQuestion.includes("que es la uasd"))
  ) {
    forcedKeywords = ["universidad autonoma de santo domingo", "articulo 1", "patrimonio social"];
  } else if (
    !forcedKeywords.length &&
    (normalizedQuestion.includes("cual es el estatuto") || normalizedQuestion.includes("cuantos estatutos"))
  ) {
    forcedKeywords = ["estatuto organico", "articulo 1", "claustro mayor"];
  }

  if (!forcedKeywords.length) {
    return rankedChunks.filter((item) => !isLowQualityChunk(item.chunk));
  }

  const forced = allChunks
    .map((chunk, idx) => {
      const norm = normalize(chunk);
      const hits = forcedKeywords.filter((k) => norm.includes(k)).length;
      return { idx, chunk, finalScore: hits * 5, matchedTerms: hits, score: hits * 3 };
    })
    .filter((item) => item.matchedTerms > 0)
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 3);

  // Combina resultados forzados + ranking normal evitando duplicados.
  const seen = new Set();
  const combined = [...forced, ...rankedChunks].filter((item) => {
    if (seen.has(item.idx)) return false;
    seen.add(item.idx);
    return true;
  });

  return combined.filter((item) => !isLowQualityChunk(item.chunk)).slice(0, 6);
}

function isLowQualityChunk(chunk) {
  return !isValidArticleBody(chunk) && (chunk.length < 90 || (chunk.match(/\.{3,}/g) || []).length > 4);
}

const GENERIC_QUERY_TERMS = new Set([
  "uasd",
  "universidad",
  "estatuto",
  "organico",
  "institucion",
  "república",
  "republica",
  "dominicana"
]);

function getSpecificQueryTerms(question) {
  return Array.from(getTermFreqMap(question).keys()).filter(
    (term) => !GENERIC_QUERY_TERMS.has(term)
  );
}

function buildStatuteExtractiveAnswer(question, topChunks) {
  const queryTerms = getSpecificQueryTerms(question);
  if (!queryTerms.length) return "";
  const candidateSentences = [];

  for (const item of topChunks) {
    const sentences = item.chunk.split(/(?<=[.!?;:])\s+/);
    for (const sentence of sentences) {
      const normalizedSentence = normalize(sentence);
      const matched = queryTerms.filter((term) => normalizedSentence.includes(term)).length;
      if (matched > 0 && sentence.trim().length > 45 && !isBoilerplateSentence(sentence)) {
        candidateSentences.push({ sentence: sentence.trim(), matched });
      }
    }
  }

  const selected = candidateSentences
    .sort((a, b) => b.matched - a.matched)
    .filter((row) => row.matched >= Math.min(2, queryTerms.length))
    .slice(0, 4);

  if (!selected.length) return "";

  const bullets = selected.map((row, i) => `${i + 1}. ${row.sentence}`).join("\n");
  return `Segun el Estatuto Organico UASD:\n\n${bullets}`;
}

function isBoilerplateSentence(sentence) {
  const s = normalize(sentence);
  return (
    s.includes("aprobado por el claustro mayor") ||
    s.includes("estatuto organico de la universidad") ||
    s.includes("reapertura del proceso de revision")
  );
}

function buildContext(topChunks, maxChars) {
  const lines = [];
  let used = 0;
  for (let i = 0; i < topChunks.length; i += 1) {
    const clean = sanitizeChunkForPrompt(topChunks[i].chunk);
    if (!clean) continue;
    const fragment = `[Fragmento ${i + 1}] ${clean}`;
    if (used + fragment.length > maxChars) break;
    lines.push(fragment);
    used += fragment.length;
  }
  return lines.join("\n\n");
}

function sanitizeChunkForPrompt(chunk) {
  const clean = chunk
    .replace(/#{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return "";
  if (clean.length <= MAX_CHUNK_CHARS) return clean;
  return `${clean.slice(0, MAX_CHUNK_CHARS)}...`;
}

async function callChatModel({ endpoint, headers, model, systemPrompt, userPrompt }) {
  let response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      temperature: 0.05,
      max_tokens: 500,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    })
  });

  // Reintento automatico para modelos con limite corto de contexto (ej: Groq).
  if (response.status === 413) {
    const trimmedPrompt = userPrompt.slice(0, 2400);
    response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        temperature: 0.05,
        max_tokens: 420,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: trimmedPrompt }
        ]
      })
    });
  }

  if (!response.ok) {
    const errTxt = await response.text();
    throw new Error(`API IA fallo (${response.status}): ${errTxt.slice(0, 150)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("La IA no devolvio contenido.");
  }
  return content;
}

function fallbackExtractiveAnswer(question, topChunks) {
  const queryTerms = Array.from(getTermFreqMap(question).keys());
  const candidateSentences = [];

  for (const item of topChunks) {
    const sentences = item.chunk.split(/(?<=[.!?;:])\s+/);
    for (const sentence of sentences) {
      const normalizedSentence = normalize(sentence);
      const matched = queryTerms.filter((term) => normalizedSentence.includes(term)).length;
      if (matched > 0) {
        candidateSentences.push({ sentence: sentence.trim(), matched });
      }
    }
  }

  const selected = candidateSentences
    .sort((a, b) => b.matched - a.matched)
    .filter((row) => row.sentence.length > 50)
    .slice(0, 3);

  if (!selected.length || selected[0].matched < 1) {
    return (
      "No hay API Key configurada y no encontre evidencia textual suficientemente clara " +
      "en los fragmentos recuperados para responder con precision. Reformula la pregunta " +
      "o configura la API key en config.js para una respuesta redactada con mejor analisis de contexto."
    );
  }

  const evidence = selected.map((row, i) => `${i + 1}) ${row.sentence}`).join("\n\n");
  return (
    "Sin API key en config.js. Te comparto evidencia textual del Estatuto relacionada con tu pregunta:\n\n" +
    evidence +
    "\n\n(Consejo: agrega tu API key en config.js para respuestas redactadas mas coherentes.)"
  );
}

function addMessage(role, text) {
  const node = $messageTemplate.content.firstElementChild.cloneNode(true);
  node.classList.add(role);
  node.querySelector(".role").textContent =
    role === "user" ? "Tu" : role === "assistant" ? "Asistente" : "Sistema";
  node.querySelector(".bubble").textContent = text;
  $messages.appendChild(node);
  scrollToBottom();
}

function setLoading(isLoading) {
  state.isLoading = isLoading;
  $sendBtn.disabled = isLoading;

  const existingLoader = document.getElementById("typingLoader");
  if (isLoading && !existingLoader) {
    const node = $messageTemplate.content.firstElementChild.cloneNode(true);
    node.id = "typingLoader";
    node.classList.add("assistant");
    node.querySelector(".role").textContent = "Asistente";
    node.querySelector(".bubble").innerHTML =
      '<div class="loader"><span></span><span></span><span></span></div>';
    $messages.appendChild(node);
    scrollToBottom();
  } else if (!isLoading && existingLoader) {
    existingLoader.remove();
  }
}

function renderSuggestions() {
  const fragment = document.createDocumentFragment();
  SUGGESTED_QUESTIONS.forEach((question) => {
    const btn = document.createElement("button");
    btn.className = "suggestion-btn";
    btn.textContent = question;
    btn.addEventListener("click", () => {
      $input.value = question;
      $input.focus();
    });
    fragment.appendChild(btn);
  });
  $suggestionsList.appendChild(fragment);
}

function scrollToBottom() {
  $messages.scrollTop = $messages.scrollHeight;
}
