import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import fs from 'fs/promises';
import path from 'path';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// NOUVEAU : Chemin pour le fichier de cache persistant
const CACHE_DIR = path.join(process.cwd(), '.cache');
const STORIES_CACHE_PATH = path.join(CACHE_DIR, 'stories.json');

// Middlewares
app.use(cors()); // Autorise les requêtes cross-origin (depuis votre HTML)
app.use(express.json()); // Permet de lire le JSON dans les corps de requête

let lastStoriesData = null; // Pour garder les dernières données valides en cas d'erreur API
let storiesCache = null; // Cache en mémoire pour les histoires

// NOUVEAU : Fonction pour lire le cache depuis un fichier
async function readCache() {
  const cachePath = STORIES_CACHE_PATH;
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    const data = await fs.readFile(cachePath, 'utf8');
    const cachedData = JSON.parse(data);
    // Vérifier si le cache a plus de 24 heures
    if (Date.now() - cachedData.timestamp < 1000 * 60 * 60 * 24) {
      storiesCache[league] = cachedData.data;
      lastStoriesData = cachedData.data;
      console.log(`Cache persistant chargé avec succès.`);
    } else {
      console.log(`Le cache persistant a expiré.`);
    }
  } catch (error) {
    console.log(`Aucun cache persistant trouvé.`);
  }
}

// NOUVEAU : Fonction pour écrire le cache dans un fichier
async function writeCache(data) {
  const cachePath = STORIES_CACHE_PATH;
  await fs.mkdir(CACHE_DIR, { recursive: true });
  const cacheContent = JSON.stringify({ timestamp: Date.now(), data });
  await fs.writeFile(cachePath, cacheContent, 'utf8');
  console.log(`Cache persistant pour "${league}" mis à jour.`);
}

// Endpoint pour les histoires du football
app.get("/football-stories", async (req, res) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    console.error("Clé API OpenRouter manquante dans les variables d'environnement.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  // Utiliser le cache s'il existe
  if (storiesCache) { 
    return res.json(storiesCache);
  }

  try {
    const prompt = `
      Tu es un conteur passionné par l'histoire du football. Raconte 10 histoires courtes et fascinantes sur des moments légendaires, des joueurs iconiques ou des faits surprenants du football mondial.
      Fournis ta réponse dans un format de tableau JSON strict. Chaque objet doit avoir les clés "title" et "story".
      - "story": L'histoire racontée en 2-4 phrases concises et captivantes.
      Ne réponds rien d'autre que l'objet JSON.
    `;

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "deepseek/deepseek-chat", // Modèle gratuit DeepSeek
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { "Authorization": `Bearer ${openRouterApiKey}` },
      timeout: 45000
    });

    let rawResponse = response.data?.choices?.[0]?.message?.content;
    const jsonMatch = rawResponse.match(/(\[[\s\S]*\])/);
    if (!jsonMatch) throw new Error("La réponse de l'IA pour les histoires ne contient pas de JSON valide.");
    
    const storiesData = JSON.parse(jsonMatch[0]);
    await writeCache(storiesData); // Écrire dans le fichier de cache
    lastStoriesData = storiesData; // Sauvegarder les dernières données valides
    storiesCache = storiesData; // Mettre à jour le cache en mémoire
    res.json(storiesData);

  } catch (error) {
    console.error("Erreur lors de la génération des histoires:", error.message);
    // Si on a des données précédentes en cache, on les sert pour ne pas bloquer l'utilisateur
    try {
      const cachePath = STORIES_CACHE_PATH;
      const data = await fs.readFile(cachePath, 'utf8');
      const cachedData = JSON.parse(data);
      console.log("Erreur API détectée. Service des dernières données valides depuis le cache persistant.");
      return res.json(cachedData.data);
    } catch (cacheError) {
      console.error("Impossible de lire le cache de secours:", cacheError.message);
      res.status(500).json({ error: "Impossible de générer de nouvelles histoires pour le moment. Limite de l'API probablement atteinte." });
    }
  }
});

app.post("/ask-ai", async (req, res) => {
  const { question } = req.body;
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!question) {
    return res.status(400).json({ error: "La question est manquante." });
  }

  if (!openRouterApiKey) {
    console.error("Clé API OpenRouter manquante. Vérifiez votre fichier .env");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  try {
    // Construire le prompt pour l'IA avec recherche web
    const prompt = `En te basant sur les informations les plus récentes disponibles sur internet, réponds à la question suivante sur le football comme un journaliste sportif expert : "${question}"`;

    // Appeler l'API OpenRouter avec un modèle de recherche
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "deepseek/deepseek-chat", // Modèle gratuit DeepSeek
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json"
      }
    });

    const answer = response.data?.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse pour le moment.";
    res.json({ answer });

  } catch (error) {
    console.error("Erreur lors de l'appel à l'IA:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Une erreur est survenue lors de la génération de la réponse." });
  }
});

app.listen(PORT, async () => {
  // NOUVEAU : Lire le cache au démarrage du serveur
  await readCache();
  console.log(`Koora-AI API démarré sur http://localhost:${PORT}`);
});
